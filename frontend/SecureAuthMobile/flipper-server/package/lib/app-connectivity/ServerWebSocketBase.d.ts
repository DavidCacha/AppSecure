/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ClientConnection } from './ClientConnection';
import { ClientDescription, ClientQuery, ConnectionRecordEntry, SecureClientQuery } from 'flipper-common';
import { SecureServerConfig } from './certificate-exchange/certificate-utils';
export type CertificateExchangeRequestResponse = {
    deviceId?: string;
    certificates?: string;
};
/**
 * Defines an interface for events triggered by a running server interacting
 * with a client.
 */
export interface ServerEventsListener {
    onDeviceLogs(logs: ConnectionRecordEntry[]): void;
    /**
     * Server started and listening at the specified port.
     * @param port The port in which the server is listening to.
     */
    onListening(port: number): void;
    /**
     * An insecure connection attempt has been made by a client. At this
     * point, a connection should be already be available but needs to be
     * validated by the server.
     * @param clientQuery A ClientQuery instance containing metadata about
     * the client e.g. OS, device, app, etc.
     */
    onConnectionAttempt(clientQuery: ClientQuery): void;
    /**
     * A TLS connection attempt has been made by a client. At this
     * point, a connection should be already be available but needs to be
     * validated by the server.
     * @param clientQuery A SecureClientQuery instance containing metadata about
     * the client and CSR information as exchanged on the previously
     * established insecure connection.
     */
    onSecureConnectionAttempt(clientQuery: SecureClientQuery): void;
    /**
     * CSR received by the server and needs to be processed. If successfully
     * processed, it should return a generated device identifier.
     * @param unsanitizedCSR CSR as sent by the client, will need to be sanitized
     * before usage.
     * @param clientQuery A ClientQuery instance containing metadata about
     * the client e.g. OS, device, app, etc.
     * @param appDirectory App directory in which to deploy the CA and client
     * certificates.
     * @param medium Certificate exchange medium type e.g. FS_ACCESS, WWW.
     */
    onProcessCSR(unsanitizedCSR: string, clientQuery: ClientQuery, appDirectory: string): Promise<CertificateExchangeRequestResponse>;
    /**
     * A secure connection has been established with a validated client.
     * A promise to a Client instance needs to be returned.
     * @param clientQuery A SecureClientQuery instance containing metadata about
     * the client and CSR information as exchanged on the previously
     * established insecure connection.
     * @param clientConnection A valid client connection.
     */
    onConnectionCreated(clientQuery: SecureClientQuery, clientConnection: ClientConnection, downgrade?: boolean): Promise<ClientDescription>;
    /**
     * A connection with a client has been closed.
     * @param id The client identifier.
     */
    onConnectionClosed(id: string): void;
    /**
     * An error has occurred.
     * @param error An Error instance.
     */
    onError(error: Error): void;
    /**
     * A message was received for a specif client
     * // TODO: payload should become JSON
     */
    onClientMessage(clientId: string, payload: string): void;
    onClientSetupError(clientQuery: ClientQuery, error: Error): void;
    onDeprecationNotice: (message: string) => void;
}
/**
 * Defines the base class to be used by any server implementation e.g.
 * RSocket, WebSocket, etc.
 */
declare abstract class ServerWebSocketBase {
    protected listener: ServerEventsListener;
    protected acceptingNewConections: boolean;
    protected deviceLogRegex: RegExp;
    constructor(listener: ServerEventsListener);
    /**
     * Start and bind server to the specified port.
     * @param port A port number. Pass 0 to get a random free port.
     * https://stackoverflow.com/a/28050404
     * @param sslConfig An optional SSL configuration to be used for
     * TLS servers.
     *
     * @returns An assigned port number
     */
    abstract start(port: number, sslConfig?: SecureServerConfig): Promise<number>;
    /**
     * Stop the server.
     */
    abstract stop(): Promise<void>;
    /**
     * Handle a message received over an insecure connection. The only
     * supported message is to sign certificates.
     * @param clientQuery A ClientQuery instance containing metadata about
     * the client e.g. OS, device, app, etc.
     * @param rawData Raw data as sent by the client.
     * @returns The response to be sent back to the client. If the received
     * request is to sign a certificate and no errors were found, the response
     * should contain the device identifier to use by the client.
     */
    protected _onHandleUntrustedMessage(clientQuery: ClientQuery, rawData: any): Promise<string | undefined>;
    startAcceptingNewConections(): void;
    stopAcceptingNewConections(): void;
    processDeviceLogs(clientQuery: ClientQuery, logs: string[] | undefined): void;
    protected abstract stopAcceptingNewConectionsImpl(): void;
}
export default ServerWebSocketBase;
//# sourceMappingURL=ServerWebSocketBase.d.ts.map