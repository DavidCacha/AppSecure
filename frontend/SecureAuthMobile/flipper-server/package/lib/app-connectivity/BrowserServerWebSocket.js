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
const BrowserClientConnection_1 = require("./BrowserClientConnection");
const FlipperServerConfig_1 = require("../FlipperServerConfig");
const Utilities_1 = require("./Utilities");
const SecureServerWebSocket_1 = __importDefault(require("./SecureServerWebSocket"));
const url_1 = require("url");
const constants_1 = require("../fb-stubs/constants");
function isLegacyMessage(message) {
    return typeof message.app === 'string';
}
/**
 * WebSocket-based server over an insecure channel that does not support the certificate exchange flow. E.g. web browser.
 */
class BrowserServerWebSocket extends SecureServerWebSocket_1.default {
    handleConnectionAttempt(ctx) {
        const { clientQuery, ws } = ctx;
        (0, Utilities_1.assertNotNull)(clientQuery);
        console.info(`[conn] Local websocket connection attempt: ${clientQuery.app} on ${clientQuery.device_id}.`);
        this.listener.onConnectionAttempt(clientQuery);
        this.listener.onSecureConnectionAttempt(clientQuery);
        // Mock an initial empty list of plugins
        // Read more o the reasoning in `handleMessage`
        const clientConnection = new BrowserClientConnection_1.BrowserClientConnection(ws);
        const client = this.listener.onConnectionCreated(clientQuery, clientConnection);
        ctx.clientConnection = clientConnection;
        ctx.clientPromise = client;
    }
    async handleMessage(ctx, parsedMessage, rawMessage) {
        const { clientQuery, clientConnection } = ctx;
        (0, Utilities_1.assertNotNull)(clientQuery);
        (0, Utilities_1.assertNotNull)(clientConnection);
        // Remove this part once our current customers migrate to the new message structure
        if (isLegacyMessage(parsedMessage)) {
            if (parsedMessage.type === 'connect') {
                // TODO: Add a link to a blog post when it is ready.
                console.warn('[conn] Legacy WebSocket connection. Please, upgrade. See https://github.com/facebook/flipper/tree/main/js/js-flipper for references.');
                // Legacy protocol supported passing an optional list of plugins with a 'connect' message.
                // Clients that pass the list of plugins this way might not suport `getPlugins` call.
                // We create a special BrowserClientConnection that intercepts any `getPlugings` call if the list was passed and fakes a client reply using the list of plugins from the `connect` message.
                const plugins = parsedMessage.plugins;
                clientConnection.plugins = plugins;
                clientConnection.legacyFormat = true;
                if (plugins) {
                    // Client connection was initialized without a list of plugins.
                    // Upon initialization it sent a `getPlugins` request.
                    // We find that request and resolve it with the list of plugins we received from the `connect` message
                    const getPluginsCallbacks = clientConnection.matchPendingRequest(0);
                    if (!getPluginsCallbacks) {
                        return;
                    }
                    getPluginsCallbacks.resolve({
                        success: { plugins },
                        length: rawMessage.length,
                    });
                }
                return;
            }
            // Legacy messages wrap the actual message content with { app: string, payload: object }.
            // This way we normalize them to the current message format which does not require that wrapper.
            parsedMessage = parsedMessage.payload;
            rawMessage = JSON.stringify(parsedMessage);
        }
        super.handleMessage(ctx, parsedMessage, rawMessage);
    }
    parseClientQuery(query) {
        // Some legacy clients send only deviceId and device
        // Remove it once they fix it
        // P463066994
        const fallbackOS = 'MacOS';
        const fallbackApp = query.device;
        const fallbackDeviceId = query.deviceId;
        const fallbackSdkVersion = '4';
        query = {
            app: fallbackApp,
            os: fallbackOS,
            device_id: fallbackDeviceId,
            sdk_version: fallbackSdkVersion,
            ...query,
        };
        const parsedBaseQuery = (0, Utilities_1.parseClientQuery)(query);
        if (!parsedBaseQuery) {
            return;
        }
        return { ...parsedBaseQuery, medium: 'NONE' };
    }
    verifyClient() {
        return (info) => {
            if (!this.acceptingNewConections) {
                return false;
            }
            if (constants_1.isFBBuild) {
                try {
                    const urlObj = new url_1.URL(info.origin);
                    if (urlObj.hostname.endsWith('.facebook.com') ||
                        urlObj.hostname.endsWith('.whatsapp.com')) {
                        return true;
                    }
                }
                catch { }
            }
            const ok = typeof info.origin !== 'undefined' &&
                (0, FlipperServerConfig_1.getFlipperServerConfig)().validWebSocketOrigins.some((validPrefix) => info.origin.startsWith(validPrefix));
            if (!ok) {
                console.warn(`[conn] Refused webSocket connection from ${info.origin} (secure: ${info.secure})`);
            }
            return ok;
        };
    }
}
exports.default = BrowserServerWebSocket;
//# sourceMappingURL=BrowserServerWebSocket.js.map