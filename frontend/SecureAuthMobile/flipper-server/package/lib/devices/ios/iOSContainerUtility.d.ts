/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { DeviceTarget, DeviceType } from 'flipper-common';
export type IdbConfig = {
    idbPath: string;
    enablePhysicalIOS: boolean;
};
export type IdbTarget = {
    udid: string;
    type: string;
    name: string;
    os_version: string;
    architecture: string;
    state?: string;
    target_type?: string | DeviceType;
};
export type XcodeTarget = {
    state: 'Booted' | 'Shutdown' | 'Shutting Down';
    availability?: string;
    isAvailable?: 'YES' | 'NO' | true | false;
    name: string;
    osVersion?: string;
    udid: string;
};
export declare function isIdbAvailable(idbPath: string): Promise<boolean>;
export declare function getDeviceSetPath(): string[];
export declare function isSimulatorAvailable(simulator: XcodeTarget): boolean;
export declare function queryTargetsWithXcode(context?: any): Promise<Array<DeviceTarget>>;
declare function targets(idbPath: string, isPhysicalDeviceEnabled: boolean, bootedOnly?: boolean, context?: any): Promise<Array<DeviceTarget>>;
declare function push(udid: string, src: string, bundleId: string, dst: string, idbPath: string, context?: any): Promise<void>;
declare function pull(udid: string, src: string, bundleId: string, dst: string, idbPath: string, context?: any): Promise<void>;
declare function isXcodeDetected(): Promise<boolean>;
declare const _default: {
    targets: typeof targets;
    push: typeof push;
    pull: typeof pull;
    isXcodeDetected: typeof isXcodeDetected;
};
export default _default;
//# sourceMappingURL=iOSContainerUtility.d.ts.map