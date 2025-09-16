/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
export declare const caKey: string;
export declare const caCert: string;
export declare const serverKey: string;
export declare const serverCsr: string;
export declare const serverSrl: string;
export declare const serverCert: string;
export declare const serverAuthToken: string;
export declare const csrFileName = "app.csr";
export declare const deviceCAcertFile = "sonarCA.crt";
export declare const deviceClientCertFile = "device.crt";
export type SecureServerConfig = {
    key: Buffer;
    cert: Buffer;
    ca: Buffer;
    requestCert: boolean;
    rejectUnauthorized: boolean;
};
export declare const ensureOpenSSLIsAvailable: () => Promise<void>;
export declare const loadSecureServerConfig: () => Promise<SecureServerConfig>;
export declare const extractBundleIdFromCSR: (csr: string) => Promise<string>;
export declare const generateClientCertificate: (csr: string) => Promise<string>;
export declare const getCACertificate: () => Promise<string>;
export interface EphemeralEncryptionResult {
    data: string;
    key: string;
}
export declare const ephemeralEncryption: (path: string) => Promise<EphemeralEncryptionResult>;
export declare const generateAuthToken: () => Promise<string>;
/**
 * Gets the client authentication token. If there is no existing token,
 * it generates one, export it to the manifest file and returns it.
 *
 * Additionally, it must check the token's validity before returning it.
 * If the token is invalid, it regenerates it and exports it to the manifest file.
 *
 * Finally, the token is also exported to the manifest, on every get as to
 * ensure it is always up to date.
 *
 * @returns
 */
export declare const getAuthToken: () => Promise<string>;
export declare const hasAuthToken: () => Promise<boolean>;
export declare const validateAuthToken: (token: string) => void;
//# sourceMappingURL=certificate-utils.d.ts.map