/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import type { DeviceTarget } from 'flipper-common';
import { IdbConfig } from './iOSContainerUtility';
import { IOSBridge } from './IOSBridge';
import { FlipperServerImpl } from '../../FlipperServerImpl';
import iOSCertificateProvider from './iOSCertificateProvider';
export declare class IOSDeviceManager {
    private readonly flipperServer;
    private readonly idbConfig;
    private portForwarders;
    private portforwardingClient;
    ctlBridge: IOSBridge | undefined;
    readonly certificateProvider: iOSCertificateProvider;
    constructor(flipperServer: FlipperServerImpl, idbConfig: IdbConfig);
    private forwardPort;
    private startDevicePortForwarders;
    queryDevices(bridge: IOSBridge): Promise<any>;
    private processDevices;
    getBridge(): Promise<IOSBridge>;
    watchIOSDevices(): Promise<void>;
    getSimulators(bootedOnly: boolean): Promise<Array<DeviceTarget>>;
    launchSimulator(udid: string): Promise<void>;
    launchApp(udid: string, bundleId: string): Promise<void>;
    private queryDevicesForever;
    checkXcodeVersionMismatch(): Promise<void>;
    idbKill(): Promise<void>;
}
export declare function checkXcodeVersionMismatch(runningSimulatorApps: Array<string>, xcodeCLIVersion: string): string | undefined;
//# sourceMappingURL=iOSDeviceManager.d.ts.map