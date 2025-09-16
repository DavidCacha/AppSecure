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
exports.BrowserClientConnection = void 0;
const WebSocketClientConnection_1 = __importDefault(require("./WebSocketClientConnection"));
/**
 * @deprecated
 * Default `WebSocketClientConnection` should be used instead.
 * See BrowserServerWebSocket.handleMessage.
 */
class BrowserClientConnection extends WebSocketClientConnection_1.default {
    static isGetPluginsCall(data) {
        return data.method === 'getPlugins';
    }
    static isGetBackgroundPluginsCall(data) {
        return (data.method === 'getBackgroundPlugins');
    }
    constructor(ws, plugins) {
        super(ws);
        this.plugins = plugins;
        this.legacyFormat = false;
    }
    async sendExpectResponse(data) {
        if (BrowserClientConnection.isGetPluginsCall(data) && this.plugins) {
            return {
                success: { plugins: this.plugins },
                length: 0,
            };
        }
        if (BrowserClientConnection.isGetBackgroundPluginsCall(data) &&
            this.plugins) {
            return {
                success: { plugins: [] },
                length: 0,
            };
        }
        return super.sendExpectResponse(data);
    }
    serializeData(data) {
        return super.serializeData(this.legacyFormat ? { payload: data } : data);
    }
}
exports.BrowserClientConnection = BrowserClientConnection;
//# sourceMappingURL=BrowserClientConnection.js.map