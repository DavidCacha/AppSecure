/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { DeviceLogEntry, DeviceLogLevel, DeviceType } from 'flipper-common';
import { DeviceListener } from '../../utils/DeviceListener';
import { IOSBridge } from './IOSBridge';
type IOSLogLevel = 'Default' | 'Info' | 'Debug' | 'Error' | 'Fault';
type RawLogEntry = {
    eventMessage: string;
    machTimestamp: number;
    messageType: IOSLogLevel;
    processID: number;
    processImagePath: string;
    processImageUUID: string;
    processUniqueID: number;
    senderImagePath: string;
    senderImageUUID: string;
    senderProgramCounter: number;
    threadID: number;
    timestamp: string;
    timezoneName: string;
    traceID: string;
};
export declare class iOSLogListener extends DeviceListener {
    private onNewLogEntry;
    private readonly iOSBridge;
    private readonly serial;
    private readonly deviceType;
    constructor(isDeviceConnected: () => boolean, onNewLogEntry: (logEntry: DeviceLogEntry) => void, iOSBridge: IOSBridge, serial: string, deviceType: DeviceType);
    protected startListener(): Promise<() => void>;
    static parseJsonLogEntry(entry: RawLogEntry): DeviceLogEntry;
    static getLogLevel(level: string): DeviceLogLevel;
    static parseLogLine(line: string): DeviceLogEntry | undefined;
}
export {};
//# sourceMappingURL=iOSLogListener.d.ts.map