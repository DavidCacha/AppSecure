/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { DownloadablePluginDetails, FlipperServerForServerAddOn, InstalledPluginDetails, PluginSource, ServerAddOnStartDetails } from 'flipper-common';
import { loadDynamicPlugins } from './loadDynamicPlugins';
import { getInstalledPlugins, installPluginFromFileOrBuffer, removePlugins, getUpdatablePlugins, getInstalledPlugin, installPluginFromNpm } from 'flipper-plugin-lib';
import { ServerAddOnManager } from './ServerAddManager';
export declare class PluginManager {
    private readonly flipperServer;
    readonly serverAddOns: Map<string, ServerAddOnManager>;
    constructor(flipperServer: FlipperServerForServerAddOn);
    start(): Promise<void>;
    loadDynamicPlugins: typeof loadDynamicPlugins;
    getInstalledPlugins: typeof getInstalledPlugins;
    removePlugins: typeof removePlugins;
    getUpdatablePlugins: typeof getUpdatablePlugins;
    getInstalledPlugin: typeof getInstalledPlugin;
    installPluginFromFileOrBuffer: typeof installPluginFromFileOrBuffer;
    installPluginFromNpm: typeof installPluginFromNpm;
    loadSource(path: string): Promise<PluginSource>;
    loadMarketplacePlugins(): Promise<import("flipper-common").MarketplacePluginDetails[]>;
    installPluginForMarketplace(name: string): Promise<InstalledPluginDetails>;
    downloadPlugin(plugin: DownloadablePluginDetails): Promise<InstalledPluginDetails>;
    getServerAddOnForMessage(message: object): ServerAddOnManager | undefined;
    startServerAddOn(pluginName: string, details: ServerAddOnStartDetails, owner: string): Promise<void>;
    stopServerAddOn(pluginName: string, owner: string): Promise<void>;
    stopAllServerAddOns(owner: string): void;
}
//# sourceMappingURL=PluginManager.d.ts.map