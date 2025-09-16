/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import EventEmitter from 'events';
import { ResponseMessage, ExecuteMessage, ServerAddOnPluginConnection, FlipperPluginReceiver } from 'flipper-common';
export type ServerAddOnModuleToDesktopConnectionEvents = {
    message: ExecuteMessage;
};
export declare class ServerAddOnModuleToDesktopConnection extends EventEmitter implements ServerAddOnPluginConnection<any, any> {
    private readonly pluginName;
    private subscriptions;
    constructor(pluginName: string);
    send(method: string, params: unknown): void;
    receive(method: string, receiver: FlipperPluginReceiver<any>): void;
    call(method: string, params: unknown): Promise<ResponseMessage>;
}
//# sourceMappingURL=ServerAddOnModuleToDesktopConnection.d.ts.map