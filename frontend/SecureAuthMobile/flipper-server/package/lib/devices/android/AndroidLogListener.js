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
exports.AndroidLogListener = void 0;
const adbkit_logcat_1 = require("adbkit-logcat");
const DeviceListener_1 = require("../../utils/DeviceListener");
class AndroidLogListener extends DeviceListener_1.DeviceListener {
    constructor(isDeviceConnected, onNewLogEntry, adb, serial) {
        super(isDeviceConnected);
        this.onNewLogEntry = onNewLogEntry;
        this.adb = adb;
        this.serial = serial;
    }
    async startListener() {
        const reader = await this.adb.openLogcat(this.serial, {
            clear: true,
        });
        let gracefulShutdown = false;
        let lastKnownError;
        reader
            .on('entry', (entry) => {
            let type = 'unknown';
            if (entry.priority === adbkit_logcat_1.Priority.VERBOSE) {
                type = 'verbose';
            }
            if (entry.priority === adbkit_logcat_1.Priority.DEBUG) {
                type = 'debug';
            }
            if (entry.priority === adbkit_logcat_1.Priority.INFO) {
                type = 'info';
            }
            if (entry.priority === adbkit_logcat_1.Priority.WARN) {
                type = 'warn';
            }
            if (entry.priority === adbkit_logcat_1.Priority.ERROR) {
                type = 'error';
            }
            if (entry.priority === adbkit_logcat_1.Priority.FATAL) {
                type = 'fatal';
            }
            this.onNewLogEntry({
                tag: entry.tag,
                pid: entry.pid,
                tid: entry.tid,
                message: entry.message,
                date: entry.date,
                type,
            });
        })
            .on('end', () => {
            if (!gracefulShutdown) {
                // logs didn't stop gracefully
                console.warn('Unexpected shutdown of adb logcat');
                this._state.set('fatal', lastKnownError ?? new Error('Unexpected shutdown of adb logcat'));
            }
        })
            .on('error', (e) => {
            console.warn('Failed to read from adb logcat: ', e);
            lastKnownError = e;
        });
        return () => {
            gracefulShutdown = true;
            reader.end();
        };
    }
}
exports.AndroidLogListener = AndroidLogListener;
//# sourceMappingURL=AndroidLogListener.js.map