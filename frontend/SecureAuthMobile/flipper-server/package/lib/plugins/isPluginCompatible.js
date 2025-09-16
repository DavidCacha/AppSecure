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
exports.isPluginCompatible = void 0;
const semver_1 = __importDefault(require("semver"));
const FlipperServerConfig_1 = require("../FlipperServerConfig");
function isPluginCompatible(plugin) {
    const config = (0, FlipperServerConfig_1.getFlipperServerConfig)();
    const flipperVersion = config.environmentInfo.appVersion;
    return (config.gatekeepers['flipper_disable_plugin_compatibility_checks'] ||
        flipperVersion === '0.0.0' ||
        !plugin.engines?.flipper ||
        semver_1.default.lte(plugin.engines?.flipper, flipperVersion));
}
exports.isPluginCompatible = isPluginCompatible;
exports.default = isPluginCompatible;
//# sourceMappingURL=isPluginCompatible.js.map