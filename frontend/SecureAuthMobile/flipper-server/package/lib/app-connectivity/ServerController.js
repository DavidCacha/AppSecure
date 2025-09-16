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
exports.ServerController = void 0;
const flipper_common_1 = require("flipper-common");
const ClientConnection_1 = require("./ClientConnection");
const events_1 = require("events");
const invariant_1 = __importDefault(require("invariant"));
const DummyDevice_1 = __importDefault(require("../devices/DummyDevice"));
const Utilities_1 = require("./Utilities");
const ServerFactory_1 = require("./ServerFactory");
const FlipperServerConfig_1 = require("../FlipperServerConfig");
const certificate_utils_1 = require("./certificate-exchange/certificate-utils");
const DesktopCertificateProvider_1 = __importDefault(require("../devices/desktop/DesktopCertificateProvider"));
const WWWCertificateProvider_1 = __importDefault(require("../fb-stubs/WWWCertificateProvider"));
const tracker_1 = require("../tracker");
const recorder_1 = require("../recorder");
const GK_1 = __importDefault(require("../fb-stubs/GK"));
/**
 * Responsible of creating and managing the actual underlying servers:
 * - Insecure (used for certificate exchange)
 * - Secure (used for secure communication between the client and server)
 * - Browser (only ever used between Desktop and a local Browser)
 *
 * Additionally, it manages client connections.
 */
class ServerController extends events_1.EventEmitter {
    constructor(flipperServer) {
        super();
        this.connections = new Map();
        this.timestamps = new Map();
        this.secureServer = null;
        this.insecureServer = null;
        this.altSecureServer = null;
        this.altInsecureServer = null;
        this.browserServer = null;
        this.timeHandlers = new Map();
        this.flipperServer = flipperServer;
        this.connectionTracker = new ConnectionTracker(this.logger);
        recorder_1.recorder.enable(flipperServer);
    }
    onClientMessage(clientId, payload) {
        this.flipperServer.emit('client-message', {
            id: clientId,
            message: payload,
        });
    }
    get logger() {
        return this.flipperServer.logger;
    }
    /**
     * Loads the secure server configuration and starts any necessary servers.
     * Initialisation is complete once the initialized promise is fullfilled at
     * which point Flipper is accepting connections.
     */
    async init() {
        if ((0, flipper_common_1.isTest)()) {
            throw new Error('Spawing new server is not supported in test');
        }
        const { insecure, secure } = (0, FlipperServerConfig_1.getServerPortsConfig)().serverPorts;
        const options = await (0, certificate_utils_1.loadSecureServerConfig)();
        console.info('[ws] secure server listening at port: ', secure);
        this.secureServer = await (0, ServerFactory_1.createServer)(secure, this, options);
        const { secure: altSecure } = (0, FlipperServerConfig_1.getServerPortsConfig)().altServerPorts;
        console.info('[ws] secure server listening at port: ', altSecure);
        this.altSecureServer = await (0, ServerFactory_1.createServer)(altSecure, this, options, ServerFactory_1.TransportType.WebSocket);
        console.info('[ws] insecure server listening at port: ', insecure);
        this.insecureServer = await (0, ServerFactory_1.createServer)(insecure, this);
        const { insecure: altInsecure } = (0, FlipperServerConfig_1.getServerPortsConfig)().altServerPorts;
        console.info('[ws] insecure server listening at port: ', altInsecure);
        this.altInsecureServer = await (0, ServerFactory_1.createServer)(altInsecure, this, undefined, ServerFactory_1.TransportType.WebSocket);
        const browserPort = (0, FlipperServerConfig_1.getServerPortsConfig)().browserPort;
        console.info('[ws] Browser server listening at port: ', browserPort);
        this.browserServer = await (0, ServerFactory_1.createBrowserServer)(browserPort, this);
    }
    /**
     * If initialized, it stops any started servers.
     */
    async close() {
        await Promise.all([
            this.insecureServer?.stop(),
            this.secureServer?.stop(),
            this.altInsecureServer?.stop(),
            this.altSecureServer?.stop(),
            this.browserServer?.stop(),
        ]);
    }
    onDeviceLogs(logs) {
        recorder_1.recorder.logConnectionRecordEntries(logs);
    }
    onConnectionCreated(clientQuery, clientConnection, downgrade) {
        const { app, app_id, os, device, device_id, sdk_version, csr, csr_path, medium, rsocket, } = clientQuery;
        recorder_1.recorder.log(clientQuery, 'Connection established');
        tracker_1.tracker.track('app-connection-created', {
            app,
            os,
            device,
            device_id,
            medium,
        });
        return this.addConnection(clientConnection, {
            app,
            app_id,
            os,
            device,
            device_id,
            sdk_version,
            medium,
            rsocket,
            csr,
            csr_path,
        }, downgrade);
    }
    onConnectionClosed(clientId) {
        this.removeConnection(clientId);
    }
    onListening(port) {
        this.emit('listening', port);
    }
    onSecureConnectionAttempt(clientQuery) {
        const strippedClientQuery = (({ device_id, ...o }) => o)(clientQuery);
        let id = (0, flipper_common_1.buildClientId)({ device_id: 'unknown', ...strippedClientQuery });
        const timestamp = this.timestamps.get(id);
        if (timestamp) {
            this.timestamps.delete(id);
        }
        id = (0, flipper_common_1.buildClientId)(clientQuery);
        this.timestamps.set(id, {
            secureStart: Date.now(),
            ...timestamp,
        });
        tracker_1.tracker.track('app-connection-secure-attempt', {
            app: clientQuery.app,
            os: clientQuery.os,
            device: clientQuery.device,
            device_id: clientQuery.device_id,
            medium: clientQuery.medium,
        });
        // Without these checks, the user might see a connection timeout error instead,
        // which would be much harder to track down
        if (clientQuery.os === 'iOS' &&
            !(0, FlipperServerConfig_1.getFlipperServerConfig)().settings.enableIOS) {
            recorder_1.recorder.logError(clientQuery, `Refusing connection since iOS support is disabled in settings`);
            return;
        }
        if (clientQuery.os === 'Android' &&
            !(0, FlipperServerConfig_1.getFlipperServerConfig)().settings.enableAndroid) {
            recorder_1.recorder.logError(clientQuery, `Refusing connection since Android support is disabled in settings`);
            return;
        }
        this.connectionTracker.logConnectionAttempt(clientQuery);
        const timeout = this.timeHandlers.get(clientQueryToKey(clientQuery));
        if (timeout) {
            clearTimeout(timeout);
        }
        const device = this.flipperServer.getDeviceWithSerial(clientQuery.device_id);
        if (!device) {
            this.flipperServer.registerDevice(new DummyDevice_1.default(this.flipperServer, clientQuery.device_id, `${clientQuery.device}`, clientQuery.os));
        }
        const client = {
            os: clientQuery.os,
            deviceName: clientQuery.device,
            appName: (0, Utilities_1.appNameWithUpdateHint)(clientQuery),
        };
        this.emit('start-client-setup', client);
    }
    /**
     * A connection has been established between a running app and Flipper Desktop.
     * The connection sole purpose is to perform the certificate exchange.
     * @param clientQuery Client query defines the arguments passed down from the app
     * to Flipper Desktop.
     */
    onConnectionAttempt(clientQuery) {
        // Remove the device id from the query, if found.
        // Instead, set the device id as 'unknown'.
        const strippedClientQuery = (({ device_id, ...o }) => o)(clientQuery);
        const id = (0, flipper_common_1.buildClientId)({ device_id: 'unknown', ...strippedClientQuery });
        this.timestamps.set(id, {
            insecureStart: Date.now(),
        });
        tracker_1.tracker.track('app-connection-insecure-attempt', clientQuery);
        recorder_1.recorder.log(clientQuery, 'Insecure connection attempt');
        this.connectionTracker.logConnectionAttempt(clientQuery);
        const client = {
            os: clientQuery.os,
            deviceName: clientQuery.device,
            appName: (0, Utilities_1.appNameWithUpdateHint)(clientQuery),
        };
        this.emit('start-client-setup', client);
    }
    onProcessCSR(unsanitizedCSR, clientQuery, appDirectory) {
        let certificateProvider;
        switch (clientQuery.os) {
            case 'Android': {
                (0, Utilities_1.assertNotNull)(this.flipperServer.android, 'Android settings have not been provided / enabled');
                certificateProvider = this.flipperServer.android.certificateProvider;
                break;
            }
            case 'iOS': {
                (0, Utilities_1.assertNotNull)(this.flipperServer.ios, 'iOS settings have not been provided / enabled');
                certificateProvider = this.flipperServer.ios.certificateProvider;
                if (clientQuery.medium === 'WWW') {
                    certificateProvider = new WWWCertificateProvider_1.default(this.flipperServer.keytarManager);
                }
                break;
            }
            // Used by Spark AR studio (search for SkylightFlipperClient)
            // See D30992087
            case 'MacOS':
            case 'Windows': {
                certificateProvider = new DesktopCertificateProvider_1.default();
                break;
            }
            default: {
                throw new Error(`OS '${clientQuery.os}' does not support certificate exchange.`);
            }
        }
        certificateProvider.verifyMedium(clientQuery.medium);
        recorder_1.recorder.log(clientQuery, 'Certificate Signing Request being processed');
        return new Promise((resolve, reject) => {
            (0, flipper_common_1.reportPlatformFailures)(certificateProvider.processCertificateSigningRequest(clientQuery, unsanitizedCSR, appDirectory), 'processCertificateSigningRequest')
                .then((result) => {
                const shouldSendEncryptedCertificates = GK_1.default.get('flipper_encrypted_exchange') && clientQuery.os === 'iOS';
                const client = {
                    os: clientQuery.os,
                    deviceName: clientQuery.device,
                    appName: (0, Utilities_1.appNameWithUpdateHint)(clientQuery),
                };
                if (!result.error) {
                    recorder_1.recorder.log(clientQuery, 'Certificate Signing Request successfully processed');
                    this.timeHandlers.set(
                    // In the original insecure connection request, `device_id` is set to "unknown".
                    // Flipper queries adb/idb to learn the device ID and provides it back to the app.
                    // Once app knows it, it starts using the correct device ID for its subsequent secure connections.
                    // When the app re-connects securely after the certificate exchange process, we need to cancel this timeout.
                    // Since the original clientQuery has `device_id` set to "unknown", we update it here with the correct `device_id` to find it and cancel it later.
                    clientQueryToKey({ ...clientQuery, device_id: result.deviceId }), setTimeout(() => {
                        this.emit('client-unresponsive-error', {
                            client,
                            medium: clientQuery.medium,
                            deviceID: result.deviceId,
                        });
                    }, 30 * 1000));
                    tracker_1.tracker.track('app-connection-certificate-exchange', {
                        ...clientQuery,
                        successful: true,
                        device_id: result.deviceId,
                    });
                    const response = {
                        deviceId: result.deviceId,
                    };
                    resolve(response);
                }
                else if (shouldSendEncryptedCertificates) {
                    recorder_1.recorder.log(clientQuery, 'Certificate Signing Request failed, attempt fallback exchange');
                    this.emit('client-setup-secret-exchange', client, result.certificates?.key);
                    let deviceId = (0, flipper_common_1.uuid)();
                    const device = this.flipperServer.getDeviceWithName(clientQuery.device);
                    if (device) {
                        deviceId = device.serial;
                    }
                    else {
                        this.flipperServer.registerDevice(new DummyDevice_1.default(this.flipperServer, deviceId, clientQuery.device, clientQuery.os));
                    }
                    tracker_1.tracker.track('app-connection-insecure-attempt-fallback', {
                        app: clientQuery.app,
                        os: clientQuery.os,
                        device: clientQuery.device,
                        medium: clientQuery.medium,
                        device_id: deviceId,
                    });
                    const response = {
                        deviceId,
                        certificates: result.certificates?.data,
                    };
                    resolve(response);
                }
                else {
                    throw result.error;
                }
            })
                .catch((error) => {
                tracker_1.tracker.track('app-connection-certificate-exchange', {
                    ...clientQuery,
                    successful: false,
                    error: error.message,
                });
                reject(error);
            });
        });
    }
    onError(error) {
        this.emit('error', error);
    }
    toJSON() {
        return null;
    }
    onClientSetupError(clientQuery, error) {
        recorder_1.recorder.logError(clientQuery, 'Failed to exchange certificate', error);
        const client = {
            os: clientQuery.os,
            deviceName: clientQuery.device,
            appName: (0, Utilities_1.appNameWithUpdateHint)(clientQuery),
        };
        this.emit('client-setup-error', { client, error });
    }
    /**
     * Creates a Client and sets the underlying connection.
     * @param connection A client connection to communicate between server and client.
     * @param clientQuery The client query created from the initial handshake.
     * @param csrQuery The CSR query which contains CSR related information.
     */
    async addConnection(connection, clientQuery, silentReplace) {
        (0, invariant_1.default)(clientQuery, 'expected query');
        // try to get id by comparing giving `csr` to file from `csr_path`
        // otherwise, use given device_id.
        const { csr_path, csr } = clientQuery;
        // For Android, device id might change
        if (csr_path && csr && clientQuery.os === 'Android') {
            const bundleId = await (0, certificate_utils_1.extractBundleIdFromCSR)(csr);
            (0, Utilities_1.assertNotNull)(this.flipperServer.android);
            clientQuery.device_id =
                await this.flipperServer.android.certificateProvider.getTargetDeviceId(clientQuery, bundleId, csr_path, csr);
            recorder_1.recorder.log(clientQuery, `Detected ${bundleId} on ${clientQuery.device_id} in certificate`);
        }
        clientQuery.app = (0, Utilities_1.appNameWithUpdateHint)(clientQuery);
        const id = (0, flipper_common_1.buildClientId)(clientQuery);
        recorder_1.recorder.log(clientQuery, `Matching device for ${clientQuery.app} on ${clientQuery.device_id}`);
        const client = {
            id,
            query: clientQuery,
        };
        const info = {
            client,
            connection,
        };
        recorder_1.recorder.log(clientQuery, `Initializing client ${clientQuery.app} on ${clientQuery.device_id}`);
        connection.subscribeToEvents((status) => {
            if (status === ClientConnection_1.ConnectionStatus.CLOSED ||
                status === ClientConnection_1.ConnectionStatus.ERROR) {
                this.onConnectionClosed(client.id);
            }
        });
        recorder_1.recorder.log(clientQuery, `Device client initialized: ${id}`);
        /* If a device gets disconnected without being cleaned up properly,
         * Flipper won't be aware until it attempts to reconnect.
         * When it does we need to terminate the zombie connection.
         */
        if (this.connections.has(id)) {
            const connectionInfo = this.connections.get(id);
            if (connectionInfo) {
                if (connectionInfo.connection &&
                    connectionInfo.connection !== connection) {
                    if (!silentReplace) {
                        connectionInfo.connection.close();
                    }
                    this.removeConnection(id);
                }
            }
        }
        this.connections.set(id, info);
        this.flipperServer.emit('client-connected', client);
        const tracker = this.timestamps.get(id);
        if (tracker) {
            const end = Date.now();
            const start = tracker.insecureStart
                ? tracker.insecureStart
                : tracker.secureStart;
            if (start) {
                const elapsed = Math.round(end - start);
                this.logger.track('performance', 'client-connection-tracker', {
                    'time-to-connection': elapsed,
                    ...clientQuery,
                });
                this.timestamps.delete(id);
            }
        }
        return client;
    }
    attachFakeClient(client) {
        this.connections.set(client.id, {
            client,
            connection: null,
        });
    }
    /**
     * Removes a client connection by disconnecting it, if still connected
     * and then deleting it from the tracked connections.
     * @param id The client connection identifier.
     */
    removeConnection(id) {
        const connectionInfo = this.connections.get(id);
        if (connectionInfo) {
            recorder_1.recorder.log(connectionInfo.client.query, `Disconnected: ${connectionInfo.client.query.app} on ${connectionInfo.client.query.device_id}.`);
            const device = this.flipperServer.getDeviceWithSerial(connectionInfo.client.query.device_id);
            this.flipperServer.emit('client-disconnected', { id });
            this.connections.delete(id);
            this.flipperServer.pluginManager.stopAllServerAddOns(id);
            if (device && device.info.deviceType === 'dummy') {
                this.flipperServer.unregisterDevice(device.serial);
            }
        }
    }
    onDeprecationNotice(message) {
        const notification = {
            type: 'warning',
            title: 'Deprecation notice',
            description: message,
        };
        this.flipperServer.emit('notification', notification);
    }
}
exports.ServerController = ServerController;
class ConnectionTracker {
    constructor(logger) {
        this.timeWindowMillis = 20 * 1000;
        this.connectionProblemThreshold = 4;
        // "${device}.${app}" -> [timestamp1, timestamp2...]
        this.connectionAttempts = new Map();
        this.logger = logger;
    }
    logConnectionAttempt(clientQuery) {
        const key = `${clientQuery.os}-${clientQuery.device}-${clientQuery.app}`;
        const time = Date.now();
        let entry = this.connectionAttempts.get(key) || [];
        entry.push(time);
        entry = entry.filter((t) => t >= time - this.timeWindowMillis);
        this.connectionAttempts.set(key, entry);
        if (entry.length >= this.connectionProblemThreshold) {
            recorder_1.recorder.logError(clientQuery, `Connection loop detected with ${key}. Connected ${this.connectionProblemThreshold} times within ${this.timeWindowMillis / 1000}s.`);
        }
    }
}
function clientQueryToKey(clientQuery) {
    return `${clientQuery.app}/${clientQuery.os}/${clientQuery.device}/${clientQuery.device_id}`;
}
//# sourceMappingURL=ServerController.js.map