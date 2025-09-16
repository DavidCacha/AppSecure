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
const CertificateProvider_1 = __importDefault(require("../../app-connectivity/certificate-exchange/CertificateProvider"));
const iOSContainerUtility_1 = __importDefault(require("./iOSContainerUtility"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const util_1 = require("util");
const tmp_1 = __importDefault(require("tmp"));
const certificate_utils_1 = require("../../app-connectivity/certificate-exchange/certificate-utils");
const path_1 = __importDefault(require("path"));
const recorder_1 = require("../../recorder");
const constants_1 = require("../../fb-stubs/constants");
const tmpDir = (0, util_1.promisify)(tmp_1.default.dir);
// eslint-disable-next-line @typescript-eslint/naming-convention
class iOSCertificateProvider extends CertificateProvider_1.default {
    constructor(idbConfig) {
        super();
        this.idbConfig = idbConfig;
        this.name = 'iOSCertificateProvider';
        this.medium = 'FS_ACCESS';
    }
    async getTargetDeviceId(clientQuery, appName, appDirectory, csr) {
        const matches = /\/Devices\/([^/]+)\//.exec(appDirectory);
        if (matches && matches.length == 2) {
            // It's a simulator, the device identifier is in the filepath.
            return matches[1];
        }
        recorder_1.recorder.log(clientQuery, 'Query available devices');
        const targets = await iOSContainerUtility_1.default.targets(this.idbConfig.idbPath, this.idbConfig.enablePhysicalIOS, true, clientQuery);
        if (targets.length === 0) {
            recorder_1.recorder.logError(clientQuery, 'No devices found');
            throw new Error('No iOS devices found');
        }
        let isPhysicalDevice = false;
        const deviceMatchList = targets.map(async (target) => {
            try {
                const isMatch = await this.iOSDeviceHasMatchingCSR(clientQuery, appDirectory, target.udid, appName, csr);
                if (!isPhysicalDevice) {
                    isPhysicalDevice = target.type === 'physical';
                }
                return { id: target.udid, isMatch };
            }
            catch (e) {
                recorder_1.recorder.logError(clientQuery, 'Unable to find a matching device for the incoming request');
                return { id: target.udid, isMatch: false };
            }
        });
        const devices = await Promise.all(deviceMatchList);
        const matchingIds = devices.filter((m) => m.isMatch).map((m) => m.id);
        if (matchingIds.length == 0) {
            let error = `No matching device found for app: ${appName}.`;
            if (clientQuery.medium === 'FS_ACCESS' && isPhysicalDevice && constants_1.isFBBuild) {
                error += ` If you are using a physical device and a non-locally built app (i.e. Mobile Build), please make sure WWW certificate exchange is enabled in your app.`;
            }
            throw new Error(error);
        }
        if (matchingIds.length > 1) {
            console.warn(`[conn] Multiple devices found for app: ${appName}`);
        }
        return matchingIds[0];
    }
    async deployOrStageFileForDevice(clientQuery, destination, filename, contents, csr) {
        recorder_1.recorder.log(clientQuery, `Deploying file '${filename}' to device at '${destination}'`);
        const bundleId = await (0, certificate_utils_1.extractBundleIdFromCSR)(csr);
        try {
            await fs_extra_1.default.writeFile(destination + filename, contents);
        }
        catch (err) {
            const relativePathInsideApp = this.getRelativePathInAppContainer(destination);
            const udid = await this.getTargetDeviceId(clientQuery, bundleId, destination, csr);
            await this.pushFileToiOSDevice(clientQuery, udid, bundleId, relativePathInsideApp, filename, contents);
        }
    }
    getRelativePathInAppContainer(absolutePath) {
        const matches = /Application\/[^/]+\/(.*)/.exec(absolutePath);
        if (matches && matches.length === 2) {
            return matches[1];
        }
        throw new Error(`Path didn't match expected pattern: ${absolutePath}`);
    }
    async pushFileToiOSDevice(clientQuery, udid, bundleId, destination, filename, contents) {
        const dir = await tmpDir({ unsafeCleanup: true });
        const src = path_1.default.resolve(dir, filename);
        await fs_extra_1.default.writeFile(src, contents);
        await iOSContainerUtility_1.default.push(udid, src, bundleId, destination, this.idbConfig.idbPath, clientQuery);
    }
    async iOSDeviceHasMatchingCSR(clientQuery, directory, deviceId, bundleId, csr) {
        const src = this.getRelativePathInAppContainer(path_1.default.resolve(directory, certificate_utils_1.csrFileName));
        const dst = await tmpDir({ unsafeCleanup: true });
        try {
            await iOSContainerUtility_1.default.pull(deviceId, src, bundleId, dst, this.idbConfig.idbPath, clientQuery);
        }
        catch (e) {
            recorder_1.recorder.log(clientQuery, `Original idb pull failed. Most likely it is a physical device
        that requires us to handle the destination path dirrently.
        Forcing a re-try with the updated destination path. See D32106952 for details.`, e);
            await iOSContainerUtility_1.default.pull(deviceId, src, bundleId, path_1.default.join(dst, certificate_utils_1.csrFileName), this.idbConfig.idbPath, clientQuery);
            recorder_1.recorder.log(clientQuery, 'Subsequent idb pull succeeded. Nevermind previous warnings.');
        }
        const items = await fs_extra_1.default.readdir(dst);
        if (items.length > 1) {
            throw new Error('Conflict in temporary directory');
        }
        if (items.length === 0) {
            throw new Error('No CSR found on device');
        }
        const filename = items[0];
        const filepath = path_1.default.resolve(dst, filename);
        recorder_1.recorder.log(clientQuery, `Read CSR from: '${filepath}'`);
        const data = await fs_extra_1.default.readFile(filepath);
        const csrFromDevice = this.santitizeString(data.toString());
        return csrFromDevice === this.santitizeString(csr);
    }
}
exports.default = iOSCertificateProvider;
//# sourceMappingURL=iOSCertificateProvider.js.map