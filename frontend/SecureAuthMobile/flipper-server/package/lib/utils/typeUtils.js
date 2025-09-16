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
exports.notNull = void 0;
// Typescript doesn't know Array.filter(Boolean) won't contain nulls.
// So use Array.filter(notNull) instead.
function notNull(x) {
    return x !== null && x !== undefined;
}
exports.notNull = notNull;
//# sourceMappingURL=typeUtils.js.map