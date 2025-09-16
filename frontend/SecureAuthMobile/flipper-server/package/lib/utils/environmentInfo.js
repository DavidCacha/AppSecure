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
exports.getEnvironmentInfo = void 0;
const process_1 = __importDefault(require("process"));
const os_1 = __importDefault(require("os"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const flipper_common_1 = require("flipper-common");
async function getEnvironmentInfo(packageJsonDir, isProduction) {
    const packageJson = await fs_extra_1.default.readJSON(path_1.default.resolve(packageJsonDir, 'package.json'));
    const releaseChannel = process_1.default.env.FLIPPER_RELEASE_CHANNEL === 'insiders'
        ? flipper_common_1.ReleaseChannel.INSIDERS
        : process_1.default.env.FLIPPER_RELEASE_CHANNEL === 'stable'
            ? flipper_common_1.ReleaseChannel.STABLE
            : packageJson.releaseChannel === 'insiders'
                ? flipper_common_1.ReleaseChannel.INSIDERS
                : flipper_common_1.ReleaseChannel.STABLE;
    // This is provided as part of the bundling process for headless.
    const flipperReleaseRevision = global.__REVISION__ ?? packageJson.revision;
    const appVersion = process_1.default.env.FLIPPER_FORCE_VERSION ??
        (isProduction ? packageJson.version : '0.0.0');
    if (packageJson.reactNativeOnly) {
        process_1.default.env.FLIPPER_REACT_NATIVE_ONLY = 'true';
    }
    return {
        processId: process_1.default.pid,
        isProduction,
        releaseChannel,
        flipperReleaseRevision,
        appVersion,
        os: {
            arch: process_1.default.arch,
            platform: process_1.default.platform,
            unixname: os_1.default.userInfo().username,
        },
        versions: {
            node: process_1.default.versions.node,
            platform: os_1.default.release(),
        },
    };
}
exports.getEnvironmentInfo = getEnvironmentInfo;
//# sourceMappingURL=environmentInfo.js.map