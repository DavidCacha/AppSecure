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
const WSCloseCode_1 = require("../utils/WSCloseCode");
const ClientConnection_1 = require("./ClientConnection");
class WebSocketClientConnection {
    constructor(ws) {
        this.ws = ws;
        this.pendingRequests = new Map();
    }
    subscribeToEvents(subscriber) {
        this.ws.on('close', () => subscriber(ClientConnection_1.ConnectionStatus.CLOSED));
        this.ws.on('error', () => subscriber(ClientConnection_1.ConnectionStatus.ERROR));
    }
    close() {
        this.ws.close(WSCloseCode_1.WSCloseCode.NormalClosure);
    }
    send(data) {
        this.ws.send(this.serializeData(data));
    }
    sendExpectResponse(data) {
        return new Promise((resolve, reject) => {
            this.pendingRequests.set(data.id, { reject, resolve });
            this.ws.send(this.serializeData(data));
        });
    }
    matchPendingRequest(id) {
        const callbacks = this.pendingRequests.get(id);
        if (!callbacks) {
            console.debug(`[ws] Pending request ${id} is not found. Ignore.`);
            // It must be a response for a message from the older connection. Ignore.
            // TODO: When we decide to bump sdk_version, make `id` a string equal to `connectionId:messageId`.
            // Ignore messages only from other conections.
            // Raise an error for missing mesages from this connection.
            return;
        }
        this.pendingRequests.delete(id);
        return callbacks;
    }
    serializeData(data) {
        return JSON.stringify(data);
    }
}
exports.default = WebSocketClientConnection;
//# sourceMappingURL=WebSocketClientConnection.js.map