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
exports.safeJSONStringify = void 0;
const safeJSONStringify = (data) => {
    try {
        return JSON.stringify(data);
    }
    catch {
        return 'Unable to serialize';
    }
};
exports.safeJSONStringify = safeJSONStringify;
//# sourceMappingURL=safeJSONStringify.js.map