"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CertificateProvider_1 = __importDefault(require("../../app-connectivity/certificate-exchange/CertificateProvider"));
const androidUtil = __importStar(require("./androidContainerUtility"));
const certificate_utils_1 = require("../../app-connectivity/certificate-exchange/certificate-utils");
const recorder_1 = require("../../recorder");
class AndroidCertificateProvider extends CertificateProvider_1.default {
    constructor(adb) {
        super();
        this.adb = adb;
        this.name = 'AndroidCertificateProvider';
        this.medium = 'FS_ACCESS';
    }
    async getTargetDeviceId(clientQuery, appName, appDirectory, csr) {
        recorder_1.recorder.log(clientQuery, 'Query available devices via adb');
        const devices = await this.adb.listDevices();
        if (devices.length === 0) {
            recorder_1.recorder.logError(clientQuery, 'No devices found via adb');
            throw new Error('No Android devices found');
        }
        const deviceMatches = devices.map(async (device) => {
            try {
                const result = await this.androidDeviceHasMatchingCSR(appDirectory, device.id, appName, csr, clientQuery);
                return { id: device.id, ...result, error: null };
            }
            catch (e) {
                console.warn(`[conn] Unable to check for matching CSR in ${device.id}:${appName}`, e);
                return { id: device.id, isMatch: false, foundCsr: null, error: e };
            }
        });
        const matches = await Promise.all(deviceMatches);
        const matchingIds = matches.filter((m) => m.isMatch).map((m) => m.id);
        if (matchingIds.length == 0) {
            recorder_1.recorder.logError(clientQuery, 'Unable to find a matching device for the incoming request');
            const erroredDevice = matches.find((d) => d.error);
            if (erroredDevice) {
                throw erroredDevice.error;
            }
            const foundCsrs = matches
                .filter((d) => d.foundCsr !== null)
                .map((d) => (d.foundCsr ? encodeURI(d.foundCsr) : 'null'));
            console.warn(`[conn] Looking for CSR (url encoded):${encodeURI(this.santitizeString(csr))} Found these:${foundCsrs.join('\n\n')}`);
            throw new Error(`No matching device found for app: ${appName}`);
        }
        if (matchingIds.length > 1) {
            console.warn(`[conn] Multiple devices found for app: ${appName}`);
        }
        return matchingIds[0];
    }
    async deployOrStageFileForDevice(clientQuery, destination, filename, contents, csr) {
        recorder_1.recorder.log(clientQuery, `Deploying file '${filename}' to device at '${destination}'`);
        const appName = await (0, certificate_utils_1.extractBundleIdFromCSR)(csr);
        const deviceId = await this.getTargetDeviceId(clientQuery, appName, destination, csr);
        await androidUtil.push(this.adb, deviceId, appName, destination + filename, contents, clientQuery);
    }
    async androidDeviceHasMatchingCSR(directory, deviceId, processName, csr, clientQuery) {
        const deviceCsr = await androidUtil.pull(this.adb, deviceId, processName, directory + certificate_utils_1.csrFileName, clientQuery);
        // Santitize both of the string before comparation
        // The csr string extraction on client side return string in both way
        const [sanitizedDeviceCsr, sanitizedClientCsr] = [
            deviceCsr.toString(),
            csr,
        ].map((s) => this.santitizeString(s));
        const isMatch = sanitizedDeviceCsr === sanitizedClientCsr;
        return { isMatch, foundCsr: sanitizedDeviceCsr };
    }
}
exports.default = AndroidCertificateProvider;
//# sourceMappingURL=AndroidCertificateProvider.js.map