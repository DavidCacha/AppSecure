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
const fs_extra_1 = __importDefault(require("fs-extra"));
class DesktopCertificateProvider extends CertificateProvider_1.default {
    constructor() {
        super(...arguments);
        this.name = 'DesktopCertificateProvider';
        this.medium = 'FS_ACCESS';
    }
    /**
     * For Desktop devices, we currently return an empty string as the device
     * identifier. TODO: Is there an actual device serial we could use instead?
     * - What if some app connects from a remote device?
     * - What if two apps connect from several different remote devices?
     * @returns An empty string.
     */
    async getTargetDeviceId() {
        return '';
    }
    async deployOrStageFileForDevice(_, destination, filename, contents) {
        await fs_extra_1.default.writeFile(destination + filename, contents);
    }
}
exports.default = DesktopCertificateProvider;
//# sourceMappingURL=DesktopCertificateProvider.js.map