/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ClientResponseType, ExecuteMessage, FlipperServerForServerAddOn, ServerAddOnStartDetails } from 'flipper-common';
import { StateMachine } from '../utils/StateMachine';
type TState = 'inactive' | 'starting' | 'active' | 'fatal' | 'stopping' | 'zombie';
export declare class ServerAddOnManager {
    readonly pluginName: string;
    readonly state: StateMachine<TState, "fatal">;
    private _serverAddOn?;
    constructor(pluginName: string, details: ServerAddOnStartDetails, initialOwner: string, flipperServer: FlipperServerForServerAddOn);
    sendExpectResponse(message: ExecuteMessage): Promise<ClientResponseType>;
    addOwner(owner: string): Promise<void>;
    removeOwner(owner: string): Promise<void>;
    private startServerAddOn;
}
export {};
//# sourceMappingURL=ServerAddManager.d.ts.map