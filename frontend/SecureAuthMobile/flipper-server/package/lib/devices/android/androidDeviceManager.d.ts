/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/adbkit" />
import { Client as ADBClient } from 'adbkit';
import { FlipperServerImpl } from '../../FlipperServerImpl';
import AndroidCertificateProvider from './AndroidCertificateProvider';
export declare class AndroidDeviceManager {
    private readonly flipperServer;
    private readonly adbClient;
    readonly certificateProvider: AndroidCertificateProvider;
    constructor(flipperServer: FlipperServerImpl, adbClient: ADBClient);
    private createDevice;
    getEmulatorPath(): string;
    getAndroidEmulators(): Promise<string[]>;
    private getRunningEmulatorName;
    watchAndroidDevices(initialRun?: boolean): Promise<void>;
    adbKill(): Promise<void>;
    private handleOfflineDevice;
    private registerDevice;
}
//# sourceMappingURL=androidDeviceManager.d.ts.map