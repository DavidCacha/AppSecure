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
exports.getChangelog = exports.getStaticPath = void 0;
// We use sync access once per startup.
/* eslint-disable node/no-sync */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const FlipperServerConfig_1 = require("../FlipperServerConfig");
const constants_1 = require("../fb-stubs/constants");
function getStaticPath(relativePath = '.', { asarUnpacked } = { asarUnpacked: false }) {
    const staticDir = (0, FlipperServerConfig_1.getFlipperServerConfig)().paths.staticPath;
    const absolutePath = path_1.default.resolve(staticDir, relativePath);
    // Unfortunately, path.resolve, fs.pathExists, fs.read etc do not automatically work with asarUnpacked files.
    // All these functions still look for files in "app.asar" even if they are unpacked.
    // Looks like automatic resolving for asarUnpacked files only work for "child_process" module.
    // So we're using a hack here to actually look to "app.asar.unpacked" dir instead of app.asar package.
    return asarUnpacked
        ? absolutePath.replace('app.asar', 'app.asar.unpacked')
        : absolutePath;
}
exports.getStaticPath = getStaticPath;
async function getChangelog() {
    return (await fs_1.default.promises.readFile(path_1.default.join(getChangelogPath(), 'CHANGELOG.md'), 'utf8')).trim();
}
exports.getChangelog = getChangelog;
function getChangelogPath() {
    const changelogPath = getStaticPath(constants_1.isFBBuild ? 'facebook' : '.');
    if (fs_1.default.existsSync(changelogPath)) {
        return changelogPath;
    }
    else {
        throw new Error(`Changelog path path does not exist: ${changelogPath}`);
    }
}
//# sourceMappingURL=pathUtils.js.map