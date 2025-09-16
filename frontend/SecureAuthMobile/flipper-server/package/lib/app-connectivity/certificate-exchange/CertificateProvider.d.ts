/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { CertificateExchangeMedium, ClientQuery } from 'flipper-common';
/**
 * Some exchange operations can throw: get device identifier, push/pull certificates to the app's sandbox.
 * Previously, if there was an error, this was caught by the caller and an empty response was sent back to the app.
 *
 * After this change, those same operations can fail, but the exception will be caught and set into the response type.
 * It is reponsability of the caller to check if there is an error and handle accordingly.
 *
 * Why?
 * Because, even if those operations fail, an overal failure may be avoided by instead, for example, attempt a different type of exchange.
 * In those cases, the certificate bundles are still of value to the caller.
 *
 * The properties certificates and certificatesZip will always be set unless a proper error takes place which will prevent any type of exchange.
 * Device identifier and no error will be found when the certificate provider succeeded.
 * The absence of device identifier and/or presence of error indicate the certificate provider failed to
 * exchange certificates.
 */
export type CertificateExchangeRequestResult = {
    deviceId: string;
    error?: never;
    certificatesZip?: string;
    certificates?: {
        key: string;
        data: string;
    };
} | {
    deviceId?: never;
    error: Error;
    certificatesZip?: string;
    certificates?: {
        key: string;
        data: string;
    };
};
export default abstract class CertificateProvider {
    abstract medium: CertificateExchangeMedium;
    abstract name: string;
    verifyMedium(medium: CertificateExchangeMedium): void;
    private stageFile;
    processCertificateSigningRequest(clientQuery: ClientQuery, unsanitizedCSR: string, sandboxDirectory: string): Promise<CertificateExchangeRequestResult>;
    abstract getTargetDeviceId(clientQuery: ClientQuery, bundleId: string, appDirectory: string, csr: string): Promise<string>;
    protected abstract deployOrStageFileForDevice(clientQuery: ClientQuery, destination: string, filename: string, contents: string, csr: string): Promise<void>;
    protected santitizeString(csrString: string): string;
}
//# sourceMappingURL=CertificateProvider.d.ts.map