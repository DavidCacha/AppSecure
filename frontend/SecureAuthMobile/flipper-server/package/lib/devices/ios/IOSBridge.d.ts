/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="node" />
/// <reference types="node" />
import child_process from 'child_process';
import type { DeviceTarget } from 'flipper-common';
import { DeviceType } from 'flipper-common';
import { ChildProcessPromise } from 'promisify-child-process';
export declare const ERR_NO_IDB_OR_XCODE_AVAILABLE = "Neither Xcode nor idb available. Cannot provide iOS device functionality.";
export declare const ERR_PHYSICAL_DEVICE_LOGS_WITHOUT_IDB = "Cannot provide logs from a physical device without idb.";
interface IOSInstalledAppDescriptor {
    bundleID: string;
    name: string;
    installType: 'user' | 'user_development' | 'system';
    architectures: string[];
    runningStatus: 'Unknown' | 'Running';
    debuggableStatus: boolean;
}
export interface IOSBridge {
    startLogListener: (udid: string, deviceType: DeviceType) => child_process.ChildProcessWithoutNullStreams;
    screenshot: (serial: string) => Promise<Buffer>;
    navigate: (serial: string, location: string) => Promise<void>;
    recordVideo: (serial: string, outputFile: string) => child_process.ChildProcess;
    getActiveDevices: (bootedOnly: boolean) => Promise<Array<DeviceTarget>>;
    installApp: (serial: string, ipaPath: string, tempPath: string) => Promise<void>;
    openApp: (serial: string, name: string) => Promise<void>;
    getInstalledApps: (serial: string) => Promise<IOSInstalledAppDescriptor[]>;
    ls: (serial: string, appBundleId: string, path: string) => Promise<string[]>;
    pull: (serial: string, src: string, bundleId: string, dst: string) => Promise<void>;
    launchSimulator(udid: string): Promise<any>;
}
export declare class IDBBridge implements IOSBridge {
    private idbPath;
    private enablePhysicalDevices;
    constructor(idbPath: string, enablePhysicalDevices: boolean);
    launchSimulator(udid: string): Promise<any>;
    getInstalledApps(serial: string): Promise<IOSInstalledAppDescriptor[]>;
    ls(serial: string, appBundleId: string, path: string): Promise<string[]>;
    pull(serial: string, src: string, bundleId: string, dst: string): Promise<void>;
    installApp(serial: string, ipaPath: string): Promise<void>;
    openApp(serial: string, bundleId: string): Promise<void>;
    getActiveDevices(bootedOnly: boolean): Promise<DeviceTarget[]>;
    navigate(serial: string, location: string): Promise<void>;
    recordVideo(serial: string, outputFile: string): child_process.ChildProcess;
    screenshot(serial: string): Promise<Buffer>;
    startLogListener(udid: string, deviceType: DeviceType): child_process.ChildProcessWithoutNullStreams;
    _execIdb(command: string): ChildProcessPromise;
}
export declare class SimctlBridge implements IOSBridge {
    pull(serial: string, src: string, bundleId: string, dst: string): Promise<void>;
    getInstalledApps(_serial: string): Promise<IOSInstalledAppDescriptor[]>;
    ls(_serial: string, _appBundleId: string): Promise<string[]>;
    openApp(): Promise<void>;
    installApp(serial: string, ipaPath: string, tempPath: string): Promise<void>;
    startLogListener(udid: string, deviceType: DeviceType): child_process.ChildProcessWithoutNullStreams;
    screenshot(serial: string): Promise<Buffer>;
    navigate(serial: string, location: string): Promise<void>;
    recordVideo(serial: string, outputFile: string): child_process.ChildProcess;
    getActiveDevices(bootedOnly: boolean): Promise<Array<DeviceTarget>>;
    launchSimulator(udid: string): Promise<any>;
}
export declare function makeIOSBridge(idbPath: string, isXcodeDetected: boolean, enablePhysicalDevices: boolean, isAvailable?: (idbPath: string) => Promise<boolean>): Promise<IOSBridge>;
export {};
//# sourceMappingURL=IOSBridge.d.ts.map