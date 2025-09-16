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
exports.DEFAULT_ANDROID_SDK_PATH = exports.saveSettings = exports.loadSettings = void 0;
const os_1 = __importDefault(require("os"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const flipper_common_1 = require("flipper-common");
const fs_extra_2 = require("fs-extra");
const paths_1 = require("./paths");
async function loadSettings(settingsString = '') {
    if (settingsString !== '') {
        try {
            return await replaceDefaultSettings(JSON.parse(settingsString));
        }
        catch (e) {
            throw new Error("couldn't read the user settingsString");
        }
    }
    if (!(0, fs_extra_2.pathExists)(getSettingsFile())) {
        return getDefaultSettings();
    }
    try {
        const json = await (0, fs_extra_2.readFile)(getSettingsFile(), { encoding: 'utf8' });
        return JSON.parse(json);
    }
    catch (e) {
        console.warn('Failed to load settings file', e);
        return getDefaultSettings();
    }
}
exports.loadSettings = loadSettings;
async function saveSettings(settings) {
    await (0, fs_extra_2.mkdirp)(paths_1.flipperSettingsFolder);
    await (0, fs_extra_2.writeFile)(getSettingsFile(), JSON.stringify(settings, null, 2), {
        encoding: 'utf8',
    });
}
exports.saveSettings = saveSettings;
function getSettingsFile() {
    return (0, path_1.resolve)(paths_1.flipperSettingsFolder, 'settings.json');
}
exports.DEFAULT_ANDROID_SDK_PATH = getDefaultAndroidSdkPath();
async function getDefaultSettings() {
    return {
        androidHome: await getDefaultAndroidSdkPath(),
        enableAndroid: true,
        enableIOS: os_1.default.platform() === 'darwin',
        enablePhysicalIOS: os_1.default.platform() === 'darwin',
        enablePrefetching: flipper_common_1.Tristate.Unset,
        idbPath: '/usr/local/bin/idb',
        darkMode: 'light',
        showWelcomeAtStartup: true,
        suppressPluginErrors: false,
        persistDeviceData: false,
        enablePluginMarketplace: false,
        marketplaceURL: '',
        enablePluginMarketplaceAutoUpdate: true,
        server: {
            enabled: false,
        },
    };
}
async function getDefaultAndroidSdkPath() {
    if (os_1.default.platform() === 'win32') {
        return `${os_1.default.homedir()}\\AppData\\Local\\android\\sdk`;
    }
    // non windows platforms
    // created when created a project in Android Studio
    const androidStudioSdkPath = `${os_1.default.homedir()}/Library/Android/sdk`;
    if (await fs_extra_1.default.exists(androidStudioSdkPath)) {
        return androidStudioSdkPath;
    }
    return '/opt/android_sdk';
}
async function replaceDefaultSettings(userSettings) {
    return { ...(await getDefaultSettings()), ...userSettings };
}
//# sourceMappingURL=settings.js.map