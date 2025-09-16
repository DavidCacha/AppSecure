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
import { ClientConnection, ConnectionStatusChange, PendingRequestResolvers } from './ClientConnection';
export default class WebSocketClientConnection implements ClientConnection {
    protected ws: WebSocket;
    protected pendingRequests: Map<number, PendingRequestResolvers>;
    constructor(ws: WebSocket);
    subscribeToEvents(subscriber: ConnectionStatusChange): void;
    close(): void;
    send(data: any): void;
    sendExpectResponse(data: any): Promise<ClientResponseType>;
    matchPendingRequest(id: number): PendingRequestResolvers | undefined;
    protected serializeData(data: object): string;
}
//# sourceMappingURL=WebSocketClientConnection.d.ts.map