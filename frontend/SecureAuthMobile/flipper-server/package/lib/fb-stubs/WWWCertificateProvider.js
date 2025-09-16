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
const CertificateProvider_1 = __importDefault(require("../app-connectivity/certificate-exchange/CertificateProvider"));
class WWWCertificateProvider extends CertificateProvider_1.default {
    constructor(keytarManager) {
        super();
        this.keytarManager = keytarManager;
        this.name = 'WWWCertificateProvider';
        this.medium = 'WWW';
    }
    async processCertificateSigningRequest() {
        throw new Error('WWWCertificateProvider is not implemented');
    }
    async getTargetDeviceId() {
        throw new Error('WWWCertificateProvider is not implemented');
    }
    async deployOrStageFileForDevice() {
        throw new Error('WWWCertificateProvider is not implemented');
    }
}
exports.default = WWWCertificateProvider;
//# sourceMappingURL=WWWCertificateProvider.js.map