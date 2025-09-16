/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import { Express } from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { FlipperServerImpl } from '../FlipperServerImpl';
import { EnvironmentInfo } from 'flipper-common';
type Config = {
    port: number;
    staticPath: string;
    entry: string;
};
type ReadyForConnections = (server: FlipperServerImpl) => Promise<void>;
/**
 * Orchestrates the creation of the HTTP server, proxy, and WS server.
 * @param config Server configuration.
 * @returns Returns a promise to the created server, proxy and WS server.
 */
export declare function startServer(config: Config, environmentInfo: EnvironmentInfo): Promise<{
    app: Express;
    server: http.Server;
    socket: WebSocketServer;
    readyForIncomingConnections: ReadyForConnections;
}>;
export {};
//# sourceMappingURL=startServer.d.ts.map