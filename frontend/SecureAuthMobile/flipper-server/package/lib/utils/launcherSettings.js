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
exports.saveLauncherSettings = exports.loadLauncherSettings = exports.launcherConfigDir = exports.xdgConfigDir = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const xdg_basedir_1 = __importDefault(require("xdg-basedir"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const toml_1 = __importDefault(require("@iarna/toml"));
const flipper_common_1 = require("flipper-common");
// There is some disagreement among the XDG Base Directory implementations
// whether to use ~/Library/Preferences or ~/.config on MacOS. The Launcher
// expects the former, whereas `xdg-basedir` implements the latter.
function xdgConfigDir() {
    return os_1.default.platform() === 'darwin'
        ? path_1.default.join(os_1.default.homedir(), 'Library', 'Preferences')
        : xdg_basedir_1.default.config || path_1.default.join(os_1.default.homedir(), '.config');
}
exports.xdgConfigDir = xdgConfigDir;
function launcherConfigDir() {
    return path_1.default.join(xdgConfigDir(), os_1.default.platform() == 'darwin' ? 'rs.flipper-launcher' : 'flipper-launcher');
}
exports.launcherConfigDir = launcherConfigDir;
function getLauncherSettingsFile() {
    return path_1.default.resolve(launcherConfigDir(), 'flipper-launcher.toml');
}
const defaultLauncherSettings = {
    releaseChannel: flipper_common_1.ReleaseChannel.DEFAULT,
    ignoreLocalPin: true,
};
function serialize(value) {
    const { ignoreLocalPin, releaseChannel, ...rest } = value;
    const formattedSettings = {
        ...rest,
        ignore_local_pin: ignoreLocalPin,
        release_channel: releaseChannel,
    };
    return toml_1.default.stringify(formattedSettings);
}
function deserialize(content) {
    const { ignore_local_pin, release_channel, ...rest } = toml_1.default.parse(content);
    return {
        ...rest,
        ignoreLocalPin: !!ignore_local_pin,
        releaseChannel: release_channel ?? flipper_common_1.ReleaseChannel.DEFAULT,
    };
}
async function loadLauncherSettings(enableLauncherSettings = true) {
    if (!enableLauncherSettings) {
        return defaultLauncherSettings;
    }
    const fileName = getLauncherSettingsFile();
    try {
        const content = (await fs_extra_1.default.readFile(fileName)).toString();
        return deserialize(content);
    }
    catch (e) {
        console.warn(`Failed to read settings file: "${fileName}". ${e}. Replacing file with default settings.`);
        await saveLauncherSettings(defaultLauncherSettings);
        return defaultLauncherSettings;
    }
}
exports.loadLauncherSettings = loadLauncherSettings;
async function saveLauncherSettings(settings) {
    const fileName = getLauncherSettingsFile();
    const dir = path_1.default.dirname(fileName);
    const exists = await fs_extra_1.default.pathExists(dir);
    if (!exists) {
        await fs_extra_1.default.mkdir(dir, { recursive: true });
    }
    const content = serialize(settings);
    return fs_extra_1.default.writeFile(fileName, content);
}
exports.saveLauncherSettings = saveLauncherSettings;
//# sourceMappingURL=launcherSettings.js.map