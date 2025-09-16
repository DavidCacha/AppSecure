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
export declare function getPluginSourceFolders(): Promise<string[]>;
/**
 * Attaches the necessary routing and middleware to observe
 * for local changes and apply them to the running instance.
 * @param app Express app.
 * @param server HTTP server.
 * @param socket Web Socket server.
 * @param rootDir Root directory.
 */
export declare function attachDevServer(app: Express, server: http.Server, socket: WebSocketServer, rootDir: string): Promise<void>;
//# sourceMappingURL=attachDevServer.d.ts.map