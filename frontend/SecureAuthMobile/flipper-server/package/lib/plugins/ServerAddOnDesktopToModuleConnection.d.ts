/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ClientResponseType, ExecuteMessage, FlipperServerForServerAddOn } from 'flipper-common';
import { ServerAddOnModuleToDesktopConnection } from './ServerAddOnModuleToDesktopConnection';
export declare class ServerAddOnDesktopToModuleConnection {
    private readonly moduleToDesktopConnection;
    private readonly flipperServer;
    constructor(moduleToDesktopConnection: ServerAddOnModuleToDesktopConnection, flipperServer: FlipperServerForServerAddOn);
    sendExpectResponse({ method, params, }: ExecuteMessage): Promise<ClientResponseType>;
    private subscribeToMessagesFromServerAddOn;
}
//# sourceMappingURL=ServerAddOnDesktopToModuleConnection.d.ts.map