/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/adbkit" />
import { Client } from 'adbkit';
type Config = {
    androidHome: string;
    adbKitSettings?: {
        host?: string;
        port?: number;
    };
};
export declare function initializeAdbClient(config: Config): Promise<Client | void>;
export {};
//# sourceMappingURL=adbClient.d.ts.map