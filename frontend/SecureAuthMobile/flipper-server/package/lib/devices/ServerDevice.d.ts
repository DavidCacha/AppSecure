/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import { DeviceDescription, DeviceLogEntry } from 'flipper-common';
import { DeviceListener } from '../utils/DeviceListener';
import { FlipperServerImpl } from '../FlipperServerImpl';
export declare abstract class ServerDevice {
    readonly info: DeviceDescription;
    readonly flipperServer: FlipperServerImpl;
    connected: boolean;
    protected stopCrashWatcherCb?: () => void;
    readonly logListener: DeviceListener;
    readonly crashWatcher: DeviceListener;
    constructor(flipperServer: FlipperServerImpl, info: DeviceDescription);
    get serial(): string;
    addLogEntry(entry: DeviceLogEntry): void;
    /**
     * The device might have no active connection
     */
    disconnect(): void;
    screenshot(): Promise<Buffer>;
    startScreenCapture(_destination: string): Promise<void>;
    stopScreenCapture(): Promise<string>;
    executeShell(_command: string): Promise<string>;
    forwardPort(_local: string, _remote: string): Promise<boolean>;
    clearLogs(): Promise<void>;
    navigateToLocation(_location: string): Promise<void>;
    installApp(_appBundlePath: string): Promise<void>;
    openApp(_name: string): Promise<void>;
}
//# sourceMappingURL=ServerDevice.d.ts.map