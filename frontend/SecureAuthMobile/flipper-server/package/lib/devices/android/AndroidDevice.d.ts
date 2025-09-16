/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/adbkit" />
/// <reference types="../types/adbkit-logcat" />
/// <reference types="node" />
import { Client as ADBClient } from 'adbkit';
import { Reader } from 'adbkit-logcat';
import type { DeviceDebugData, DeviceType } from 'flipper-common';
import { DeviceSpec } from 'flipper-common';
import { ServerDevice } from '../ServerDevice';
import { FlipperServerImpl } from '../../FlipperServerImpl';
import { AndroidCrashWatcher } from './AndroidCrashUtils';
import { AndroidLogListener } from './AndroidLogListener';
import { DebuggableDevice } from '../DebuggableDevice';
export default class AndroidDevice extends ServerDevice implements DebuggableDevice {
    adb: ADBClient;
    pidAppMapping: {
        [key: number]: string;
    };
    private recordingProcess?;
    reader?: Reader;
    readonly logListener: AndroidLogListener;
    readonly crashWatcher: AndroidCrashWatcher;
    constructor(flipperServer: FlipperServerImpl, serial: string, deviceType: DeviceType, title: string, adb: ADBClient, abiList: Array<string>, sdkVersion: string, specs?: DeviceSpec[]);
    reverse(ports: number[]): Promise<void>;
    clearLogs(): Promise<void>;
    navigateToLocation(location: string): Promise<void>;
    screenshot(): Promise<Buffer>;
    setIntoPermissiveMode(): Promise<void>;
    screenRecordAvailable(): Promise<boolean>;
    screenShotAvailable(): Promise<boolean>;
    executeShell(command: string): Promise<string>;
    private executeShellOrDie;
    private getSdkVersion;
    private isValidFile;
    startScreenCapture(destination: string): Promise<void>;
    stopScreenCapture(): Promise<string>;
    forwardPort(local: string, remote: string): Promise<boolean>;
    disconnect(): void;
    installApp(apkPath: string): Promise<void>;
    readFlipperFolderForAllApps(): Promise<DeviceDebugData[]>;
}
export declare function launchEmulator(androidHome: string, name: string, coldBoot?: boolean): Promise<void>;
//# sourceMappingURL=AndroidDevice.d.ts.map