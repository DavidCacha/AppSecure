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
const environmentVariables_1 = require("../../utils/environmentVariables");
exports.default = (settings) => {
    let port = (0, environmentVariables_1.parseEnvironmentVariableAsNumber)('ANDROID_ADB_SERVER_PORT', 5037);
    let host = '127.0.0.1';
    const socket = (process.env.ADB_SERVER_SOCKET || '').trim();
    if (socket && socket.length > 0) {
        const match = socket.match(/^(tcp:)(\S+):(\d+)/);
        if (match && match.length === 4) {
            host = match[2];
            port = parseInt(match[3], 10);
        }
    }
    host = settings?.host ?? host;
    port = settings?.port ?? port;
    return {
        port,
        host,
    };
};
//# sourceMappingURL=adbConfig.js.map