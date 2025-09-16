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
import { ClientDescription, ClientQuery, SecureClientQuery, Logger, ConnectionRecordEntry } from 'flipper-common';
import { ClientConnection } from './ClientConnection';
import { EventEmitter } from 'events';
import ServerWebSocketBase, { CertificateExchangeRequestResponse, ServerEventsListener } from './ServerWebSocketBase';
import { FlipperServerImpl } from '../FlipperServerImpl';
type ClientTimestampTracker = {
    insecureStart?: number;
    secureStart?: number;
};
type ClientInfo = {
    connection: ClientConnection | null | undefined;
    client: ClientDescription;
};
/**
 * Responsible of creating and managing the actual underlying servers:
 * - Insecure (used for certificate exchange)
 * - Secure (used for secure communication between the client and server)
 * - Browser (only ever used between Desktop and a local Browser)
 *
 * Additionally, it manages client connections.
 */
export declare class ServerController extends EventEmitter implements ServerEventsListener {
    connections: Map<string, ClientInfo>;
    timestamps: Map<string, ClientTimestampTracker>;
    secureServer: ServerWebSocketBase | null;
    insecureServer: ServerWebSocketBase | null;
    altSecureServer: ServerWebSocketBase | null;
    altInsecureServer: ServerWebSocketBase | null;
    browserServer: ServerWebSocketBase | null;
    connectionTracker: ConnectionTracker;
    flipperServer: FlipperServerImpl;
    timeHandlers: Map<string, NodeJS.Timeout>;
    constructor(flipperServer: FlipperServerImpl);
    onClientMessage(clientId: string, payload: string): void;
    get logger(): Logger;
    /**
     * Loads the secure server configuration and starts any necessary servers.
     * Initialisation is complete once the initialized promise is fullfilled at
     * which point Flipper is accepting connections.
     */
    init(): Promise<void>;
    /**
     * If initialized, it stops any started servers.
     */
    close(): Promise<void>;
    onDeviceLogs(logs: ConnectionRecordEntry[]): void;
    onConnectionCreated(clientQuery: SecureClientQuery, clientConnection: ClientConnection, downgrade?: boolean): Promise<ClientDescription>;
    onConnectionClosed(clientId: string): void;
    onListening(port: number): void;
    onSecureConnectionAttempt(clientQuery: SecureClientQuery): void;
    /**
     * A connection has been established between a running app and Flipper Desktop.
     * The connection sole purpose is to perform the certificate exchange.
     * @param clientQuery Client query defines the arguments passed down from the app
     * to Flipper Desktop.
     */
    onConnectionAttempt(clientQuery: ClientQuery): void;
    onProcessCSR(unsanitizedCSR: string, clientQuery: ClientQuery, appDirectory: string): Promise<CertificateExchangeRequestResponse>;
    onError(error: Error): void;
    toJSON(): null;
    onClientSetupError(clientQuery: ClientQuery, error: Error): void;
    /**
     * Creates a Client and sets the underlying connection.
     * @param connection A client connection to communicate between server and client.
     * @param clientQuery The client query created from the initial handshake.
     * @param csrQuery The CSR query which contains CSR related information.
     */
    addConnection(connection: ClientConnection, clientQuery: SecureClientQuery, silentReplace?: boolean): Promise<ClientDescription>;
    attachFakeClient(client: ClientDescription): void;
    /**
     * Removes a client connection by disconnecting it, if still connected
     * and then deleting it from the tracked connections.
     * @param id The client connection identifier.
     */
    removeConnection(id: string): void;
    onDeprecationNotice(message: string): void;
}
declare class ConnectionTracker {
    timeWindowMillis: number;
    connectionProblemThreshold: number;
    connectionAttempts: Map<string, Array<number>>;
    logger: Logger;
    constructor(logger: Logger);
    logConnectionAttempt(clientQuery: ClientQuery): void;
}
export {};
//# sourceMappingURL=ServerController.d.ts.map