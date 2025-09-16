/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { KeytarManager } from '../utils/keytar';
import CertificateProvider, { CertificateExchangeRequestResult } from '../app-connectivity/certificate-exchange/CertificateProvider';
export default class WWWCertificateProvider extends CertificateProvider {
    private keytarManager;
    name: string;
    medium: "WWW";
    constructor(keytarManager: KeytarManager);
    processCertificateSigningRequest(): Promise<CertificateExchangeRequestResult>;
    getTargetDeviceId(): Promise<string>;
    protected deployOrStageFileForDevice(): Promise<void>;
}
//# sourceMappingURL=WWWCertificateProvider.d.ts.map