/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServer, MarketplacePluginDetails } from 'flipper-common';
export declare function selectCompatibleMarketplaceVersions(availablePlugins: MarketplacePluginDetails[]): MarketplacePluginDetails[];
export declare function loadMarketplacePlugins(flipperServer: FlipperServer, marketplaceURL: string): Promise<MarketplacePluginDetails[]>;
//# sourceMappingURL=loadMarketplacePlugins.d.ts.map