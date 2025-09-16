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
exports.initializeLogger = void 0;
const flipper_common_1 = require("flipper-common");
function initializeLogger(_environmentInfo, _args) {
    return new flipper_common_1.NoopLogger();
}
exports.initializeLogger = initializeLogger;
//# sourceMappingURL=Logger.js.map