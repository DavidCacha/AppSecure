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
exports.startFlipperServer = void 0;
const os_1 = __importDefault(require("os"));
const flipper_common_1 = require("flipper-common");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const FlipperServerImpl_1 = require("../FlipperServerImpl");
const gk_1 = require("../gk");
const launcherSettings_1 = require("../utils/launcherSettings");
const processConfig_1 = require("../utils/processConfig");
const settings_1 = require("../utils/settings");
const sessionId_1 = require("../sessionId");
/**
 * Creates an instance of FlipperServer (FlipperServerImpl). This is the
 * server used by clients to connect to.
 * @param rootPath Application path.
 * @param staticPath Static assets path.
 * @param settingsString Optional settings used to override defaults.
 * @param enableLauncherSettings Optional launcher settings used to override defaults.
 * @returns
 */
async function startFlipperServer(rootPath, staticPath, settingsString, enableLauncherSettings, keytarModule, type, environmentInfo) {
    const execPath = process.execPath;
    const appPath = rootPath;
    const env = process.env;
    let desktopPath = path_1.default.resolve(os_1.default.homedir(), 'Desktop');
    // eslint-disable-next-line node/no-sync
    if (!fs_extra_1.default.existsSync(desktopPath)) {
        console.warn('Failed to find desktop path, falling back to homedir');
        desktopPath = os_1.default.homedir();
    }
    const [launcherSettings, settings] = await Promise.all([
        (0, launcherSettings_1.loadLauncherSettings)(enableLauncherSettings),
        (0, settings_1.loadSettings)(settingsString),
    ]);
    return new FlipperServerImpl_1.FlipperServerImpl({
        sessionId: sessionId_1.sessionId,
        environmentInfo,
        env: (0, flipper_common_1.parseEnvironmentVariables)(process.env),
        gatekeepers: (0, gk_1.getGatekeepers)(environmentInfo.os.unixname),
        paths: {
            appPath,
            homePath: os_1.default.homedir(),
            execPath,
            staticPath,
            tempPath: os_1.default.tmpdir(),
            desktopPath,
        },
        launcherSettings,
        processConfig: (0, processConfig_1.loadProcessConfig)(env),
        settings,
        validWebSocketOrigins: ['localhost:', 'http://localhost:'],
        type,
    }, (0, flipper_common_1.getLogger)(), keytarModule);
}
exports.startFlipperServer = startFlipperServer;
//# sourceMappingURL=startFlipperServer.js.map