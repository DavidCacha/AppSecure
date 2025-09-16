/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { StateMachine } from './StateMachine';
export declare const RESTART_CNT = 3;
export type DeviceLogListenerState = 'starting' | 'stopping' | 'active' | 'inactive' | 'fatal' | 'zombie';
export declare abstract class DeviceListener {
    protected readonly isDeviceConnected: () => boolean;
    private name;
    protected _state: StateMachine<DeviceLogListenerState, "fatal" | "zombie">;
    private stopLogListener?;
    private restartCnt;
    constructor(isDeviceConnected: () => boolean);
    start(): Promise<void>;
    protected abstract startListener(): Promise<() => Promise<void> | void>;
    stop(): Promise<void>;
    once(state: DeviceLogListenerState | DeviceLogListenerState[], cb: () => void): () => void;
    on(state: DeviceLogListenerState | DeviceLogListenerState[], cb: () => void): () => void;
    get state(): DeviceLogListenerState;
    get error(): Error | undefined;
}
export declare class NoopListener extends DeviceListener {
    startListener(): Promise<() => void>;
}
//# sourceMappingURL=DeviceListener.d.ts.map