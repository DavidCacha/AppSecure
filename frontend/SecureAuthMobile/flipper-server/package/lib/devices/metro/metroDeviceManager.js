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
const MetroDevice_1 = __importDefault(require("./MetroDevice"));
const http_1 = __importDefault(require("http"));
const environmentVariables_1 = require("../../utils/environmentVariables");
const ws_1 = __importDefault(require("ws"));
const METRO_HOST = 'localhost';
const METRO_PORT = (0, environmentVariables_1.parseEnvironmentVariableAsNumber)('METRO_SERVER_PORT', 8081);
const METRO_URL = `http://${METRO_HOST}:${METRO_PORT}`;
const METRO_LOGS_ENDPOINT = `ws://${METRO_HOST}:${METRO_PORT}/events`;
const METRO_MESSAGE = ['React Native packager is running', 'Metro is running'];
const QUERY_INTERVAL = 5000;
async function isMetroRunning() {
    return new Promise((resolve) => {
        // We use Node's http library, rather than fetch api, as the latter cannot supress network errors being shown in the devtools console
        // which generates a lot of noise
        http_1.default
            .get(METRO_URL, (resp) => {
            let data = '';
            resp
                .on('data', (chunk) => {
                data += chunk;
            })
                .on('end', () => {
                const isMetro = METRO_MESSAGE.some((msg) => data.includes(msg));
                resolve(isMetro);
            });
        })
            .on('error', (err) => {
            if (err.code !== 'ECONNREFUSED' && err.code !== 'ECONNRESET') {
                console.warn(`Could not connect to METRO ${err}`);
            }
            resolve(false);
        });
    });
}
async function registerMetroDevice(ws, flipperServer) {
    const metroDevice = new MetroDevice_1.default(flipperServer, METRO_URL, ws);
    flipperServer.registerDevice(metroDevice);
}
exports.default = (flipperServer) => {
    let timeoutHandle;
    let ws;
    let unregistered = false;
    async function tryConnectToMetro() {
        if (ws) {
            return;
        }
        if (await isMetroRunning()) {
            try {
                const _ws = new ws_1.default(METRO_LOGS_ENDPOINT, {
                    // temporarily hardcoded URL, as without an origin header, metro will crash, see
                    // https://github.com/facebook/flipper/issues/3189
                    origin: 'http://localhost:3000/flipper',
                });
                _ws.onopen = () => {
                    clearTimeout(guard);
                    ws = _ws;
                    registerMetroDevice(ws, flipperServer);
                };
                _ws.onclose = _ws.onerror = function (event) {
                    if (event?.type === 'error') {
                        console.error(`Failed to connect to Metro on ${METRO_LOGS_ENDPOINT}`, event);
                    }
                    if (!unregistered) {
                        unregistered = true;
                        clearTimeout(guard);
                        ws = undefined;
                        flipperServer.unregisterDevice(METRO_URL);
                        scheduleNext();
                    }
                };
                const guard = setTimeout(() => {
                    // Metro is running, but didn't respond to /events endpoint
                    flipperServer.emit('notification', {
                        type: 'error',
                        title: 'Failed to connect to Metro',
                        description: `Flipper did find a running Metro instance, but couldn't connect to the logs. Probably your React Native version is too old to support Flipper. Cause: Failed to get a connection to ${METRO_LOGS_ENDPOINT} in a timely fashion`,
                    });
                    registerMetroDevice(undefined, flipperServer);
                    // Note: no scheduleNext, we won't retry until restart
                }, 5000);
            }
            catch (e) {
                console.error('Error while setting up Metro websocket connect', e);
            }
        }
        else {
            scheduleNext();
        }
    }
    function scheduleNext() {
        timeoutHandle = setTimeout(tryConnectToMetro, QUERY_INTERVAL);
    }
    tryConnectToMetro();
    // cleanup method
    return () => {
        if (ws) {
            ws.close();
        }
        if (timeoutHandle) {
            clearInterval(timeoutHandle);
        }
    };
};
//# sourceMappingURL=metroDeviceManager.js.map