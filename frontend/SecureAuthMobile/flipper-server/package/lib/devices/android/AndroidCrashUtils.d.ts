/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import type { CrashLog, DeviceLogEntry } from 'flipper-common';
import { DeviceListener } from '../../utils/DeviceListener';
import { ServerDevice } from '../ServerDevice';
export declare function parseAndroidCrash(content: string, logDate?: Date): CrashLog;
export declare function shouldParseAndroidLog(entry: DeviceLogEntry, date: Date): boolean;
export declare class AndroidCrashWatcher extends DeviceListener {
    private readonly device;
    constructor(device: ServerDevice);
    protected startListener(): Promise<() => void>;
}
//# sourceMappingURL=AndroidCrashUtils.d.ts.map