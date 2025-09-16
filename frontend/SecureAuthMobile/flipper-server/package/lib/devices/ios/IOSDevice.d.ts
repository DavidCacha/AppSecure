/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
import { DeviceDebugData, DeviceType } from 'flipper-common';
import { IOSBridge } from './IOSBridge';
import { ServerDevice } from '../ServerDevice';
import { FlipperServerImpl } from '../../FlipperServerImpl';
import { iOSCrashWatcher } from './iOSCrashUtils';
import { iOSLogListener } from './iOSLogListener';
import { DebuggableDevice } from '../DebuggableDevice';
export default class IOSDevice extends ServerDevice implements DebuggableDevice {
    private recording?;
    private iOSBridge;
    readonly logListener: iOSLogListener;
    readonly crashWatcher: iOSCrashWatcher;
    constructor(flipperServer: FlipperServerImpl, iOSBridge: IOSBridge, serial: string, deviceType: DeviceType, title: string);
    screenshot(): Promise<Buffer>;
    navigateToLocation(location: string): Promise<any>;
    startScreenCapture(destination: string): Promise<void>;
    stopScreenCapture(): Promise<string>;
    installApp(ipaPath: string): Promise<void>;
    openApp(name: string): Promise<void>;
    readFlipperFolderForAllApps(): Promise<DeviceDebugData[]>;
    disconnect(): void;
}
//# sourceMappingURL=IOSDevice.d.ts.map