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
exports.initializeLogger = exports.loggerOutputFile = void 0;
const flipper_common_1 = require("flipper-common");
const Logger_1 = require("./fb-stubs/Logger");
exports.loggerOutputFile = 'flipper-server-log.out';
async function initializeLogger(environmentInfo) {
    // Suppress stdout debug messages, but keep writing them to the file.
    console.debug = function () { };
    const logger = (0, Logger_1.initializeLogger)(environmentInfo);
    (0, flipper_common_1.setLoggerInstance)(logger);
}
exports.initializeLogger = initializeLogger;
//# sourceMappingURL=logger.js.map