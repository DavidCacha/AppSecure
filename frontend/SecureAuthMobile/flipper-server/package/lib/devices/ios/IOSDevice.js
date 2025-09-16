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
const flipper_common_1 = require("flipper-common");
const ServerDevice_1 = require("../ServerDevice");
const iOSCrashUtils_1 = require("./iOSCrashUtils");
const iOSLogListener_1 = require("./iOSLogListener");
const tmp_1 = __importDefault(require("tmp"));
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const tmpDir = (0, util_1.promisify)(tmp_1.default.dir);
class IOSDevice extends ServerDevice_1.ServerDevice {
    constructor(flipperServer, iOSBridge, serial, deviceType, title) {
        super(flipperServer, {
            serial,
            deviceType,
            title,
            os: 'iOS',
            icon: 'mobile',
            features: {
                screenCaptureAvailable: true,
                screenshotAvailable: true,
            },
        });
        this.iOSBridge = iOSBridge;
        this.logListener = new iOSLogListener_1.iOSLogListener(() => this.connected, (logEntry) => this.addLogEntry(logEntry), this.iOSBridge, this.serial, this.info.deviceType);
        // It is OK not to await the start of the log listener.
        // We just spawn it and handle errors internally.
        this.logListener
            .start()
            .catch((e) => console.error('IOSDevice.logListener.start -> unexpected error', e));
        this.crashWatcher = new iOSCrashUtils_1.iOSCrashWatcher(this);
        // It is OK not to await the start of the crash watcher.
        // We just spawn it and handle errors internally.
        this.crashWatcher
            .start()
            .catch((e) => console.error('IOSDevice.crashWatcher.start -> unexpected error', e));
    }
    async screenshot() {
        if (!this.connected) {
            return Buffer.from([]);
        }
        return await this.iOSBridge.screenshot(this.serial);
    }
    async navigateToLocation(location) {
        return this.iOSBridge.navigate(this.serial, location).catch((err) => {
            console.warn(`Failed to navigate to location ${location}:`, err);
            return err;
        });
    }
    async startScreenCapture(destination) {
        const recording = this.recording;
        if (recording) {
            throw new Error(`There is already an active recording at ${recording.destination}`);
        }
        const process = this.iOSBridge.recordVideo(this.serial, destination);
        this.recording = { process, destination };
    }
    async stopScreenCapture() {
        const recording = this.recording;
        if (!recording) {
            throw new Error('No recording in progress');
        }
        const prom = new Promise((resolve, _reject) => {
            recording.process.on('exit', async (_code, _signal) => {
                resolve();
            });
            recording.process.kill('SIGINT');
        });
        const output = await (0, flipper_common_1.timeout)(5000, prom, 'Timed out to stop a screen capture.')
            .then(() => {
            this.recording = undefined;
            return recording.destination;
        })
            .catch((e) => {
            this.recording = undefined;
            console.warn('Failed to terminate iOS screen recording:', e);
            throw e;
        });
        return output;
    }
    async installApp(ipaPath) {
        return this.iOSBridge.installApp(this.serial, ipaPath, this.flipperServer.config.paths.tempPath);
    }
    async openApp(name) {
        return this.iOSBridge.openApp(this.serial, name);
    }
    async readFlipperFolderForAllApps() {
        console.debug('IOSDevice.readFlipperFolderForAllApps', this.info.serial);
        const installedApps = await this.iOSBridge.getInstalledApps(this.info.serial);
        const userApps = installedApps.filter(({ installType }) => installType === 'user' || installType === 'user_development');
        console.debug('IOSDevice.readFlipperFolderForAllApps -> found apps', this.info.serial, userApps);
        const appsCommandsResults = await Promise.all(userApps.map(async (userApp) => {
            let sonarDirFileNames;
            try {
                sonarDirFileNames = await this.iOSBridge.ls(this.info.serial, userApp.bundleID, '/Library/Application Support/sonar');
            }
            catch (e) {
                console.debug('IOSDevice.readFlipperFolderForAllApps -> ignoring app as it does not have sonar dir', this.info.serial, userApp.bundleID);
                return;
            }
            const dir = await tmpDir({ unsafeCleanup: true });
            const sonarDirContent = await Promise.all(sonarDirFileNames.map(async (fileName) => {
                const filePath = `/Library/Application Support/sonar/${fileName}`;
                if (fileName.endsWith('pem')) {
                    return {
                        path: filePath,
                        data: '===SECURE_CONTENT===',
                    };
                }
                try {
                    // See iOSCertificateProvider to learn why we need 2 pulls
                    try {
                        await this.iOSBridge.pull(this.info.serial, filePath, userApp.bundleID, dir);
                    }
                    catch (e) {
                        console.debug('IOSDevice.readFlipperFolderForAllApps -> Original idb pull failed. Most likely it is a physical device that requires us to handle the dest path dirrently. Forcing a re-try with the updated dest path. See D32106952 for details. Original error:', this.info.serial, userApp.bundleID, fileName, filePath, e);
                        await this.iOSBridge.pull(this.info.serial, filePath, userApp.bundleID, path_1.default.join(dir, fileName));
                        console.debug('IOSDevice.readFlipperFolderForAllApps -> Subsequent idb pull succeeded. Nevermind previous warnings.', this.info.serial, userApp.bundleID, fileName, filePath);
                    }
                    return {
                        path: filePath,
                        data: await (0, promises_1.readFile)(path_1.default.join(dir, fileName), {
                            encoding: 'utf-8',
                        }),
                    };
                }
                catch (e) {
                    return {
                        path: filePath,
                        data: `Couldn't pull the file: ${e}`,
                    };
                }
            }));
            return {
                serial: this.info.serial,
                appId: userApp.bundleID,
                data: [
                    {
                        command: 'iOSBridge.ls /Library/Application Support/sonar',
                        result: sonarDirFileNames.join('\n'),
                    },
                    ...sonarDirContent,
                ],
            };
        }));
        return (appsCommandsResults
            // Filter out apps without Flipper integration
            .filter((res) => !!res));
    }
    disconnect() {
        if (this.recording) {
            this.stopScreenCapture();
        }
        super.disconnect();
    }
}
exports.default = IOSDevice;
//# sourceMappingURL=IOSDevice.js.map