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
exports.loadDistilleryGK = exports.loadGKs = exports.TEST_FAILING_GK = exports.TEST_PASSING_GK = void 0;
exports.TEST_PASSING_GK = 'TEST_PASSING_GK';
exports.TEST_FAILING_GK = 'TEST_FAILING_GK';
// Allow OSS users start flipper-server
const whitelistedGKs = [''];
function loadGKs(_username, _gks) {
    return Promise.reject(new Error('Implement your custom logic for loading GK'));
}
exports.loadGKs = loadGKs;
function loadDistilleryGK(_gk) {
    return Promise.reject(new Error('Implement your custom logic for loading GK'));
}
exports.loadDistilleryGK = loadDistilleryGK;
class GK {
    static init(_username) { }
    static get(id) {
        if (process.env.NODE_ENV === 'test' && id === exports.TEST_PASSING_GK) {
            return true;
        }
        if (whitelistedGKs.includes(id)) {
            return true;
        }
        return false;
    }
    static async withWhitelistedGK(id, callback) {
        whitelistedGKs.push(id);
        try {
            const p = callback();
            if (p) {
                await p;
            }
        }
        finally {
            const idx = whitelistedGKs.indexOf(id);
            if (idx !== -1) {
                whitelistedGKs.splice(idx, 1);
            }
        }
    }
    static allGKs() {
        return Object.fromEntries(whitelistedGKs.map((gk) => [gk, true]));
    }
}
exports.default = GK;
//# sourceMappingURL=GK.js.map