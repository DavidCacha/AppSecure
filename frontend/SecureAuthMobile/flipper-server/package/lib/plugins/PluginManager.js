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
exports.PluginManager = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const tmp_1 = __importDefault(require("tmp"));
const util_1 = require("util");
const axios_1 = __importDefault(require("axios"));
const loadDynamicPlugins_1 = require("./loadDynamicPlugins");
const flipper_plugin_lib_1 = require("flipper-plugin-lib");
const ServerAddManager_1 = require("./ServerAddManager");
const loadMarketplacePlugins_1 = require("./loadMarketplacePlugins");
const pluginMarketplaceAPI_1 = require("./fb-stubs/pluginMarketplaceAPI");
const maxInstalledPluginVersionsToKeep = 2;
const getTempDirName = (0, util_1.promisify)(tmp_1.default.dir);
const isExecuteMessage = (message) => message.method === 'execute';
class PluginManager {
    constructor(flipperServer) {
        this.flipperServer = flipperServer;
        this.serverAddOns = new Map();
        this.loadDynamicPlugins = loadDynamicPlugins_1.loadDynamicPlugins;
        this.getInstalledPlugins = flipper_plugin_lib_1.getInstalledPlugins;
        this.removePlugins = flipper_plugin_lib_1.removePlugins;
        this.getUpdatablePlugins = flipper_plugin_lib_1.getUpdatablePlugins;
        this.getInstalledPlugin = flipper_plugin_lib_1.getInstalledPlugin;
        this.installPluginFromFileOrBuffer = flipper_plugin_lib_1.installPluginFromFileOrBuffer;
        this.installPluginFromNpm = flipper_plugin_lib_1.installPluginFromNpm;
    }
    async start() {
        // This needn't happen immediately and is (light) I/O work.
        setTimeout(() => {
            (0, flipper_plugin_lib_1.cleanupOldInstalledPluginVersions)(maxInstalledPluginVersionsToKeep).catch((err) => console.error('Failed to clean up old installed plugins:', err));
        }, 100);
    }
    async loadSource(path) {
        const js = await fs_extra_1.default.readFile(path, 'utf8');
        /**
         * Check if the plugin includes a bundled css. If so,
         * load its content too.
         */
        let css = undefined;
        const idx = path.lastIndexOf('.');
        const cssPath = `${path.substring(0, idx < 0 ? path.length : idx)}.css`;
        try {
            await fs_extra_1.default.promises.access(cssPath);
            const buffer = await fs_extra_1.default.promises.readFile(cssPath, { encoding: 'utf-8' });
            css = buffer.toString();
        }
        catch (e) { }
        return {
            js,
            css,
        };
    }
    async loadMarketplacePlugins() {
        console.info('Load available plugins from marketplace');
        return (0, loadMarketplacePlugins_1.loadMarketplacePlugins)(this.flipperServer, '');
    }
    async installPluginForMarketplace(name) {
        console.info(`Install plugin '${name}' from marketplace`);
        const plugins = await this.loadMarketplacePlugins();
        const plugin = plugins.find((p) => p.id === name);
        if (plugin) {
            console.info(`Plugin '${name}' is available, attempt to install`);
            try {
                return await this.downloadPlugin(plugin);
            }
            catch (e) {
                console.warn(`Unable to install plugin '${name}'. Error:`, e);
            }
        }
        else {
            console.info('Plugin not available in marketplace');
        }
        throw new Error(`Unable to install plugin '${name}' from marketplace`);
    }
    async downloadPlugin(plugin) {
        const { name, title, version, downloadUrls } = plugin;
        const installationDir = (0, flipper_plugin_lib_1.getPluginVersionInstallationDir)(name, version);
        console.log(`Downloading plugin "${title}" v${version} from "${downloadUrls}" to "${installationDir}".`);
        const tmpDir = await getTempDirName();
        const tmpFile = path_1.default.join(tmpDir, `${(0, flipper_plugin_lib_1.getPluginDirNameFromPackageName)(name)}-${version}.tgz`);
        let finalError = null;
        for (const downloadUrl of downloadUrls) {
            try {
                const cancelationSource = axios_1.default.CancelToken.source();
                if (await fs_extra_1.default.pathExists(installationDir)) {
                    console.log(`Using existing files instead of downloading plugin "${title}" v${version} from "${downloadUrl}" to "${installationDir}"`);
                    return await (0, flipper_plugin_lib_1.getInstalledPluginDetails)(installationDir);
                }
                else {
                    await fs_extra_1.default.ensureDir(tmpDir);
                    let percentCompleted = 0;
                    const response = await (0, pluginMarketplaceAPI_1.httpGet)(new URL(downloadUrl), {
                        cancelToken: cancelationSource.token,
                        onDownloadProgress: async (progressEvent) => {
                            const newPercentCompleted = !progressEvent.total
                                ? 0
                                : Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            if (newPercentCompleted - percentCompleted >= 20) {
                                percentCompleted = newPercentCompleted;
                                console.log(`Downloading plugin "${title}" v${version} from "${downloadUrl}": ${percentCompleted}% completed (${progressEvent.loaded} from ${progressEvent.total})`);
                            }
                        },
                    });
                    function parseHeaderValue(header) {
                        const values = header.split(';');
                        // remove white space
                        return values.map((value) => value.trim());
                    }
                    if (!parseHeaderValue(response.headers['content-type']).includes('application/octet-stream')) {
                        throw new Error(`It looks like you are not on VPN/Lighthouse. Unexpected content type received: ${response.headers['content-type']}.`);
                    }
                    const responseStream = response.data;
                    const writeStream = responseStream.pipe(fs_extra_1.default.createWriteStream(tmpFile, { autoClose: true }));
                    await new Promise((resolve, reject) => writeStream.once('finish', resolve).once('error', reject));
                    return await (0, flipper_plugin_lib_1.installPluginFromFileOrBuffer)(tmpFile);
                }
            }
            catch (error) {
                finalError = error;
                continue;
            }
            finally {
                await fs_extra_1.default.remove(tmpDir);
            }
        }
        console.info(`Failed to download plugin "${title}" v${version} from "${downloadUrls}" to "${installationDir}".`, finalError);
        throw finalError;
    }
    getServerAddOnForMessage(message) {
        if (!isExecuteMessage(message)) {
            throw new Error(`PluginManager.getServerAddOnForMessage supports only "execute" messages. Received ${JSON.stringify(message)}`);
        }
        return this.serverAddOns.get(message.params.api);
    }
    async startServerAddOn(pluginName, details, owner) {
        console.debug('PluginManager.startServerAddOn', pluginName);
        const existingServerAddOn = this.serverAddOns.get(pluginName);
        if (existingServerAddOn) {
            if (existingServerAddOn.state.is('stopping')) {
                console.debug('PluginManager.startServerAddOn -> currently stropping', pluginName, owner, existingServerAddOn.state.currentState);
                await existingServerAddOn.state.wait(['inactive', 'zombie']);
                return this.startServerAddOn(pluginName, details, owner);
            }
            console.debug('PluginManager.startServerAddOn -> already started', pluginName, owner, existingServerAddOn.state.currentState);
            await existingServerAddOn.addOwner(owner);
            return;
        }
        const newServerAddOn = new ServerAddManager_1.ServerAddOnManager(pluginName, details, owner, this.flipperServer);
        this.serverAddOns.set(pluginName, newServerAddOn);
        newServerAddOn.state.once(['fatal', 'zombie', 'inactive'], () => {
            this.serverAddOns.delete(pluginName);
        });
        await newServerAddOn.state.wait(['active', 'fatal']);
        if (newServerAddOn.state.is('fatal')) {
            this.serverAddOns.delete(pluginName);
            throw newServerAddOn.state.error;
        }
    }
    async stopServerAddOn(pluginName, owner) {
        console.debug('PluginManager.stopServerAddOn', pluginName);
        const serverAddOn = this.serverAddOns.get(pluginName);
        if (!serverAddOn) {
            console.warn('PluginManager.stopServerAddOn -> not started', pluginName);
            return;
        }
        try {
            await serverAddOn.removeOwner(owner);
        }
        catch (e) {
            console.error('PluginManager.stopServerAddOn -> error', pluginName, owner, e);
            this.serverAddOns.delete(pluginName);
            throw e;
        }
    }
    stopAllServerAddOns(owner) {
        console.debug('PluginManager.stopAllServerAddOns', owner);
        this.serverAddOns.forEach(async (serverAddOnPromise) => {
            try {
                const serverAddOn = await serverAddOnPromise;
                serverAddOn.removeOwner(owner);
            }
            catch (e) {
                // It is OK to use a debug level here because any failure would be logged in "stopServerAddOn"
                console.debug('PluginManager.stopAllServerAddOns -> failed to remove owner', owner, e);
            }
        });
    }
}
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map