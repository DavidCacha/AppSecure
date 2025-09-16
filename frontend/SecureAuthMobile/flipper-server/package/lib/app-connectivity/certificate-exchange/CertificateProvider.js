"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const recorder_1 = require("../../recorder");
const certificate_utils_1 = require("./certificate-utils");
const path_1 = __importDefault(require("path"));
const tmp_1 = __importDefault(require("tmp"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const archiver_1 = __importDefault(require("archiver"));
class CertificateProvider {
    verifyMedium(medium) {
        if (this.medium !== medium) {
            throw new Error(`${this.name} does not support medium ${medium}`);
        }
    }
    async stageFile(destination, filename, contents) {
        const exists = await fs_extra_1.default.pathExists(destination);
        if (!exists) {
            await fs_extra_1.default.mkdir(destination);
        }
        try {
            await fs_extra_1.default.writeFile(path_1.default.join(destination, filename), contents);
            return;
        }
        catch (e) {
            throw new Error(`Failed to write ${filename} to specified destination. Error: ${e}`);
        }
    }
    async processCertificateSigningRequest(clientQuery, unsanitizedCSR, sandboxDirectory) {
        const temporaryDirectory = await (0, util_1.promisify)(tmp_1.default.dir)();
        const certificatesDirectory = path_1.default.join(temporaryDirectory, `flipper-certificates`);
        const certificatesZipDirectory = path_1.default.join(temporaryDirectory, 'flipper-certificates.zip');
        const csr = this.santitizeString(unsanitizedCSR);
        if (csr === '') {
            const msg = `Received empty CSR from ${clientQuery.os} device`;
            recorder_1.recorder.logError(clientQuery, msg);
            return Promise.reject(new Error(msg));
        }
        recorder_1.recorder.log(clientQuery, 'Ensure OpenSSL is available');
        await (0, certificate_utils_1.ensureOpenSSLIsAvailable)();
        recorder_1.recorder.log(clientQuery, 'Extract bundle identifier from CSR');
        const bundleId = await (0, certificate_utils_1.extractBundleIdFromCSR)(csr);
        recorder_1.recorder.log(clientQuery, 'Obtain CA certificate');
        const caCertificate = await (0, certificate_utils_1.getCACertificate)();
        this.stageFile(certificatesDirectory, certificate_utils_1.deviceCAcertFile, caCertificate);
        recorder_1.recorder.log(clientQuery, 'Generate client certificate');
        const clientCertificate = await (0, certificate_utils_1.generateClientCertificate)(csr);
        this.stageFile(certificatesDirectory, certificate_utils_1.deviceClientCertFile, clientCertificate);
        const compressCertificatesBundle = new Promise((resolve, reject) => {
            const output = fs_extra_1.default.createWriteStream(certificatesZipDirectory);
            const archive = (0, archiver_1.default)('zip', {
                zlib: { level: 9 }, // Sets the compression level.
            });
            archive.directory(certificatesDirectory, false);
            output.on('close', function () {
                resolve(certificatesZipDirectory);
            });
            archive.on('warning', reject);
            archive.on('error', reject);
            archive.pipe(output);
            archive.finalize();
        });
        await compressCertificatesBundle;
        const encryptedCertificates = await (0, certificate_utils_1.ephemeralEncryption)(certificatesZipDirectory);
        try {
            recorder_1.recorder.log(clientQuery, 'Get target device from CSR and bundle identifier');
            const deviceId = await this.getTargetDeviceId(clientQuery, bundleId, sandboxDirectory, csr);
            recorder_1.recorder.log(clientQuery, 'Deploy CA certificate to application sandbox');
            await this.deployOrStageFileForDevice(clientQuery, sandboxDirectory, certificate_utils_1.deviceCAcertFile, caCertificate, csr);
            recorder_1.recorder.log(clientQuery, 'Deploy client certificate to application sandbox');
            await this.deployOrStageFileForDevice(clientQuery, sandboxDirectory, certificate_utils_1.deviceClientCertFile, clientCertificate, csr);
            recorder_1.recorder.log(clientQuery, `Finished processing CSR, device identifier is '${deviceId}'`);
            return {
                deviceId,
                certificates: encryptedCertificates,
                certificatesZip: certificatesZipDirectory,
            };
        }
        catch (error) {
            return {
                error,
                certificates: encryptedCertificates,
                certificatesZip: certificatesZipDirectory,
            };
        }
    }
    santitizeString(csrString) {
        return csrString.replace(/\r/g, '').trim();
    }
}
exports.default = CertificateProvider;
//# sourceMappingURL=CertificateProvider.js.map