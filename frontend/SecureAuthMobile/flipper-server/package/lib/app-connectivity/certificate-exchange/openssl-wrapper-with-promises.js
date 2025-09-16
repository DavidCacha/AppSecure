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
exports.isInstalled = exports.openssl = void 0;
const openssl_wrapper_1 = require("openssl-wrapper");
const promisify_child_process_1 = require("promisify-child-process");
function openssl(action, options) {
    return new Promise((resolve, reject) => {
        (0, openssl_wrapper_1.exec)(action, options, (err, buffer) => {
            if (err) {
                reject(err);
            }
            else if (buffer) {
                resolve(buffer.toString());
            }
        });
    });
}
exports.openssl = openssl;
async function isInstalled() {
    try {
        const result = await (0, promisify_child_process_1.spawn)('openssl', ['version']);
        return result.code === 0;
    }
    catch (_e) {
        return false;
    }
}
exports.isInstalled = isInstalled;
//# sourceMappingURL=openssl-wrapper-with-promises.js.map