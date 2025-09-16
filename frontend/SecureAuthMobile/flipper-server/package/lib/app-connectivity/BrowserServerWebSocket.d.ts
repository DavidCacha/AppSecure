/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import { ParsedUrlQuery } from 'querystring';
import { BrowserClientConnection } from './BrowserClientConnection';
import ws from 'ws';
import SecureServerWebSocket, { SecureConnectionCtx } from './SecureServerWebSocket';
import { SecureClientQuery } from 'flipper-common';
interface BrowserConnectionCtx extends SecureConnectionCtx {
    clientConnection?: BrowserClientConnection;
}
/**
 * WebSocket-based server over an insecure channel that does not support the certificate exchange flow. E.g. web browser.
 */
declare class BrowserServerWebSocket extends SecureServerWebSocket {
    protected handleConnectionAttempt(ctx: BrowserConnectionCtx): void;
    protected handleMessage(ctx: BrowserConnectionCtx, parsedMessage: object, rawMessage: string): Promise<void>;
    protected parseClientQuery(query: ParsedUrlQuery): SecureClientQuery | undefined;
    protected verifyClient(): ws.VerifyClientCallbackSync;
}
export default BrowserServerWebSocket;
//# sourceMappingURL=BrowserServerWebSocket.d.ts.map