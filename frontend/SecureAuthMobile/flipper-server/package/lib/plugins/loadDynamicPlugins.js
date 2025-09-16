"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDynamicPlugins = void 0;
const flipper_plugin_lib_1 = require("flipper-plugin-lib");
const pathUtils_1 = require("../utils/pathUtils");
// Load "dynamic" plugins, e.g. those which are either pre-installed (default), installed or loaded from sources (for development).
async function loadDynamicPlugins() {
    if (process.env.NODE_ENV === 'test') {
        return [];
    }
    await (0, flipper_plugin_lib_1.moveInstalledPluginsFromLegacyDir)().catch((ex) => console.error('Eror while migrating installed plugins from legacy folder', ex));
    const [installedPlugins, sourcePlugins] = await Promise.all([
        process.env.FLIPPER_NO_PLUGIN_MARKETPLACE
            ? Promise.resolve([])
            : (0, flipper_plugin_lib_1.getAllInstalledPluginVersions)(),
        (0, flipper_plugin_lib_1.getSourcePlugins)(),
    ]);
    const defaultPluginsDir = (0, pathUtils_1.getStaticPath)('defaultPlugins', {
        asarUnpacked: true,
    });
    const defaultPlugins = await (0, flipper_plugin_lib_1.getAllInstalledPluginsInDir)(defaultPluginsDir);
    if (defaultPlugins.length > 0) {
        console.log(`✅  Loaded ${defaultPlugins.length} default plugins:\n${defaultPlugins
            .map((x) => `${x.title}@${x.version}`)
            .join('\n')}.`);
    }
    if (installedPlugins.length > 0) {
        console.log(`✅  Loaded ${installedPlugins.length} installed plugins:\n${Array.from(new Set(installedPlugins.map((x) => `${x.title}@${x.version}`))).join('\n')}.`);
    }
    if (sourcePlugins.length > 0) {
        console.log(`✅  Loaded ${sourcePlugins.length} source plugins:\n${sourcePlugins
            .map((x) => `${x.title} - ${x.dir}`)
            .join('\n')}.`);
    }
    return [...defaultPlugins, ...installedPlugins, ...sourcePlugins];
}
exports.loadDynamicPlugins = loadDynamicPlugins;
//# sourceMappingURL=loadDynamicPlugins.js.map