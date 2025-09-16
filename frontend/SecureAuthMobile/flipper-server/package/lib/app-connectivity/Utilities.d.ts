/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import { CertificateExchangeMedium, ClientQuery, SecureClientQuery, ResponseMessage } from 'flipper-common';
import { ParsedUrlQuery } from 'querystring';
/**
 * Transforms the certificate exchange medium type as number to the
 * CertificateExchangeMedium type.
 * @param medium A number representing the certificate exchange medium type.
 */
export declare function transformCertificateExchangeMediumToType(medium: number | undefined): CertificateExchangeMedium;
/**
 * Returns the app name from a ClientQuery instance. In most cases it should be
 * the app name as given in the query. On Android, and for old SDK versions (<3) it
 * will returned the app name suffixed by '(Outdated SDK)'.
 *
 * Reason is, in previous version (<3), app may not appear in correct device
 * section because it refers to the name given by client which is not fixed
 * for android emulators, so it is indicated as outdated so that developers
 * might want to update SDK to get rid of this connection swap problem
 * @param query A ClientQuery object.
 */
export declare function appNameWithUpdateHint(query: ClientQuery): string;
export declare function parseMessageToJson<T extends object = object>(message: any): T | undefined;
export declare function isWsResponseMessage(message: object): message is ResponseMessage;
/**
 * Validates a string as being one of those defined as valid OS.
 * @param str An input string.
 */
export declare function verifyClientQueryComesFromCertExchangeSupportedOS(query: ClientQuery | undefined): ClientQuery | undefined;
/**
 * Parse and extract a ClientQuery instance from a message. The ClientQuery
 * data will be contained in the message url query string.
 * @param message An incoming web socket message.
 */
export declare function parseClientQuery(query: ParsedUrlQuery): ClientQuery | undefined;
/**
 * Parse and extract a SecureClientQuery instance from a message. The ClientQuery
 * data will be contained in the message url query string.
 * @param message An incoming web socket message.
 */
export declare function parseSecureClientQuery(query: ParsedUrlQuery): SecureClientQuery | undefined;
export declare function cloneClientQuerySafeForLogging(clientQuery: SecureClientQuery): {
    csr: string | undefined;
    app: string;
    app_id?: string | undefined;
    os: import("flipper-common").DeviceOS;
    device: string;
    device_id: string;
    sdk_version?: number | undefined;
    medium: CertificateExchangeMedium;
    rsocket?: boolean | undefined;
    csr_path?: string | undefined;
};
export declare function assertNotNull<T extends any>(value: T, message?: string): asserts value is Exclude<T, undefined | null>;
//# sourceMappingURL=Utilities.d.ts.map