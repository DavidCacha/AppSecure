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
exports.ServerAddOnDesktopToModuleConnection = void 0;
const assert_1 = __importDefault(require("assert"));
class ServerAddOnDesktopToModuleConnection {
    constructor(moduleToDesktopConnection, flipperServer) {
        this.moduleToDesktopConnection = moduleToDesktopConnection;
        this.flipperServer = flipperServer;
        this.subscribeToMessagesFromServerAddOn();
    }
    async sendExpectResponse({ method, params, }) {
        (0, assert_1.default)(method === 'execute', 'ServerAddOnDesktopToModuleConnection supports only "execute" messages');
        const response = await this.moduleToDesktopConnection.call(params.method, params.params);
        const length = JSON.stringify(response).length;
        return {
            ...response,
            length,
        };
    }
    subscribeToMessagesFromServerAddOn() {
        const event = 'message';
        const onMessage = (message) => {
            this.flipperServer.emit('plugins-server-add-on-message', message);
        };
        this.moduleToDesktopConnection.on(event, onMessage);
    }
}
exports.ServerAddOnDesktopToModuleConnection = ServerAddOnDesktopToModuleConnection;
//# sourceMappingURL=ServerAddOnDesktopToModuleConnection.js.map