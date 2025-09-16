/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import ServerWebSocketBase, { ServerEventsListener } from './ServerWebSocketBase';
import { RSocketServer } from 'rsocket-core';
import { Payload, ReactiveSocket, Responder } from 'rsocket-types';
import { SecureServerConfig } from './certificate-exchange/certificate-utils';
/**
 * RSocket based server. RSocket uses its own protocol for communication between
 * client and server.
 */
declare class ServerRSocket extends ServerWebSocketBase {
    rawServer_: RSocketServer<any, any> | null | undefined;
    constructor(listener: ServerEventsListener);
    /**
     * Start the server bound to the specified port. It configures
     * the RSocket server factory and request handler based on the optional
     * sslConfig argument.
     */
    start(port: number, sslConfig?: SecureServerConfig): Promise<number>;
    stop(): Promise<void>;
    /**
     * Handle an incoming connection request over TLS.
     * @param socket Underlying socket connection.
     * @param payload Payload or message received.
     * @returns Returns a valid RSocket responder which will handle further
     * communication from the client.
     */
    _trustedRequestHandler: (socket: ReactiveSocket<string, any>, payload: Payload<string, any>) => Partial<Responder<string, any>>;
    /**
     * Handle an incoming connection request over an insecure connection.
     * @param socket Underlying socket connection.
     * @param payload Payload or message received.
     * @returns Returns a valid RSocket responder which will handle further
     * communication from the client.
     */
    _untrustedRequestHandler: (_socket: ReactiveSocket<string, any>, payload: Payload<string, any>) => Partial<Responder<string, any>>;
    protected stopAcceptingNewConectionsImpl(): void;
}
export default ServerRSocket;
//# sourceMappingURL=ServerRSocket.d.ts.map