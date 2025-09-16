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
exports.sessionId = void 0;
const flipper_common_1 = require("flipper-common");
if (process.env.FLIPPER_SESSION_ID) {
    console.info('Use external session ID', process.env.FLIPPER_SESSION_ID);
}
exports.sessionId = `${process.env.FLIPPER_SESSION_ID ?? 'unset'}::${(0, flipper_common_1.uuid)()}`;
//# sourceMappingURL=sessionId.js.map