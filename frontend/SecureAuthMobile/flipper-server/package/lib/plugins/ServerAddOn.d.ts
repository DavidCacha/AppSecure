/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServerForServerAddOn, ServerAddOnCleanup, ServerAddOnStartDetails } from 'flipper-common';
import { ServerAddOnDesktopToModuleConnection } from './ServerAddOnDesktopToModuleConnection';
export declare class ServerAddOn {
    readonly pluginName: string;
    private readonly cleanup;
    readonly connection: ServerAddOnDesktopToModuleConnection;
    private owners;
    constructor(pluginName: string, cleanup: ServerAddOnCleanup, connection: ServerAddOnDesktopToModuleConnection, initialOwner: string);
    static start(pluginName: string, details: ServerAddOnStartDetails, initialOwner: string, flipperServer: FlipperServerForServerAddOn): Promise<ServerAddOn>;
    addOwner(owner: string): void;
    removeOwner(owner: string): Promise<void> | undefined;
    stop(): Promise<void>;
}
//# sourceMappingURL=ServerAddOn.d.ts.map