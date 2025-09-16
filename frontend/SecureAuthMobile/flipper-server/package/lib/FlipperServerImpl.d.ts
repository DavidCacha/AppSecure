/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import './utils/macCa';
import './utils/fetch-polyfill';
import { ServerController } from './app-connectivity/ServerController';
import { AndroidDeviceManager } from './devices/android/androidDeviceManager';
import { IOSDeviceManager } from './devices/ios/iOSDeviceManager';
import { FlipperServerEvents, FlipperServerState, FlipperServerCommands, FlipperServer, FlipperServerConfig, Logger, FlipperServerExecOptions } from 'flipper-common';
import { ServerDevice } from './devices/ServerDevice';
import { KeytarManager, KeytarModule } from './utils/keytar';
import { PluginManager } from './plugins/PluginManager';
/**
 * FlipperServer takes care of all incoming device & client connections.
 * It will set up managers per device type, and create the incoming
 * RSocket/WebSocket server to handle incoming client connections.
 *
 * The server should be largely treated as event emitter, by listening to the relevant events
 * using '.on'. All events are strongly typed.
 */
export declare class FlipperServerImpl implements FlipperServer {
    config: FlipperServerConfig;
    logger: Logger;
    private readonly events;
    readonly server: ServerController;
    readonly disposers: ((() => void) | void)[];
    private readonly devices;
    state: FlipperServerState;
    stateError: string | undefined;
    android?: AndroidDeviceManager;
    ios?: IOSDeviceManager;
    keytarManager: KeytarManager;
    pluginManager: PluginManager;
    unresponsiveClients: Set<string>;
    private acceptingNewConections;
    constructor(config: FlipperServerConfig, logger: Logger, keytarModule?: KeytarModule);
    startAcceptingNewConections(): void;
    stopAcceptingNewConections(): void;
    setServerState(state: FlipperServerState, error?: Error): void;
    /**
     * Starts listening to parts and watching for devices.
     * Connect never throws directly, but communicates
     * through server-state events
     */
    connect(): Promise<void>;
    private createFolders;
    startDeviceListeners(): Promise<void>;
    on<Event extends keyof FlipperServerEvents>(event: Event, callback: (payload: FlipperServerEvents[Event]) => void): void;
    once<Event extends keyof FlipperServerEvents>(event: Event, callback: (payload: FlipperServerEvents[Event]) => void): void;
    off<Event extends keyof FlipperServerEvents>(event: Event, callback: (payload: FlipperServerEvents[Event]) => void): void;
    onAny(callback: (event: keyof FlipperServerEvents, payload: any) => void): void;
    offAny(callback: (event: keyof FlipperServerEvents, payload: any) => void): void;
    /**
     * @internal
     */
    emit<Event extends keyof FlipperServerEvents>(event: Event, payload: FlipperServerEvents[Event]): void;
    private isExecWithOptions;
    exec<Event extends keyof FlipperServerCommands>(options: FlipperServerExecOptions, event: Event, ...args: Parameters<FlipperServerCommands[Event]>): ReturnType<FlipperServerCommands[Event]>;
    exec<Event extends keyof FlipperServerCommands>(event: Event, ...args: Parameters<FlipperServerCommands[Event]>): ReturnType<FlipperServerCommands[Event]>;
    private commandHandler;
    registerDevice(device: ServerDevice): void;
    unregisterDevice(serial: string): void;
    getDevice(serial: string): ServerDevice;
    hasDevice(serial: string): boolean;
    getDeviceWithName(name: string): ServerDevice | undefined;
    getDeviceWithSerial(serial: string): ServerDevice | undefined;
    getDeviceSerials(): string[];
    getDevices(): ServerDevice[];
    private fetchDebugLogs;
    close(): Promise<void>;
}
//# sourceMappingURL=FlipperServerImpl.d.ts.map