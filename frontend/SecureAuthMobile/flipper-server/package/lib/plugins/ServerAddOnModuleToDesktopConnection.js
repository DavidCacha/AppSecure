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
exports.ServerAddOnModuleToDesktopConnection = void 0;
const events_1 = __importDefault(require("events"));
const safeJSONStringify_1 = require("../utils/safeJSONStringify");
class ServerAddOnModuleToDesktopConnection extends events_1.default {
    constructor(pluginName) {
        super();
        this.pluginName = pluginName;
        this.subscriptions = new Map();
    }
    send(method, params) {
        const event = 'message';
        const message = {
            method: 'execute',
            params: {
                method,
                params,
                api: this.pluginName,
            },
        };
        this.emit('message', message);
    }
    receive(method, receiver) {
        this.subscriptions.set(method, receiver);
    }
    async call(method, params) {
        try {
            const receiver = this.subscriptions.get(method);
            if (!receiver) {
                throw new Error(`Receiver ${method} not found.`);
            }
            const response = await receiver.call(receiver, params);
            return {
                id: 0, // Not used in server <-> desktop connections. Used only in server <-> client connections.
                success: response == null ? null : response,
            };
        }
        catch (e) {
            const errorMessage = e instanceof Error
                ? { name: e.name, message: e.message, stacktrace: e.stack ?? '' }
                : { name: 'Unknown', message: (0, safeJSONStringify_1.safeJSONStringify)(e), stacktrace: '' };
            return {
                id: 0, // Not used in server <-> desktop connections. Used only in server <-> client connections.
                error: errorMessage,
            };
        }
    }
}
exports.ServerAddOnModuleToDesktopConnection = ServerAddOnModuleToDesktopConnection;
//# sourceMappingURL=ServerAddOnModuleToDesktopConnection.js.map