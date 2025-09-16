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
exports.isPluginVersionMoreRecent = void 0;
const semver_1 = __importDefault(require("semver"));
const isPluginCompatible_1 = __importDefault(require("./isPluginCompatible"));
function isPluginVersionMoreRecent(versionDetails, otherVersionDetails) {
    const isPlugin1Compatible = (0, isPluginCompatible_1.default)(versionDetails);
    const isPlugin2Compatible = (0, isPluginCompatible_1.default)(otherVersionDetails);
    // prefer compatible plugins
    if (isPlugin1Compatible && !isPlugin2Compatible)
        return true;
    if (!isPlugin1Compatible && isPlugin2Compatible)
        return false;
    // prefer plugins with greater version
    if (semver_1.default.gt(versionDetails.version, otherVersionDetails.version)) {
        return true;
    }
    if (semver_1.default.eq(versionDetails.version, otherVersionDetails.version) &&
        versionDetails.isActivatable &&
        !otherVersionDetails.isActivatable) {
        // prefer locally available versions to the versions available remotely on marketplace
        return true;
    }
    return false;
}
exports.isPluginVersionMoreRecent = isPluginVersionMoreRecent;
exports.default = isPluginVersionMoreRecent;
//# sourceMappingURL=isPluginVersionMoreRecent.js.map