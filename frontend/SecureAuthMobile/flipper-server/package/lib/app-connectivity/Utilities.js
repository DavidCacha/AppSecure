"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.cloneClientQuerySafeForLogging = exports.parseSecureClientQuery = exports.parseClientQuery = exports.verifyClientQueryComesFromCertExchangeSupportedOS = exports.isWsResponseMessage = exports.parseMessageToJson = exports.appNameWithUpdateHint = exports.transformCertificateExchangeMediumToType = void 0;
/**
 * Transforms the certificate exchange medium type as number to the
 * CertificateExchangeMedium type.
 * @param medium A number representing the certificate exchange medium type.
 */
function transformCertificateExchangeMediumToType(medium) {
    switch (medium) {
        case undefined:
        case 1:
            return 'FS_ACCESS';
        case 2:
            return 'WWW';
        case 3:
            return 'NONE';
        default:
            throw new Error(`Unknown Certificate exchange medium: ${medium}`);
    }
}
exports.transformCertificateExchangeMediumToType = transformCertificateExchangeMediumToType;
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
function appNameWithUpdateHint(query) {
    if (query.os === 'Android' && (!query.sdk_version || query.sdk_version < 3)) {
        return `${query.app} (Outdated SDK)`;
    }
    return query.app;
}
exports.appNameWithUpdateHint = appNameWithUpdateHint;
function parseMessageToJson(message) {
    try {
        return JSON.parse(message.toString());
    }
    catch (err) {
        console.warn(`Invalid JSON: ${message}`, 'clientMessage');
        return;
    }
}
exports.parseMessageToJson = parseMessageToJson;
function isWsResponseMessage(message) {
    return typeof message.id === 'number';
}
exports.isWsResponseMessage = isWsResponseMessage;
const supportedOSForCertificateExchange = new Set([
    'Android',
    'iOS',
    'MacOS',
    'Metro',
    'Windows',
]);
/**
 * Validates a string as being one of those defined as valid OS.
 * @param str An input string.
 */
function verifyClientQueryComesFromCertExchangeSupportedOS(query) {
    if (!query || !supportedOSForCertificateExchange.has(query.os)) {
        return;
    }
    return query;
}
exports.verifyClientQueryComesFromCertExchangeSupportedOS = verifyClientQueryComesFromCertExchangeSupportedOS;
/**
 * Parse and extract a ClientQuery instance from a message. The ClientQuery
 * data will be contained in the message url query string.
 * @param message An incoming web socket message.
 */
function parseClientQuery(query) {
    /** Any required arguments to construct a ClientQuery come
     * embedded in the query string.
     */
    let device_id;
    if (typeof query.device_id === 'string') {
        device_id = query.device_id;
    }
    else {
        return;
    }
    let device;
    if (typeof query.device === 'string') {
        device = query.device;
    }
    else {
        return;
    }
    let app;
    if (typeof query.app === 'string') {
        app = query.app;
    }
    else {
        return;
    }
    let app_id;
    if (typeof query.app_id === 'string') {
        app_id = query.app_id;
    }
    let os;
    if (typeof query.os === 'string') {
        os = query.os;
    }
    else {
        return;
    }
    let medium;
    if (typeof query.medium === 'string') {
        medium = parseInt(query.medium, 10);
    }
    else if (typeof query.medium === 'number') {
        medium = query.medium;
    }
    if (medium !== undefined && (medium < 1 || medium > 3)) {
        throw new Error(`Unsupported exchange medium: ${medium}`);
    }
    let sdk_version;
    if (typeof query.sdk_version === 'string') {
        sdk_version = parseInt(query.sdk_version, 10);
    }
    else if (typeof query.sdk_version === 'number') {
        sdk_version = query.sdk_version;
    }
    const clientQuery = {
        device_id,
        device,
        app,
        app_id,
        os,
        medium: transformCertificateExchangeMediumToType(medium),
        sdk_version,
    };
    return clientQuery;
}
exports.parseClientQuery = parseClientQuery;
/**
 * Parse and extract a SecureClientQuery instance from a message. The ClientQuery
 * data will be contained in the message url query string.
 * @param message An incoming web socket message.
 */
function parseSecureClientQuery(query) {
    /** Any required arguments to construct a SecureClientQuery come
     * embedded in the query string.
     */
    const clientQuery = verifyClientQueryComesFromCertExchangeSupportedOS(parseClientQuery(query));
    if (!clientQuery) {
        return;
    }
    let csr;
    if (typeof query.csr === 'string') {
        const buffer = Buffer.from(query.csr, 'base64');
        if (buffer) {
            csr = buffer.toString('ascii');
        }
    }
    let csr_path;
    if (typeof query.csr_path === 'string') {
        csr_path = query.csr_path;
    }
    let medium;
    if (typeof query.medium === 'string') {
        medium = parseInt(query.medium, 10);
    }
    else if (typeof query.medium === 'number') {
        medium = query.medium;
    }
    if (medium !== undefined && (medium < 1 || medium > 3)) {
        throw new Error(`Unsupported exchange medium: ${medium}`);
    }
    return {
        ...clientQuery,
        csr,
        csr_path,
        medium: transformCertificateExchangeMediumToType(medium),
    };
}
exports.parseSecureClientQuery = parseSecureClientQuery;
function cloneClientQuerySafeForLogging(clientQuery) {
    return { ...clientQuery, csr: !clientQuery.csr ? clientQuery.csr : '<hidden>' };
}
exports.cloneClientQuerySafeForLogging = cloneClientQuerySafeForLogging;
function assertNotNull(value, message = 'Unexpected null/undefined value found') {
    if (value === null || value === undefined) {
        throw new Error(message);
    }
}
exports.assertNotNull = assertNotNull;
//# sourceMappingURL=Utilities.js.map