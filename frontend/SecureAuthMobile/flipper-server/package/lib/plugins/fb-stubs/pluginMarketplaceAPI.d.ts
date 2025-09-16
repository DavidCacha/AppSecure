/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServer, MarketplacePluginDetails } from 'flipper-common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare function loadAvailablePlugins(server: FlipperServer, marketplaceURL: string): Promise<MarketplacePluginDetails[]>;
export declare function httpGet(url: URL, config: AxiosRequestConfig): Promise<AxiosResponse>;
//# sourceMappingURL=pluginMarketplaceAPI.d.ts.map