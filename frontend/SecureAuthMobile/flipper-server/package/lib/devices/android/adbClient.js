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
exports.initializeAdbClient = void 0;
const flipper_common_1 = require("flipper-common");
const promisify_child_process_1 = require("promisify-child-process");
const adbConfig_1 = __importDefault(require("./adbConfig"));
const adbkit_1 = __importDefault(require("adbkit"));
const path_1 = __importDefault(require("path"));
async function initializeAdbClient(config) {
    const adbClient = await (0, flipper_common_1.reportPlatformFailures)(createClient(config), 'createADBClient').catch((e) => {
        console.warn('Failed to initialize ADB. Please disable Android support in settings, or configure a correct path.', e);
    });
    return adbClient;
}
exports.initializeAdbClient = initializeAdbClient;
/* Adbkit will attempt to start the adb server if it's not already running,
   however, it sometimes fails with ENOENT errors. So instead, we start it
   manually before requesting a client. */
async function createClient(config) {
    return (0, flipper_common_1.reportPlatformFailures)(startAdbServer(config.androidHome).then(() => adbkit_1.default.createClient((0, adbConfig_1.default)(config.adbKitSettings))), 'createADBClient.shell');
}
async function startAdbServer(androidHome) {
    const adbPath = path_1.default.resolve(androidHome, 'platform-tools', 'adb');
    const args = ['start-server'];
    return (0, promisify_child_process_1.execFile)(adbPath, args)
        .catch((error) => {
        if (error.code == 'ENOENT') {
            console.info('falling back to the alternative adb path');
            return (0, promisify_child_process_1.execFile)(path_1.default.resolve(androidHome, 'adb'), args);
        }
        throw error;
    })
        .catch((error) => {
        if (error.code == 'ENOENT') {
            console.info('falling back to the adb path of last resort');
            return (0, promisify_child_process_1.execFile)(androidHome, args);
        }
        throw error;
    });
}
//# sourceMappingURL=adbClient.js.map