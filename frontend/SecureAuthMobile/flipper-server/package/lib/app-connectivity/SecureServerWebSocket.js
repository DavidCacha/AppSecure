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
const ServerWebSocket_1 = __importDefault(require("./ServerWebSocket"));
const Utilities_1 = require("./Utilities");
const WebSocketClientConnection_1 = __importDefault(require("./WebSocketClientConnection"));
const serialize_error_1 = require("serialize-error");
const WSCloseCode_1 = require("../utils/WSCloseCode");
const recorder_1 = require("../recorder");
/**
 * WebSocket-based server.
 * A secure connection has been established between the server and a client. Once a client
 * has a valid certificate, it can use a secure connection with Flipper and start exchanging
 * messages.
 * https://fbflipper.com/docs/extending/new-clients
 * https://fbflipper.com/docs/extending/establishing-a-connection
 */
class SecureServerWebSocket extends ServerWebSocket_1.default {
    handleConnectionAttempt(ctx) {
        const { clientQuery, ws } = ctx;
        (0, Utilities_1.assertNotNull)(clientQuery);
        recorder_1.recorder.log(clientQuery, `Secure websocket connection attempt: ${clientQuery.app} on ${clientQuery.device}.`);
        this.listener.onSecureConnectionAttempt(clientQuery);
        const clientConnection = new WebSocketClientConnection_1.default(ws);
        const clientPromise = this.listener
            .onConnectionCreated(clientQuery, clientConnection)
            .then((client) => {
            ctx.client = client;
            return client;
        })
            .catch((e) => {
            throw new Error(`Failed to resolve client ${clientQuery.app} on ${clientQuery.device_id} medium ${clientQuery.medium}. Reason: ${JSON.stringify((0, serialize_error_1.serializeError)(e))}`);
        });
        ctx.clientConnection = clientConnection;
        ctx.clientPromise = clientPromise;
    }
    async handleMessage(ctx, parsedMessage, rawMessage) {
        const { clientQuery, clientConnection, clientPromise, client, ws } = ctx;
        (0, Utilities_1.assertNotNull)(clientQuery);
        (0, Utilities_1.assertNotNull)(clientConnection);
        (0, Utilities_1.assertNotNull)(clientPromise);
        // We can recieve either "execute" messages from the client or "responses" to our messages
        // https://fbflipper.com/docs/extending/new-clients#responding-to-messages
        // Received a response message
        if ((0, Utilities_1.isWsResponseMessage)(parsedMessage)) {
            const callbacks = clientConnection.matchPendingRequest(parsedMessage.id);
            if (!callbacks) {
                return;
            }
            callbacks.resolve({
                ...parsedMessage,
                length: rawMessage.length,
            });
            return;
        }
        // Received an "execute" message
        if (client) {
            this.listener.onClientMessage(client.id, rawMessage);
        }
        else {
            // Client promise is not resolved yet
            // So we schedule the execution for when it is resolved
            clientPromise
                .then((client) => {
                this.listener.onClientMessage(client.id, rawMessage);
            })
                .catch((error) => {
                // It is an async action, which might run after the socket is closed
                if (ws.readyState === ws.OPEN) {
                    // See the reasoning in the error handler for a `connection` event in ServerWebSocket
                    ws.emit('error', error);
                    ws.close(WSCloseCode_1.WSCloseCode.InternalError);
                }
            });
        }
    }
    /**
     * Parse and extract a SecureClientQuery instance from a message. The ClientQuery
     * data will be contained in the message url query string.
     * @param message An incoming web socket message.
     */
    parseClientQuery(query) {
        return (0, Utilities_1.parseSecureClientQuery)(query);
    }
}
exports.default = SecureServerWebSocket;
//# sourceMappingURL=SecureServerWebSocket.js.map