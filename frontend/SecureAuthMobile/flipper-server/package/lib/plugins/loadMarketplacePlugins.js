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
exports.loadMarketplacePlugins = exports.selectCompatibleMarketplaceVersions = void 0;
const pluginMarketplaceAPI_1 = require("./fb-stubs/pluginMarketplaceAPI");
const isPluginCompatible_1 = __importDefault(require("./isPluginCompatible"));
function selectCompatibleMarketplaceVersions(availablePlugins) {
    const plugins = [];
    for (const plugin of availablePlugins) {
        if (!(0, isPluginCompatible_1.default)(plugin)) {
            const compatibleVersion = plugin.availableVersions?.find(isPluginCompatible_1.default) ??
                plugin.availableVersions?.slice(-1).pop();
            if (compatibleVersion) {
                plugins.push({
                    ...compatibleVersion,
                    availableVersions: plugin?.availableVersions,
                });
            }
            else {
                plugins.push(plugin);
            }
        }
        else {
            plugins.push(plugin);
        }
    }
    return plugins;
}
exports.selectCompatibleMarketplaceVersions = selectCompatibleMarketplaceVersions;
async function loadMarketplacePlugins(flipperServer, marketplaceURL) {
    const availablePlugins = await (0, pluginMarketplaceAPI_1.loadAvailablePlugins)(flipperServer, marketplaceURL);
    return selectCompatibleMarketplaceVersions(availablePlugins);
}
exports.loadMarketplacePlugins = loadMarketplacePlugins;
//# sourceMappingURL=loadMarketplacePlugins.js.map