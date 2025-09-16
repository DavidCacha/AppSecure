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
exports.createBrowserServer = exports.createServer = exports.TransportType = void 0;
const ServerRSocket_1 = __importDefault(require("./ServerRSocket"));
const SecureServerWebSocket_1 = __importDefault(require("./SecureServerWebSocket"));
const BrowserServerWebSocket_1 = __importDefault(require("./BrowserServerWebSocket"));
const ServerWebSocket_1 = __importDefault(require("./ServerWebSocket"));
var TransportType;
(function (TransportType) {
    TransportType[TransportType["RSocket"] = 0] = "RSocket";
    TransportType[TransportType["WebSocket"] = 1] = "WebSocket";
})(TransportType || (exports.TransportType = TransportType = {}));
/**
 * Creates a server to be used by Flipper. The created server will be set into
 * the promise once it has started and bound to the specified port.
 * @param port A port number in which to listen for incoming connections.
 * @param listener An object implementing the ServerEventsListener interface.
 * @param sslConfig An SSL configuration for TLS servers.
 */
async function createServer(port, listener, sslConfig, transportType = TransportType.RSocket) {
    let server;
    if (transportType === TransportType.RSocket) {
        server = new ServerRSocket_1.default(listener);
    }
    else if (sslConfig) {
        server = new SecureServerWebSocket_1.default(listener);
    }
    else {
        server = new ServerWebSocket_1.default(listener);
    }
    await server.start(port, sslConfig);
    return server;
}
exports.createServer = createServer;
/**
 * Creates a server to be used by Flipper to allow Browser connections.
 * The protocol is slightly different for Browser connections hence a different
 * factory method. The created server will be set into the promise
 * once it has started and bound to the specified port.
 * @param port A port number in which to listen for incoming connections.
 * @param listener An object implementing the ServerEventsListener interface.
 * @returns
 */
async function createBrowserServer(port, listener) {
    const server = new BrowserServerWebSocket_1.default(listener);
    await server.start(port);
    return server;
}
exports.createBrowserServer = createBrowserServer;
//# sourceMappingURL=ServerFactory.js.map