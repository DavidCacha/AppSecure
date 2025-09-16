/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import ServerWebSocket, { ConnectionCtx } from './ServerWebSocket';
import { ParsedUrlQuery } from 'querystring';
import { ClientDescription, SecureClientQuery } from 'flipper-common';
import WebSocketClientConnection from './WebSocketClientConnection';
export interface SecureConnectionCtx extends ConnectionCtx {
    clientQuery?: SecureClientQuery;
    clientConnection?: WebSocketClientConnection;
    clientPromise?: Promise<ClientDescription>;
    client?: ClientDescription;
}
/**
 * WebSocket-based server.
 * A secure connection has been established between the server and a client. Once a client
 * has a valid certificate, it can use a secure connection with Flipper and start exchanging
 * messages.
 * https://fbflipper.com/docs/extending/new-clients
 * https://fbflipper.com/docs/extending/establishing-a-connection
 */
declare class SecureServerWebSocket extends ServerWebSocket {
    protected handleConnectionAttempt(ctx: SecureConnectionCtx): void;
    protected handleMessage(ctx: SecureConnectionCtx, parsedMessage: object, rawMessage: string): Promise<void>;
    /**
     * Parse and extract a SecureClientQuery instance from a message. The ClientQuery
     * data will be contained in the message url query string.
     * @param message An incoming web socket message.
     */
    protected parseClientQuery(query: ParsedUrlQuery): SecureClientQuery | undefined;
}
export default SecureServerWebSocket;
//# sourceMappingURL=SecureServerWebSocket.d.ts.map