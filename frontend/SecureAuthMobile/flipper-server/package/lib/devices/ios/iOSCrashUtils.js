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
exports.iOSCrashWatcher = exports.parsePathModern = exports.parsePathLegacy = exports.shouldShowiOSCrashNotification = exports.parseIosCrashModern = exports.parseIosCrashLegacy = void 0;
const DeviceListener_1 = require("../../utils/DeviceListener");
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
function parseIosCrashLegacy(content) {
    const regex = /Exception Type: *\w*/;
    const arr = regex.exec(content);
    const exceptionString = arr ? arr[0] : '';
    const exceptionRegex = /\w*$/;
    const tmp = exceptionRegex.exec(exceptionString);
    const exception = tmp && tmp[0].length ? tmp[0] : 'Unknown';
    const dateRegex = /Date\/Time: *[\w\s\.:-]*/;
    const dateArr = dateRegex.exec(content);
    const dateString = dateArr ? dateArr[0] : '';
    const dateRegex2 = /[\w\s\.:-]*$/;
    const tmp1 = dateRegex2.exec(dateString);
    const extractedDateString = tmp1 && tmp1[0].length ? tmp1[0] : null;
    const date = extractedDateString
        ? new Date(extractedDateString).getTime()
        : Date.now();
    const crash = {
        callstack: content,
        name: exception,
        reason: exception,
        date,
    };
    return crash;
}
exports.parseIosCrashLegacy = parseIosCrashLegacy;
function parseIosCrashModern(content) {
    const captureTimeRegex = /"captureTime".*:.*"(.*)",\n/;
    const captureTimeArr = captureTimeRegex.exec(content);
    const exceptionRegex = /"exception".*:.*{(.*)},\n/;
    const exceptionArr = exceptionRegex.exec(content);
    let exceptionJSON;
    try {
        exceptionJSON = JSON.parse(`{${exceptionArr?.[1]}}`);
    }
    catch { }
    const exception = exceptionJSON
        ? `${exceptionJSON.type} (${exceptionJSON.signal})`
        : 'Unknown';
    const crash = {
        callstack: content,
        name: exception,
        reason: exception,
        date: new Date(captureTimeArr?.[1]).getTime(),
    };
    return crash;
}
exports.parseIosCrashModern = parseIosCrashModern;
function shouldShowiOSCrashNotification(serial, content, legacy) {
    const appPath = legacy ? parsePathLegacy(content) : parsePathModern(content);
    if (!appPath || !appPath.includes(serial)) {
        // Do not show notifications for the app which
        // are not running on this device.
        return false;
    }
    return true;
}
exports.shouldShowiOSCrashNotification = shouldShowiOSCrashNotification;
function parsePathLegacy(content) {
    const regex = /(?<=.*Path: *)[^\n]*/;
    const arr = regex.exec(content);
    if (!arr || arr.length <= 0) {
        return null;
    }
    const path = arr[0];
    return path.trim();
}
exports.parsePathLegacy = parsePathLegacy;
function parsePathModern(content) {
    try {
        const regex = /"procPath".*:.*"(.*)",\n/;
        const arr = regex.exec(content);
        if (!arr || arr.length <= 1) {
            return null;
        }
        const path = arr[1];
        return path.trim();
    }
    catch (e) {
        console.warn('parsePathModern -> failed to parse crash file', e, content);
        return null;
    }
}
exports.parsePathModern = parsePathModern;
// eslint-disable-next-line @typescript-eslint/naming-convention
class iOSCrashWatcher extends DeviceListener_1.DeviceListener {
    constructor(device) {
        super(() => device.connected);
        this.device = device;
    }
    async startListener() {
        const dir = path_1.default.join(os_1.default.homedir(), 'Library', 'Logs', 'DiagnosticReports');
        if (!(await fs_extra_1.default.pathExists(dir))) {
            throw new Error('Failed to start iOS crash watcher: path does not exist');
        }
        const watcher = fs_extra_1.default.watch(dir, async (_eventType, filename) => {
            const checkFileExtensionLegacy = /.crash$/.exec(filename);
            const checkFileExtensionModern = /.ips$/.exec(filename);
            if (!filename ||
                !(checkFileExtensionLegacy || checkFileExtensionModern)) {
                return;
            }
            const filepath = path_1.default.join(dir, filename);
            const exists = await fs_extra_1.default.pathExists(filepath);
            if (!exists) {
                return;
            }
            fs_extra_1.default.readFile(filepath, 'utf8', (err, data) => {
                if (err) {
                    console.warn('Failed to read crash file', err);
                    return;
                }
                if (shouldShowiOSCrashNotification(this.device.serial, data, !!checkFileExtensionLegacy)) {
                    try {
                        this.device.flipperServer.emit('device-crash', {
                            crash: checkFileExtensionLegacy
                                ? parseIosCrashLegacy(data)
                                : parseIosCrashModern(data),
                            serial: this.device.serial,
                        });
                    }
                    catch (e) {
                        console.error('iOSCrashWatcher.startListener -> failed to parse crash file', e, data);
                    }
                }
            });
        });
        watcher.on('error', (e) => {
            console.error('iOS crash watcher error', e);
        });
        return () => watcher.close();
    }
}
exports.iOSCrashWatcher = iOSCrashWatcher;
//# sourceMappingURL=iOSCrashUtils.js.map