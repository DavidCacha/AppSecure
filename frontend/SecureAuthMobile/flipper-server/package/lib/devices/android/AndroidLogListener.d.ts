/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/adbkit" />
import type { Client as ADBClient } from 'adbkit';
import { DeviceLogEntry } from 'flipper-common';
import { DeviceListener } from '../../utils/DeviceListener';
export declare class AndroidLogListener extends DeviceListener {
    private onNewLogEntry;
    private readonly adb;
    private readonly serial;
    constructor(isDeviceConnected: () => boolean, onNewLogEntry: (logEntry: DeviceLogEntry) => void, adb: ADBClient, serial: string);
    protected startListener(): Promise<() => void>;
}
//# sourceMappingURL=AndroidLogListener.d.ts.map