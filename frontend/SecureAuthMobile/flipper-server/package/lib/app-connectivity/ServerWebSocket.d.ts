/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
/// <reference types="node" />
import { IncomingMessage } from 'http';
import ServerWebSocketBase from './ServerWebSocketBase';
import WebSocket, { Server as WSServer, VerifyClientCallbackSync } from 'ws';
import querystring from 'querystring';
import { ClientQuery } from 'flipper-common';
import { SecureServerConfig } from './certificate-exchange/certificate-utils';
export interface ConnectionCtx {
    clientQuery?: ClientQuery;
    ws: WebSocket;
    request: IncomingMessage;
}
export declare const WEBSOCKET_MAX_MESSAGE_SIZE: number;
/**
 * It serves as a base class for WebSocket based servers. It delegates the 'connection'
 * event to subclasses as a customisation point.
 */
declare class ServerWebSocket extends ServerWebSocketBase {
    protected wsServer?: WSServer;
    private httpServer?;
    start(port: number, sslConfig?: SecureServerConfig): Promise<number>;
    stop(): Promise<void>;
    /**
     * A connection has been established between the server and a client. Only ever used for
     * certificate exchange.
     *
     * @param ws An active WebSocket.
     * @param request Incoming request message.
     */
    onConnection(ws: WebSocket, request: IncomingMessage): void;
    /**
     * Extract and create a ClientQuery from the request URL. This method will throw if:
     * @param ctx The connection context.
     * @returns It doesn't return anything, if the client query
     * is extracted, this one is set into the connection context.
     */
    protected extractClientQuery(ctx: ConnectionCtx): void;
    protected handleConnectionAttempt(ctx: ConnectionCtx): void;
    protected handleMessageDeserialization(ctx: ConnectionCtx, message: unknown): object;
    protected handleMessage(ctx: ConnectionCtx, parsedMessage: object, _rawMessage: string): Promise<void>;
    /**
     * Parse and extract a ClientQuery instance from a message. The ClientQuery
     * data will be contained in the message url query string.
     * @param message An incoming web socket message.
     */
    protected parseClientQuery(query: querystring.ParsedUrlQuery): ClientQuery | undefined;
    /**
     * WebSocket client verification. Usually used to validate the origin.
     *
     * Base implementation simply returns true, but this can be overriden by subclasses
     * that require verification.
     *
     * @returns Return true if the client was successfully verified, otherwise
     * returns false.
     */
    protected verifyClient(): VerifyClientCallbackSync;
    protected stopAcceptingNewConectionsImpl(): void;
}
export default ServerWebSocket;
//# sourceMappingURL=ServerWebSocket.d.ts.map