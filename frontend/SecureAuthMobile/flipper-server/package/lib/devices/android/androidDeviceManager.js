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
exports.AndroidDeviceManager = void 0;
const AndroidDevice_1 = __importDefault(require("./AndroidDevice"));
const KaiOSDevice_1 = __importDefault(require("./KaiOSDevice"));
const child_process_1 = __importDefault(require("child_process"));
const path_1 = require("path");
const typeUtils_1 = require("../../utils/typeUtils");
const FlipperServerConfig_1 = require("../../FlipperServerConfig");
const AndroidCertificateProvider_1 = __importDefault(require("./AndroidCertificateProvider"));
class AndroidDeviceManager {
    constructor(flipperServer, adbClient) {
        this.flipperServer = flipperServer;
        this.adbClient = adbClient;
        this.certificateProvider = new AndroidCertificateProvider_1.default(this.adbClient);
    }
    createDevice(adbClient, device) {
        return new Promise(async (resolve, reject) => {
            const type = device.type !== 'device' || device.id.startsWith('emulator')
                ? 'emulator'
                : 'physical';
            try {
                const props = await adbClient.getProperties(device.id);
                try {
                    let name = props['ro.product.model'];
                    const abiString = props['ro.product.cpu.abilist'] || '';
                    const sdkVersion = props['ro.build.version.sdk'] || '';
                    const abiList = abiString.length > 0 ? abiString.split(',') : [];
                    if (type === 'emulator') {
                        name = (await this.getRunningEmulatorName(device.id)) || name;
                    }
                    const isKaiOSDevice = Object.keys(props).some((name) => name.startsWith('kaios') || name.startsWith('ro.kaios'));
                    const androidLikeDevice = new (isKaiOSDevice ? KaiOSDevice_1.default : AndroidDevice_1.default)(this.flipperServer, device.id, type, name, adbClient, abiList, sdkVersion);
                    const ports = (0, FlipperServerConfig_1.getServerPortsConfig)();
                    if (ports.serverPorts) {
                        await androidLikeDevice
                            .reverse([
                            ports.serverPorts.secure,
                            ports.serverPorts.insecure,
                            ports.altServerPorts.secure,
                            ports.altServerPorts.insecure,
                        ])
                            // We may not be able to establish a reverse connection, e.g. for old Android SDKs.
                            // This is *generally* fine, because we hard-code the ports on the SDK side.
                            .catch((e) => {
                            console.warn(`Failed to reverse-proxy ports on device ${androidLikeDevice.serial}: ${e}`);
                        });
                    }
                    if (type === 'physical') {
                        // forward port for React DevTools, which is fixed on React Native
                        await androidLikeDevice.reverse([8097]).catch((e) => {
                            console.warn(`Failed to reverse-proxy React DevTools port 8097 on ${androidLikeDevice.serial}`, e);
                        });
                    }
                    // Remote simulators connected via SSH tunnels
                    const isRemoteDevice = device.id.startsWith('localhost');
                    if (androidLikeDevice instanceof AndroidDevice_1.default &&
                        type === 'physical' &&
                        !isRemoteDevice) {
                        await androidLikeDevice.setIntoPermissiveMode();
                    }
                    // The default way of capturing screenshots through adb does not seem to work
                    // There is a way of getting a screenshot through KaiOS dev tools though
                    if (androidLikeDevice instanceof AndroidDevice_1.default) {
                        androidLikeDevice.info.features.screenCaptureAvailable =
                            await androidLikeDevice.screenRecordAvailable();
                        androidLikeDevice.info.features.screenshotAvailable =
                            await androidLikeDevice.screenShotAvailable();
                    }
                    resolve(androidLikeDevice);
                }
                catch (e) {
                    reject(e);
                }
            }
            catch (e) {
                const message = `${e.message ?? e}`;
                if (message.includes('device still connecting') ||
                    message.includes('device still authorizing')) {
                    console.log(`[conn] Device still connecting: ${device.id}`);
                }
                else {
                    const isAuthorizationError = message.includes('device unauthorized');
                    if (!isAuthorizationError) {
                        console.warn('Failed to connect to android device', e);
                    }
                    this.flipperServer.emit('notification', {
                        type: 'error',
                        title: `Could not connect to ${device.id}`,
                        description: isAuthorizationError
                            ? 'Make sure to authorize debugging on the phone'
                            : `Failed to setup connection: ${message}`,
                    });
                }
                resolve(undefined); // not ready yet, we will find it in the next tick
            }
        });
    }
    getEmulatorPath() {
        return (0, path_1.join)(this.flipperServer.config.settings.androidHome, 'emulator', 'emulator');
    }
    async getAndroidEmulators() {
        const emulatorPath = this.getEmulatorPath();
        return new Promise((resolve) => {
            child_process_1.default.execFile(emulatorPath, ['-list-avds'], (error, data) => {
                if (error != null || data == null) {
                    console.warn('List AVD failed: ', error);
                    resolve([]);
                    return;
                }
                const devices = data
                    .split(/\r?\n/)
                    .filter(typeUtils_1.notNull)
                    .filter((l) => l !== '');
                resolve(devices);
            });
        });
    }
    async getRunningEmulatorName(id) {
        return new Promise((resolve, reject) => {
            const port = id.replace('emulator-', '');
            // The GNU version of netcat doesn't terminate after 1s when
            // specifying `-w 1`, so we kill it after a timeout. Because
            // of that, even in case of an error, there may still be
            // relevant data for us to parse.
            child_process_1.default.exec(`echo "avd name" | nc -w 1 localhost ${port}`, { timeout: 1000, encoding: 'utf-8' }, (error, data) => {
                if (data != null && typeof data === 'string') {
                    const match = data.trim().match(/(.*)\r\nOK$/);
                    resolve(match != null && match.length > 0 ? match[1] : null);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    async watchAndroidDevices(initialRun = false) {
        if (initialRun) {
            try {
                const devices = await this.adbClient.listDevices();
                for (const device of devices) {
                    if (device.type !== 'offline') {
                        this.registerDevice(this.adbClient, device);
                    }
                    else {
                        this.handleOfflineDevice(device);
                    }
                }
            }
            catch (e) {
                console.warn(`Failed to populate the initial list of android devices: ${e.message}`);
            }
        }
        try {
            this.adbClient
                .trackDevices()
                .then((tracker) => {
                tracker.on('error', (err) => {
                    if (err.message === 'Connection closed') {
                        console.warn('adb server was shutdown');
                        this.flipperServer
                            .getDevices()
                            .filter((d) => d instanceof AndroidDevice_1.default)
                            .forEach((d) => {
                            this.flipperServer.unregisterDevice(d.serial);
                        });
                        setTimeout(() => {
                            this.watchAndroidDevices();
                        }, 500);
                    }
                    else {
                        throw err;
                    }
                });
                tracker.on('add', async (device) => {
                    // Check if we have already registered this device during the `initialRun`
                    if (this.flipperServer.hasDevice(device.id)) {
                        console.debug(`[conn] Trying to add an existing Android device ${device.id}. Skipping.`);
                        return;
                    }
                    if (device.type !== 'offline') {
                        this.registerDevice(this.adbClient, device);
                    }
                    else {
                        this.handleOfflineDevice(device);
                    }
                });
                tracker.on('change', async (device) => {
                    if (device.type === 'offline') {
                        this.flipperServer.unregisterDevice(device.id);
                    }
                    else {
                        this.registerDevice(this.adbClient, device);
                    }
                });
                tracker.on('remove', (device) => {
                    this.flipperServer.unregisterDevice(device.id);
                });
            })
                .catch((err) => {
                if (err.code === 'ECONNREFUSED') {
                    console.warn('adb server not running');
                }
                else {
                    throw err;
                }
            });
        }
        catch (e) {
            console.warn(`Failed to watch for android devices: ${e.message}`);
        }
    }
    async adbKill() {
        await this.adbClient.kill();
    }
    handleOfflineDevice(device) {
        console.warn(`[conn] Found device ${device.id}, but it has status offline. If this concerns an emulator and the problem persists, try these potential solutions: https://stackoverflow.com/a/21330228/1983583, https://stackoverflow.com/a/56053223/1983583`);
    }
    async registerDevice(adbClient, deviceData) {
        const androidDevice = await this.createDevice(adbClient, deviceData);
        if (!androidDevice) {
            return;
        }
        this.flipperServer.registerDevice(androidDevice);
    }
}
exports.AndroidDeviceManager = AndroidDeviceManager;
//# sourceMappingURL=androidDeviceManager.js.map