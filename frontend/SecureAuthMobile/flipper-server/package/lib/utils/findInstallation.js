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
exports.findInstallation = exports.movePWA = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const GK_1 = __importDefault(require("../fb-stubs/GK"));
const pwaRoot = path_1.default.join(os_1.default.homedir(), 'Applications', 'Chrome Apps.localized');
const appFolder = path_1.default.resolve(pwaRoot, '.flipper');
const defaultAppPath = path_1.default.join(pwaRoot, 'Flipper.app');
const movedAppPath = path_1.default.join(appFolder, 'Flipper.app');
async function movePWA() {
    if (os_1.default.platform() !== 'darwin') {
        return;
    }
    if (!GK_1.default.get('flipper_move_pwa')) {
        return;
    }
    // Move PWA into its own folder
    // Later we will make the folder hidden so Spotlight stops indexing it
    // Sadly, Spotlight can stop indexing only hidden folder, not hidden files
    // Therefore, we have to create this parent folder in the first place.
    if (!(await fs_extra_1.default.pathExists(appFolder))) {
        await fs_extra_1.default.mkdir(appFolder);
    }
    await fs_extra_1.default.move(defaultAppPath, movedAppPath);
}
exports.movePWA = movePWA;
async function findInstallation() {
    if (os_1.default.platform() !== 'darwin') {
        return;
    }
    try {
        if (GK_1.default.get('flipper_move_pwa')) {
            if (await fs_extra_1.default.pathExists(defaultAppPath)) {
                await movePWA();
            }
        }
    }
    catch (e) {
        console.error('Failed to move PWA', e);
    }
    finally {
        if (GK_1.default.get('flipper_move_pwa')) {
            const movedAppPlistPath = path_1.default.join(movedAppPath, 'Contents', 'Info.plist');
            if (await fs_extra_1.default.pathExists(movedAppPlistPath)) {
                return movedAppPath;
            }
            // We should get here only if moving PWA failed
        }
        const dafaultAppPlistPath = path_1.default.join(defaultAppPath, 'Contents', 'Info.plist');
        if (await fs_extra_1.default.pathExists(dafaultAppPlistPath)) {
            return defaultAppPath;
        }
    }
}
exports.findInstallation = findInstallation;
//# sourceMappingURL=findInstallation.js.map