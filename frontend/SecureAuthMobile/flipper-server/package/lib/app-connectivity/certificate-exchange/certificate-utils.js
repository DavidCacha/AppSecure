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
exports.validateAuthToken = exports.hasAuthToken = exports.getAuthToken = exports.generateAuthToken = exports.ephemeralEncryption = exports.getCACertificate = exports.generateClientCertificate = exports.extractBundleIdFromCSR = exports.loadSecureServerConfig = exports.ensureOpenSSLIsAvailable = exports.deviceClientCertFile = exports.deviceCAcertFile = exports.csrFileName = exports.serverAuthToken = exports.serverCert = exports.serverSrl = exports.serverCsr = exports.serverKey = exports.caCert = exports.caKey = void 0;
const util_1 = require("util");
const crypto_1 = __importDefault(require("crypto"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const openssl_wrapper_with_promises_1 = require("./openssl-wrapper-with-promises");
const path_1 = __importDefault(require("path"));
const tmp_1 = __importDefault(require("tmp"));
const flipper_common_1 = require("flipper-common");
const flipper_common_2 = require("flipper-common");
const paths_1 = require("../../utils/paths");
const jwt = __importStar(require("jsonwebtoken"));
const async_mutex_1 = require("async-mutex");
const tls_1 = require("tls");
const tmpFile = (0, util_1.promisify)(tmp_1.default.file);
const getFilePath = (filename) => {
    return path_1.default.resolve(paths_1.flipperDataFolder, 'certs', filename);
};
// Desktop file paths
exports.caKey = getFilePath('ca.key');
exports.caCert = getFilePath('ca.crt');
exports.serverKey = getFilePath('server.key');
exports.serverCsr = getFilePath('server.csr');
exports.serverSrl = getFilePath('server.srl');
exports.serverCert = getFilePath('server.crt');
exports.serverAuthToken = getFilePath('auth.token');
// Device file paths
exports.csrFileName = 'app.csr';
exports.deviceCAcertFile = 'sonarCA.crt';
exports.deviceClientCertFile = 'device.crt';
const caSubject = '/C=US/ST=CA/L=Menlo Park/O=Sonar/CN=SonarCA';
const serverSubject = '/C=US/ST=CA/L=Menlo Park/O=Sonar/CN=localhost';
const minCertExpiryWindowSeconds = 24 * 60 * 60;
const allowedAppNameRegex = /^[\w.-]+$/;
const logTag = 'certificateUtils';
/*
 * RFC2253 specifies the unamiguous x509 subject format.
 * However, even when specifying this, different openssl implementations
 * wrap it differently, e.g "subject=X" vs "subject= X".
 */
const x509SubjectCNRegex = /[=,]\s*CN=([^,]*)(,.*)?$/;
const ensureOpenSSLIsAvailable = async () => {
    if (!(await (0, openssl_wrapper_with_promises_1.isInstalled)())) {
        throw new Error("It looks like you don't have OpenSSL installed. Please install it to continue.");
    }
};
exports.ensureOpenSSLIsAvailable = ensureOpenSSLIsAvailable;
let serverConfig;
const loadSecureServerConfig = async () => {
    if (serverConfig) {
        return serverConfig;
    }
    await (0, exports.ensureOpenSSLIsAvailable)();
    await certificateSetup();
    await (0, exports.generateAuthToken)();
    const [key, cert, ca] = await Promise.all([
        fs_extra_1.default.readFile(exports.serverKey),
        fs_extra_1.default.readFile(exports.serverCert),
        fs_extra_1.default.readFile(exports.caCert),
    ]);
    serverConfig = {
        key,
        cert,
        ca,
        requestCert: true,
        rejectUnauthorized: true, // can be false if necessary as we don't strictly need to verify the client
    };
    return serverConfig;
};
exports.loadSecureServerConfig = loadSecureServerConfig;
const extractBundleIdFromCSR = async (csr) => {
    const path = await writeToTempFile(csr);
    const subject = await (0, openssl_wrapper_with_promises_1.openssl)('req', {
        in: path,
        noout: true,
        subject: true,
        nameopt: true,
        RFC2253: false,
    });
    await fs_extra_1.default.unlink(path);
    const matches = subject.trim().match(x509SubjectCNRegex);
    if (!matches || matches.length < 2) {
        throw new Error(`Cannot extract CN from ${subject}`);
    }
    const appName = matches[1];
    if (!appName.match(allowedAppNameRegex)) {
        throw new Error(`Disallowed app name in CSR: ${appName}. Only alphanumeric characters and '.' allowed.`);
    }
    return appName;
};
exports.extractBundleIdFromCSR = extractBundleIdFromCSR;
const generateClientCertificate = async (csr) => {
    console.debug('Creating new client cert', logTag);
    return writeToTempFile(csr).then((path) => {
        return (0, openssl_wrapper_with_promises_1.openssl)('x509', {
            req: true,
            in: path,
            CA: exports.caCert,
            CAkey: exports.caKey,
            CAcreateserial: true,
            CAserial: exports.serverSrl,
        });
    });
};
exports.generateClientCertificate = generateClientCertificate;
const getCACertificate = async () => {
    return fs_extra_1.default.readFile(exports.caCert, 'utf-8');
};
exports.getCACertificate = getCACertificate;
const certificateSetup = async () => {
    if ((0, flipper_common_2.isTest)()) {
        throw new Error('Server certificates not available in test');
    }
    else {
        await (0, flipper_common_1.reportPlatformFailures)(ensureServerCertExists(), 'ensureServerCertExists');
    }
};
const mutex = new async_mutex_1.Mutex();
const ensureServerCertExists = async () => {
    return mutex.runExclusive(async () => {
        const certs = await Promise.all([
            fs_extra_1.default.readFile(exports.serverKey).catch(() => ''),
            fs_extra_1.default.readFile(exports.serverCert).catch(() => ''),
            fs_extra_1.default.readFile(exports.caCert).catch(() => ''),
        ]);
        if (!certs.every(Boolean)) {
            console.info('No certificates were found, generating new ones');
            await generateServerCertificate();
        }
        else {
            try {
                console.info('Checking for certificates validity');
                await checkCertIsValid(exports.serverCert);
                console.info('Checking certificate was issued by current CA');
                await verifyServerCertWasIssuedByCA();
                console.info('Checking certs can be used for TLS');
                // https://fb.workplace.com/groups/flippersupport/posts/1712654405881877/
                (0, tls_1.createSecureContext)({
                    key: certs[0],
                    cert: certs[1],
                    ca: certs[2],
                });
                console.info('Current certificates are valid');
            }
            catch (e) {
                console.warn('Not all certificates are valid, generating new ones', e);
                await generateServerCertificate();
            }
        }
    });
};
const generateServerCertificate = async () => {
    await ensureCertificateAuthorityExists();
    console.warn('Creating new server certificate');
    await (0, openssl_wrapper_with_promises_1.openssl)('genrsa', { out: exports.serverKey, '2048': false });
    await (0, openssl_wrapper_with_promises_1.openssl)('req', {
        new: true,
        key: exports.serverKey,
        out: exports.serverCsr,
        subj: serverSubject,
    });
    await (0, openssl_wrapper_with_promises_1.openssl)('x509', {
        req: true,
        in: exports.serverCsr,
        CA: exports.caCert,
        CAkey: exports.caKey,
        CAcreateserial: true,
        CAserial: exports.serverSrl,
        out: exports.serverCert,
    });
};
const ephemeralEncryption = async (path) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto_1.default.randomBytes(32);
    const iv = crypto_1.default.randomBytes(16);
    const fileContent = await fs_extra_1.default.readFile(path);
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(key), iv);
    const encrypted = Buffer.concat([cipher.update(fileContent), cipher.final()]);
    return {
        data: Buffer.concat([iv, encrypted]).toString('base64'),
        key: key.toString('base64'),
    };
};
exports.ephemeralEncryption = ephemeralEncryption;
const ensureCertificateAuthorityExists = async () => {
    if (!(await fs_extra_1.default.pathExists(exports.caKey))) {
        return generateCertificateAuthority();
    }
    return checkCertIsValid(exports.caCert).catch(() => generateCertificateAuthority());
};
const generateCertificateAuthority = async () => {
    if (!(await fs_extra_1.default.pathExists(getFilePath('')))) {
        await fs_extra_1.default.mkdir(getFilePath(''), { recursive: true });
    }
    console.log('Generating new CA');
    await (0, openssl_wrapper_with_promises_1.openssl)('genrsa', { out: exports.caKey, '2048': false });
    await (0, openssl_wrapper_with_promises_1.openssl)('req', {
        new: true,
        x509: true,
        subj: caSubject,
        key: exports.caKey,
        out: exports.caCert,
    });
};
const checkCertIsValid = async (filename) => {
    if (!(await fs_extra_1.default.pathExists(filename))) {
        throw new Error(`${filename} does not exist`);
    }
    // openssl checkend is a nice feature but it only checks for certificates
    // expiring in the future, not those that have already expired.
    // So we need a separate check for certificates that have already expired
    // but since this involves parsing date outputs from openssl, which is less
    // reliable, keeping both checks for safety.
    try {
        await (0, openssl_wrapper_with_promises_1.openssl)('x509', {
            checkend: minCertExpiryWindowSeconds,
            in: filename,
        });
    }
    catch (e) {
        console.warn(`Checking if certificate expire soon: ${filename}`, logTag, e);
        const endDateOutput = await (0, openssl_wrapper_with_promises_1.openssl)('x509', {
            enddate: true,
            in: filename,
            noout: true,
        });
        const dateString = endDateOutput.trim().split('=')[1].trim();
        const expiryDate = Date.parse(dateString);
        if (isNaN(expiryDate)) {
            console.error(`Unable to parse certificate expiry date: ${endDateOutput}`);
            throw new Error('Cannot parse certificate expiry date. Assuming it has expired.');
        }
        if (expiryDate <= Date.now() + minCertExpiryWindowSeconds * 1000) {
            throw new Error('Certificate has expired or will expire soon.');
        }
    }
};
const verifyServerCertWasIssuedByCA = async () => {
    const options = { CAfile: exports.caCert };
    options[exports.serverCert] = false;
    const output = await (0, openssl_wrapper_with_promises_1.openssl)('verify', options);
    const verified = output.match(/[^:]+: OK/);
    if (!verified) {
        // This should never happen, but if it does, we need to notice so we can
        // generate a valid one, or no clients will trust our server.
        throw new Error('Current server cert was not issued by current CA');
    }
};
const writeToTempFile = async (content) => {
    const path = await tmpFile();
    await fs_extra_1.default.writeFile(path, content);
    return path;
};
const generateAuthToken = async () => {
    console.info('Generate client authentication token');
    await ensureServerCertExists();
    const privateKey = await fs_extra_1.default.readFile(exports.serverKey);
    const token = jwt.sign({ unixname: os_1.default.userInfo().username }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '21 days',
    });
    await fs_extra_1.default.writeFile(exports.serverAuthToken, token);
    return token;
};
exports.generateAuthToken = generateAuthToken;
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
const getAuthToken = async () => {
    if (!(await (0, exports.hasAuthToken)())) {
        return (0, exports.generateAuthToken)();
    }
    const tokenBuffer = await fs_extra_1.default.readFile(exports.serverAuthToken);
    const token = tokenBuffer.toString();
    try {
        console.info('Verify authentication token');
        const serverCertificate = await fs_extra_1.default.readFile(exports.serverCert);
        jwt.verify(token, serverCertificate);
        console.info('Token verification succeeded');
    }
    catch (_) {
        console.warn('Either token has expired or is invalid');
        return (0, exports.generateAuthToken)();
    }
    return token;
};
exports.getAuthToken = getAuthToken;
const hasAuthToken = async () => {
    return fs_extra_1.default.pathExists(exports.serverAuthToken);
};
exports.hasAuthToken = hasAuthToken;
const validateAuthToken = (token) => {
    if (!serverConfig) {
        throw new Error('Unable to validate auth token as no server configuration is available');
    }
    jwt.verify(token, serverConfig.cert);
};
exports.validateAuthToken = validateAuthToken;
//# sourceMappingURL=certificate-utils.js.map