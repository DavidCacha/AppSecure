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
exports.attachSocketServer = void 0;
const flipper_common_1 = require("flipper-common");
const tracker_1 = require("../tracker");
const perf_hooks_1 = require("perf_hooks");
const processExit_1 = require("../utils/processExit");
const safe = (f) => {
    try {
        f();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.name, error.stack);
        }
    }
};
let numberOfConnectedClients = 0;
let disconnectTimeout;
/**
 * Attach and handle incoming messages from clients.
 * @param server A FlipperServer instance.
 * @param socket A ws socket on which to listen for events.
 */
function attachSocketServer(socket, server) {
    socket.on('connection', (client, req) => {
        const t0 = perf_hooks_1.performance.now();
        const clientAddress = (req.socket.remoteAddress &&
            ` ${req.socket.remoteAddress}:${req.socket.remotePort}`) ||
            '';
        console.log('Client connected', clientAddress);
        numberOfConnectedClients++;
        if (disconnectTimeout) {
            clearTimeout(disconnectTimeout);
        }
        server.emit('browser-connection-created', {});
        let connected = true;
        server.startAcceptingNewConections();
        async function onServerEvent(event, payload) {
            const message = {
                event: 'server-event',
                payload: {
                    event,
                    data: payload,
                },
            };
            client.send(JSON.stringify(message));
        }
        server.onAny(onServerEvent);
        async function onClientMessage(data) {
            let [event, payload] = [
                null,
                null,
            ];
            try {
                ({ event, payload } = JSON.parse(data.toString()));
            }
            catch (err) {
                console.warn('flipperServer -> onMessage: failed to parse JSON', err);
                const response = {
                    event: 'error',
                    payload: { message: `Failed to parse JSON request: ${err}` },
                };
                client.send(JSON.stringify(response));
                return;
            }
            switch (event) {
                case 'exec': {
                    const { id, command, args } = payload;
                    if (typeof args[Symbol.iterator] !== 'function') {
                        console.warn('flipperServer -> exec: args argument in payload is not iterable');
                        const responseError = {
                            event: 'exec-response-error',
                            payload: {
                                id,
                                data: 'Payload args argument is not an iterable.',
                            },
                        };
                        client.send(JSON.stringify(responseError));
                        return;
                    }
                    server
                        .exec(command, ...args)
                        .then((result) => {
                        if (connected) {
                            const response = {
                                event: 'exec-response',
                                payload: {
                                    id,
                                    data: result,
                                },
                            };
                            client.send(JSON.stringify(response));
                        }
                    })
                        .catch((error) => {
                        if (error instanceof flipper_common_1.UserError) {
                            console.warn(`flipper-server.startSocketServer.exec: ${error.message}`, error.context, error.stack);
                        }
                        if (error instanceof flipper_common_1.SystemError) {
                            console.error(`flipper-server.startSocketServer.exec: ${error.message}`, error.context, error.stack);
                        }
                        if (connected) {
                            // TODO: Serialize error
                            // TODO: log if verbose console.warn('Failed to handle response', error);
                            const responseError = {
                                event: 'exec-response-error',
                                payload: {
                                    id,
                                    data: error.toString() +
                                        (error.stack ? `\n${error.stack}` : ''),
                                },
                            };
                            client.send(JSON.stringify(responseError));
                        }
                    });
                }
            }
        }
        client.on('message', (data) => {
            safe(() => onClientMessage(data));
        });
        async function onClientClose(code, error) {
            console.log(`Client disconnected ${clientAddress}`);
            numberOfConnectedClients--;
            connected = false;
            server.offAny(onServerEvent);
            tracker_1.tracker.track('server-client-close', {
                code,
                error,
                sessionLength: perf_hooks_1.performance.now() - t0,
            });
            if (numberOfConnectedClients === 0) {
                server.stopAcceptingNewConections();
            }
            if ((0, flipper_common_1.isProduction)()) {
                const FIVE_HOURS = 5 * 60 * 60 * 1000;
                if (disconnectTimeout) {
                    clearTimeout(disconnectTimeout);
                }
                disconnectTimeout = setTimeout(() => {
                    if (numberOfConnectedClients === 0) {
                        console.info('[flipper-server] Shutdown as no clients are currently connected');
                        (0, processExit_1.processExit)(0);
                    }
                }, FIVE_HOURS);
            }
        }
        client.on('close', (code, _reason) => {
            console.info('[flipper-server] Client close with code', code);
            safe(() => onClientClose(code));
        });
        client.on('error', (error) => {
            safe(() => {
                /**
                 * The socket will close due to an error. In this case,
                 * do not close on idle as there's a high probability the
                 * client will attempt to connect again.
                 */
                onClientClose(undefined, error.message);
                console.error('Client disconnected with error', error);
            });
        });
    });
}
exports.attachSocketServer = attachSocketServer;
//# sourceMappingURL=attachSocketServer.js.map