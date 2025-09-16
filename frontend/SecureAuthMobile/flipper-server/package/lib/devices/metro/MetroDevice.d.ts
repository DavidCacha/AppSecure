/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServerImpl } from '../../FlipperServerImpl';
import { ServerDevice } from '../ServerDevice';
import WebSocket from 'ws';
export default class MetroDevice extends ServerDevice {
    ws?: WebSocket;
    constructor(flipperServer: FlipperServerImpl, serial: string, ws: WebSocket | undefined);
    private _handleWSMessage;
    sendCommand(command: string, params?: any): void;
}
//# sourceMappingURL=MetroDevice.d.ts.map