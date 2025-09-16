"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidCrashWatcher = exports.shouldParseAndroidLog = exports.parseAndroidCrash = void 0;
const DeviceListener_1 = require("../../utils/DeviceListener");
function parseAndroidCrash(content, logDate) {
    const regForName = /.*\n/;
    const nameRegArr = regForName.exec(content);
    let name = nameRegArr ? nameRegArr[0] : 'Unknown';
    const regForCallStack = /\tat[\w\s\n\.$&+,:;=?@#|'<>.^*()%!-]*$/;
    const callStackArray = regForCallStack.exec(content);
    const callStack = callStackArray ? callStackArray[0] : '';
    let remainingString = callStack.length > 0 ? content.replace(callStack, '') : '';
    if (remainingString[remainingString.length - 1] === '\n') {
        remainingString = remainingString.slice(0, -1);
    }
    const reasonText = remainingString.length > 0 ? remainingString.split('\n').pop() : 'Unknown';
    const reason = reasonText ? reasonText : 'Unknown';
    if (name[name.length - 1] === '\n') {
        name = name.slice(0, -1);
    }
    const crash = {
        callstack: content,
        name,
        reason,
        date: logDate?.getTime(),
    };
    return crash;
}
exports.parseAndroidCrash = parseAndroidCrash;
function shouldParseAndroidLog(entry, date) {
    return (entry.date.getTime() - date.getTime() > 0 && // The log should have arrived after the device has been registered
        ((entry.type === 'error' && entry.tag === 'AndroidRuntime') ||
            entry.type === 'fatal'));
}
exports.shouldParseAndroidLog = shouldParseAndroidLog;
class AndroidCrashWatcher extends DeviceListener_1.DeviceListener {
    constructor(device) {
        super(() => device.connected);
        this.device = device;
    }
    async startListener() {
        const referenceDate = new Date();
        let androidLog = '';
        let androidLogUnderProcess = false;
        let timer = null;
        // Wait for the start of the log listener
        await new Promise((resolve, reject) => {
            const unsubscribeFatal = this.device.logListener.once('fatal', () => {
                reject(this.device.logListener.error ??
                    new Error('Unknown log listener error'));
            });
            this.device.logListener.once('active', () => {
                unsubscribeFatal();
                resolve();
            });
        });
        const onDeviceLog = ({ entry, serial, }) => {
            if (serial === this.device.serial &&
                shouldParseAndroidLog(entry, referenceDate)) {
                if (androidLogUnderProcess) {
                    androidLog += `\n${entry.message}`;
                    androidLog = androidLog.trim();
                    if (timer) {
                        clearTimeout(timer);
                    }
                }
                else {
                    androidLog = entry.message;
                    androidLogUnderProcess = true;
                }
                timer = setTimeout(() => {
                    if (androidLog.length > 0) {
                        this.device.flipperServer.emit('device-crash', {
                            crash: parseAndroidCrash(androidLog, entry.date),
                            serial: this.device.serial,
                        });
                    }
                    androidLogUnderProcess = false;
                    androidLog = '';
                }, 50);
            }
        };
        this.device.flipperServer.on('device-log', onDeviceLog);
        this.device.logListener.on('fatal', () => console.warn('AndroidCrashWatcher -> log listener failed. Crash listener is not functional until log listener restarts.'));
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            this.device.flipperServer.off('device-log', onDeviceLog);
        };
    }
}
exports.AndroidCrashWatcher = AndroidCrashWatcher;
//# sourceMappingURL=AndroidCrashUtils.js.map