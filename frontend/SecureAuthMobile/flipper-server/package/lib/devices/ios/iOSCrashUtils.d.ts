/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import type { CrashLog } from 'flipper-common';
import { DeviceListener } from '../../utils/DeviceListener';
import { ServerDevice } from '../ServerDevice';
export declare function parseIosCrashLegacy(content: string): CrashLog;
export declare function parseIosCrashModern(content: string): CrashLog;
export declare function shouldShowiOSCrashNotification(serial: string, content: string, legacy: boolean): boolean;
export declare function parsePathLegacy(content: string): string | null;
export declare function parsePathModern(content: string): string | null;
export declare class iOSCrashWatcher extends DeviceListener {
    private readonly device;
    constructor(device: ServerDevice);
    protected startListener(): Promise<() => void>;
}
//# sourceMappingURL=iOSCrashUtils.d.ts.map