/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServerImpl } from '../FlipperServerImpl';
import { WebSocketServer } from 'ws';
/**
 * Attach and handle incoming messages from clients.
 * @param server A FlipperServer instance.
 * @param socket A ws socket on which to listen for events.
 */
export declare function attachSocketServer(socket: WebSocketServer, server: FlipperServerImpl): void;
//# sourceMappingURL=attachSocketServer.d.ts.map