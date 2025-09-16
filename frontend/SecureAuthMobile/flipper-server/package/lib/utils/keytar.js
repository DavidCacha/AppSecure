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
exports.KeytarManager = exports.SERVICE_FLIPPER = void 0;
const os_1 = __importDefault(require("os"));
const flipper_common_1 = require("flipper-common");
exports.SERVICE_FLIPPER = 'flipper.oAuthToken';
class KeytarManager {
    constructor(keytar) {
        this.keytar = keytar;
        this.memoryFallback = new Map();
    }
    async writeKeychain(service, password) {
        if (this.keytar == null) {
            console.warn('Keytar is not available, using session only memory storage as fallback');
            this.memoryFallback.set(service, password);
            return;
        }
        await this.keytar.deletePassword(service, os_1.default.userInfo().username);
        await this.keytar.setPassword(service, os_1.default.userInfo().username, password);
    }
    async unsetKeychain(service) {
        if (this.keytar) {
            await this.keytar.deletePassword(service, os_1.default.userInfo().username);
        }
        else {
            this.memoryFallback.delete(service);
        }
    }
    async retrieveToken(service) {
        const token = this.keytar
            ? await this.keytar.getPassword(service, os_1.default.userInfo().username)
            : this.memoryFallback.get(service);
        if (!token) {
            throw new flipper_common_1.UserNotSignedInError();
        }
        return token;
    }
}
exports.KeytarManager = KeytarManager;
//# sourceMappingURL=keytar.js.map