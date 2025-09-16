/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ClientResponseType } from 'flipper-common';
import WebSocket from 'ws';
import WebSocketClientConnection from './WebSocketClientConnection';
/**
 * @deprecated
 * Default `WebSocketClientConnection` should be used instead.
 * See BrowserServerWebSocket.handleMessage.
 */
export declare class BrowserClientConnection extends WebSocketClientConnection {
    plugins?: string[] | undefined;
    legacyFormat: boolean;
    private static isGetPluginsCall;
    private static isGetBackgroundPluginsCall;
    constructor(ws: WebSocket, plugins?: string[] | undefined);
    sendExpectResponse(data: object): Promise<ClientResponseType>;
    protected serializeData(data: object): string;
}
//# sourceMappingURL=BrowserClientConnection.d.ts.map