"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkXcodeVersionMismatch = exports.IOSDeviceManager = void 0;
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
const promisify_child_process_1 = require("promisify-child-process");
const iOSContainerUtility_1 = __importDefault(require("./iOSContainerUtility"));
const IOSDevice_1 = __importDefault(require("./IOSDevice"));
const IOSBridge_1 = require("./IOSBridge");
const FlipperServerConfig_1 = require("../../FlipperServerConfig");
const iOSCertificateProvider_1 = __importDefault(require("./iOSCertificateProvider"));
const exit_hook_1 = __importDefault(require("exit-hook"));
class IOSDeviceManager {
    constructor(flipperServer, idbConfig) {
        this.flipperServer = flipperServer;
        this.idbConfig = idbConfig;
        this.portForwarders = [];
        this.portforwardingClient = path_1.default.join((0, FlipperServerConfig_1.getFlipperServerConfig)().paths.staticPath, 'PortForwardingMacApp.app', 'Contents', 'MacOS', 'PortForwardingMacApp');
        this.certificateProvider = new iOSCertificateProvider_1.default(this.idbConfig);
    }
    forwardPort(port, multiplexChannelPort) {
        const child = child_process_1.default.execFile(this.portforwardingClient, [`-portForward=${port}`, `-multiplexChannelPort=${multiplexChannelPort}`], (err, stdout, stderr) => {
            if (err) {
                // This happens on app reloads and doesn't need to be treated as an error.
                console.warn('[conn] Port forwarding app failed to start', err, stdout, stderr);
            }
        });
        console.info(`[conn] Port forwarding app started (portForward: ${port}, multiplexChannelPort: ${multiplexChannelPort})`);
        child.addListener('error', (err) => console.warn('[conn] Port forwarding app error', err));
        child.addListener('exit', (code) => {
            if (code != 0) {
                console.warn(`[conn] Port forwarding app exited with code ${code}`);
            }
            else {
                console.log(`[conn] Port forwarding app exited gracefully`);
            }
        });
        (0, exit_hook_1.default)(() => {
            child.kill('SIGKILL');
        });
        return child;
    }
    startDevicePortForwarders() {
        if (this.portForwarders.length > 0) {
            // Only ever start them once.
            return;
        }
        // start port forwarding server for real device connections
        // TODO: ports should be picked up from flipperServer.config?
        this.portForwarders = [
            this.forwardPort(8089, 8079),
            this.forwardPort(8088, 8078),
            this.forwardPort(9089, 9079),
            this.forwardPort(9088, 9078),
        ];
    }
    async queryDevices(bridge) {
        const devices = await bridge.getActiveDevices(true);
        return this.processDevices(bridge, devices);
    }
    processDevices(bridge, activeDevices) {
        const currentDeviceIDs = new Set(this.flipperServer
            .getDevices()
            .filter((device) => device.info.os === 'iOS')
            .filter((device) => device.info.deviceType !== 'dummy')
            .map((device) => device.serial));
        for (const activeDevice of activeDevices) {
            const { udid, type, name } = activeDevice;
            if (currentDeviceIDs.has(udid)) {
                currentDeviceIDs.delete(udid);
            }
            else {
                console.info(`[conn] Detected new iOS device ${udid}`, activeDevice);
                const iOSDevice = new IOSDevice_1.default(this.flipperServer, bridge, udid, type, name);
                this.flipperServer.registerDevice(iOSDevice);
            }
        }
        currentDeviceIDs.forEach((id) => {
            console.info(`[conn] Could no longer find ${id}, removing...`);
            this.flipperServer.unregisterDevice(id);
        });
    }
    async getBridge() {
        if (this.ctlBridge !== undefined) {
            return this.ctlBridge;
        }
        const isDetected = await iOSContainerUtility_1.default.isXcodeDetected();
        this.ctlBridge = await (0, IOSBridge_1.makeIOSBridge)(this.idbConfig.idbPath, isDetected, this.idbConfig.enablePhysicalIOS);
        return this.ctlBridge;
    }
    async watchIOSDevices() {
        try {
            if (this.idbConfig.enablePhysicalIOS) {
                this.startDevicePortForwarders();
            }
            try {
                // Check for version mismatch now for immediate error handling.
                await this.checkXcodeVersionMismatch();
                // Awaiting the promise here to trigger immediate error handling.
                const bridge = await this.getBridge();
                await this.queryDevicesForever(bridge);
            }
            catch (err) {
                // This case is expected if both Xcode and idb are missing.
                if (err.message === IOSBridge_1.ERR_NO_IDB_OR_XCODE_AVAILABLE) {
                    console.warn('Failed to init iOS device. You may want to disable iOS support in the settings.', err);
                }
                else {
                    console.error('Failed to initialize iOS dispatcher:', err);
                }
            }
        }
        catch (err) {
            console.error('Error while querying iOS devices:', err);
        }
    }
    async getSimulators(bootedOnly) {
        try {
            const bridge = await this.getBridge();
            return await bridge.getActiveDevices(bootedOnly);
        }
        catch (e) {
            console.warn('Failed to query simulators:', e);
            if (e.message.includes('Xcode license agreements')) {
                this.flipperServer.emit('notification', {
                    type: 'error',
                    title: 'Xcode license requires approval',
                    description: 'The Xcode license agreement has changed. You need to either open Xcode and agree to the terms or run `sudo xcodebuild -license` in a Terminal to allow simulators to work with Flipper.',
                });
            }
            return [];
        }
    }
    async launchSimulator(udid) {
        try {
            const bridge = await this.getBridge();
            await bridge.launchSimulator(udid);
        }
        catch (e) {
            if (e.killed === true && e.signal === 'SIGTERM') {
                throw new Error('Failed to launch simulator: command timeout');
            }
            else {
                console.warn('Failed to launch simulator:', e);
                throw e;
            }
        }
    }
    async launchApp(udid, bundleId) {
        try {
            const bridge = await this.getBridge();
            await bridge.openApp(udid, bundleId);
        }
        catch (e) {
            console.warn('Failed to launch simulator:', e);
        }
    }
    async queryDevicesForever(bridge) {
        try {
            await this.queryDevices(bridge);
            // It's important to schedule the next check AFTER the current one has completed
            // to avoid simultaneous queries which can cause multiple user input prompts.
            setTimeout(() => this.queryDevicesForever(bridge), 3000);
        }
        catch (err) {
            console.warn('Failed to continuously query devices:', err);
        }
    }
    async checkXcodeVersionMismatch() {
        try {
            const [{ stdout: xcodeSelectStdout }, { stdout: simulatorProcessStdout }] = await Promise.all([
                (0, promisify_child_process_1.exec)('xcode-select -p'),
                (0, promisify_child_process_1.exec)("pgrep Simulator | xargs ps -o command | grep -v grep | grep Simulator.app | awk '{print $1}'"),
            ]);
            // TODO: Fix this the next time the file is edited.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const xcodeCLIVersion = xcodeSelectStdout.toString().trim();
            // TODO: Fix this the next time the file is edited.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const runningSimulatorApplications = simulatorProcessStdout
                .toString()
                .split('\n')
                .filter((application) => application.length > 0);
            const errorMessage = checkXcodeVersionMismatch(runningSimulatorApplications, xcodeCLIVersion);
            if (errorMessage === undefined) {
                return;
            }
            this.flipperServer.emit('notification', {
                type: 'error',
                title: 'Xcode version mismatch',
                description: errorMessage,
            });
        }
        catch (e) {
            // This is not an error. It depends on the user's local setup that we cannot influence.
            console.warn('Failed to determine Xcode version:', e);
        }
    }
    async idbKill() {
        if (!this.idbConfig.idbPath || this.idbConfig.idbPath.length === 0) {
            return;
        }
        const cmd = `${this.idbConfig.idbPath} kill`;
        await (0, promisify_child_process_1.exec)(cmd);
    }
}
exports.IOSDeviceManager = IOSDeviceManager;
function confirmSimulatorAppMatchesThatOfXcodeSelect(runningSimulatorApps, xcodeCLIVersion) {
    for (const runningSimulatorApp of runningSimulatorApps) {
        if (!runningSimulatorApp) {
            continue;
        }
        if (runningSimulatorApp.startsWith(xcodeCLIVersion)) {
            continue;
        }
        return `${runningSimulatorApp.split('/Contents/Developer')[0]}/Contents/Developer`;
    }
    return undefined;
}
function checkXcodeVersionMismatch(runningSimulatorApps, xcodeCLIVersion) {
    if (runningSimulatorApps.length === 0) {
        return undefined;
    }
    if (xcodeCLIVersion == '/Library/Developer/CommandLineTools') {
        return `A Simulator is running and "xcode-select" has not been used, please run "xcode-select" for the Xcode that is running the simulator at ${runningSimulatorApps}`;
    }
    const mismatchedVersion = confirmSimulatorAppMatchesThatOfXcodeSelect(runningSimulatorApps, xcodeCLIVersion);
    if (mismatchedVersion === undefined) {
        return;
    }
    return `Xcode version mismatch: Simulator is running from "${mismatchedVersion}" while Xcode CLI is "${xcodeCLIVersion}". Running "xcode-select --switch ${xcodeCLIVersion}" can fix this. For example: "sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"`;
}
exports.checkXcodeVersionMismatch = checkXcodeVersionMismatch;
//# sourceMappingURL=iOSDeviceManager.js.map