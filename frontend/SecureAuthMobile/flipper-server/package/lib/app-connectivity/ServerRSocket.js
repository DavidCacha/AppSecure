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
const ServerWebSocketBase_1 = __importDefault(require("./ServerWebSocketBase"));
const tls_1 = __importDefault(require("tls"));
const net_1 = __importDefault(require("net"));
const rsocket_core_1 = require("rsocket-core");
const rsocket_tcp_server_1 = __importDefault(require("rsocket-tcp-server"));
const rsocket_flowable_1 = require("rsocket-flowable");
const ClientConnection_1 = require("./ClientConnection");
const Utilities_1 = require("./Utilities");
/**
 * RSocket based server. RSocket uses its own protocol for communication between
 * client and server.
 */
class ServerRSocket extends ServerWebSocketBase_1.default {
    constructor(listener) {
        super(listener);
        /**
         * Handle an incoming connection request over TLS.
         * @param socket Underlying socket connection.
         * @param payload Payload or message received.
         * @returns Returns a valid RSocket responder which will handle further
         * communication from the client.
         */
        this._trustedRequestHandler = (socket, payload) => {
            if (!payload.data) {
                return {};
            }
            const query = JSON.parse(payload.data);
            const clientQuery = {
                ...query,
                medium: (0, Utilities_1.transformCertificateExchangeMediumToType)(query.medium),
                rsocket: true,
            };
            this.listener.onDeprecationNotice(`[conn] RSockets are being deprecated at Flipper. Please, use the latest Flipper client in your app to migrate to WebSockets. App: ${clientQuery.app}. Device: ${clientQuery.device}.`);
            this.listener.onSecureConnectionAttempt(clientQuery);
            console.info(`[conn] Secure rsocket connection attempt: ${clientQuery.app} on ${clientQuery.device_id}. Medium ${clientQuery.medium}. CSR: ${clientQuery.csr_path}`);
            const clientConnection = {
                subscribeToEvents(subscriber) {
                    socket.connectionStatus().subscribe({
                        onNext(payload) {
                            let status = ClientConnection_1.ConnectionStatus.CONNECTED;
                            if (payload.kind == 'ERROR')
                                status = ClientConnection_1.ConnectionStatus.ERROR;
                            else if (payload.kind == 'CLOSED')
                                status = ClientConnection_1.ConnectionStatus.CLOSED;
                            else if (payload.kind == 'CONNECTED')
                                status = ClientConnection_1.ConnectionStatus.CONNECTED;
                            else if (payload.kind == 'NOT_CONNECTED')
                                status = ClientConnection_1.ConnectionStatus.NOT_CONNECTED;
                            else if (payload.kind == 'CONNECTING')
                                status = ClientConnection_1.ConnectionStatus.CONNECTING;
                            subscriber(status);
                        },
                        onSubscribe(subscription) {
                            subscription.request(Number.MAX_SAFE_INTEGER);
                        },
                        onError(payload) {
                            console.error('[client] connection status error ', payload);
                        },
                    });
                },
                close() {
                    socket.close();
                },
                send(data) {
                    socket.fireAndForget({ data: JSON.stringify(data) });
                },
                sendExpectResponse(data) {
                    return new Promise((resolve, reject) => {
                        socket
                            .requestResponse({
                            data: JSON.stringify(data),
                        })
                            .subscribe({
                            onComplete: (payload) => {
                                const response = JSON.parse(payload.data);
                                response.length = payload.data.length;
                                resolve(response);
                            },
                            onError: (e) => {
                                reject(e);
                            },
                        });
                    });
                },
            };
            let resolvedClient;
            const client = this.listener.onConnectionCreated(clientQuery, clientConnection);
            client
                .then((client) => {
                console.info(`[conn] Client connected: ${clientQuery.app} on ${clientQuery.device_id}. Medium ${clientQuery.medium}. CSR: ${clientQuery.csr_path}`);
                resolvedClient = client;
            })
                .catch((e) => {
                console.error('[conn] Failed to resolve new client', e);
            });
            return {
                fireAndForget: (payload) => {
                    if (resolvedClient) {
                        this.listener.onClientMessage(resolvedClient.id, payload.data);
                    }
                    else {
                        client &&
                            client
                                .then((client) => {
                                this.listener.onClientMessage(client.id, payload.data);
                            })
                                .catch((e) => {
                                console.error('Could not deliver message: ', e);
                            });
                    }
                },
            };
        };
        /**
         * Handle an incoming connection request over an insecure connection.
         * @param socket Underlying socket connection.
         * @param payload Payload or message received.
         * @returns Returns a valid RSocket responder which will handle further
         * communication from the client.
         */
        this._untrustedRequestHandler = (_socket, payload) => {
            if (!payload.data) {
                return {};
            }
            const query = JSON.parse(payload.data);
            const clientQuery = {
                ...query,
                medium: (0, Utilities_1.transformCertificateExchangeMediumToType)(query.medium),
                rsocket: true,
            };
            this.listener.onConnectionAttempt(clientQuery);
            return {
                requestResponse: (payload) => {
                    if (typeof payload.data !== 'string') {
                        return new rsocket_flowable_1.Single((_) => { });
                    }
                    let rawData;
                    try {
                        rawData = JSON.parse(payload.data);
                    }
                    catch (err) {
                        console.error(`[conn] Invalid JSON: ${payload.data}`, 'clientMessage', 'server');
                        return new rsocket_flowable_1.Single((_) => { });
                    }
                    return new rsocket_flowable_1.Single((subscriber) => {
                        subscriber.onSubscribe(undefined);
                        this._onHandleUntrustedMessage(clientQuery, rawData)
                            .then((response) => {
                            subscriber.onComplete({
                                data: response,
                                metadata: '',
                            });
                        })
                            .catch((err) => {
                            subscriber.onError(err);
                        });
                    });
                },
                // Can probably refactor this out
                // Leaving this here for a while for backwards compatibility,
                // but for up to date SDKs it will no longer used.
                fireAndForget: (payload) => {
                    if (typeof payload.data !== 'string') {
                        return;
                    }
                    let rawData;
                    try {
                        rawData = JSON.parse(payload.data);
                    }
                    catch (err) {
                        console.error(`Invalid JSON: ${payload.data}`, 'server');
                        return;
                    }
                    if (rawData && rawData.method === 'signCertificate') {
                        console.debug('CSR received from device', 'server');
                        this._onHandleUntrustedMessage(clientQuery, rawData)
                            .then((_) => { })
                            .catch((err) => {
                            console.error('[conn] Unable to process CSR, failed with error.', err);
                        });
                    }
                },
            };
        };
        this.rawServer_ = null;
    }
    /**
     * Start the server bound to the specified port. It configures
     * the RSocket server factory and request handler based on the optional
     * sslConfig argument.
     */
    start(port, sslConfig) {
        const self = this;
        return new Promise((resolve, reject) => {
            try {
                // eslint-disable-next-line prefer-const
                let rawServer;
                const serverFactory = (onConnect) => {
                    const transportServer = sslConfig
                        ? tls_1.default.createServer(sslConfig, (socket) => {
                            onConnect(socket);
                        })
                        : net_1.default.createServer(onConnect);
                    transportServer.on('error', reject).on('listening', () => {
                        console.debug(`${sslConfig ? 'Secure' : 'Certificate'} server started on port ${port}`, 'server');
                        self.listener.onListening(port);
                        self.rawServer_ = rawServer;
                        resolve(transportServer.address().port);
                    });
                    return transportServer;
                };
                rawServer = new rsocket_core_1.RSocketServer({
                    getRequestHandler: sslConfig
                        ? this._trustedRequestHandler
                        : this._untrustedRequestHandler,
                    transport: new rsocket_tcp_server_1.default({
                        port,
                        serverFactory,
                    }),
                });
                rawServer.start();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    stop() {
        if (this.rawServer_) {
            return Promise.resolve(this.rawServer_.stop());
        }
        return Promise.resolve();
    }
    stopAcceptingNewConectionsImpl() {
        // Did not find a straightforard way to iterate through RSocket open connections and close them.
        // We probably should not care and invest in it anyway as we are going to remove RScokets.
    }
}
exports.default = ServerRSocket;
//# sourceMappingURL=ServerRSocket.js.map