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
exports.iOSLogListener = void 0;
const stream_1 = require("stream");
const DeviceListener_1 = require("../../utils/DeviceListener");
const IOSBridge_1 = require("./IOSBridge");
const JSONStream_1 = __importDefault(require("JSONStream"));
const split2_1 = __importDefault(require("split2"));
// Used to strip the initial output of the logging utility where it prints out settings.
// We know the log stream is json so it starts with an open brace.
class StripLogPrefix extends stream_1.Transform {
    constructor() {
        super(...arguments);
        this.passedPrefix = false;
    }
    _transform(data, _encoding, callback) {
        if (this.passedPrefix) {
            this.push(data);
        }
        else {
            const dataString = data.toString();
            const index = dataString.indexOf('[');
            if (index >= 0) {
                this.push(dataString.substring(index));
                this.passedPrefix = true;
            }
        }
        callback();
    }
}
// https://regex101.com/r/rrl03T/1
// Mar 25 17:06:38 iPhone symptomsd(SymptomEvaluator)[125] <Notice>: Stuff
const logRegex = /(^.{15}) ([^ ]+?) ([^\[]+?)\[(\d+?)\] <(\w+?)>: (.*)$/s;
// eslint-disable-next-line @typescript-eslint/naming-convention
class iOSLogListener extends DeviceListener_1.DeviceListener {
    constructor(isDeviceConnected, onNewLogEntry, iOSBridge, serial, deviceType) {
        super(isDeviceConnected);
        this.onNewLogEntry = onNewLogEntry;
        this.iOSBridge = iOSBridge;
        this.serial = serial;
        this.deviceType = deviceType;
    }
    async startListener() {
        let log;
        try {
            log = this.iOSBridge.startLogListener(this.serial, this.deviceType);
        }
        catch (e) {
            if (e.message === IOSBridge_1.ERR_PHYSICAL_DEVICE_LOGS_WITHOUT_IDB) {
                console.warn(e);
                return () => { };
            }
            else {
                throw e;
            }
        }
        log.on('error', (err) => {
            console.error('iOS log tailer error', err);
            this._state.set('fatal', err);
        });
        // TODO: Do we need it?
        log.stderr.on('data', (data) => {
            console.warn('iOS log tailer stderr: ', data.toString());
        });
        if (this.deviceType === 'physical') {
            log.stdout.pipe((0, split2_1.default)('\0')).on('data', (line) => {
                const parsed = iOSLogListener.parseLogLine(line);
                if (parsed) {
                    this.onNewLogEntry(parsed);
                }
                else {
                    console.warn('Failed to parse iOS log line: ', line);
                }
            });
        }
        else {
            log.stdout
                .pipe(new StripLogPrefix())
                .pipe(JSONStream_1.default.parse('*'))
                .on('data', (data) => {
                const entry = iOSLogListener.parseJsonLogEntry(data);
                this.onNewLogEntry(entry);
            });
        }
        return () => {
            log.kill();
        };
    }
    static parseJsonLogEntry(entry) {
        let type = iOSLogListener.getLogLevel(entry.messageType);
        // when Apple log levels are not used, log messages can be prefixed with
        // their loglevel.
        if (entry.eventMessage.startsWith('[debug]')) {
            type = 'debug';
        }
        else if (entry.eventMessage.startsWith('[info]')) {
            type = 'info';
        }
        else if (entry.eventMessage.startsWith('[warn]')) {
            type = 'warn';
        }
        else if (entry.eventMessage.startsWith('[error]')) {
            type = 'error';
        }
        // remove type from mesage
        entry.eventMessage = entry.eventMessage.replace(/^\[(debug|info|warn|error)\]/, '');
        const tag = entry.processImagePath.split('/').pop() || '';
        return {
            date: new Date(entry.timestamp),
            pid: entry.processID,
            tid: entry.threadID,
            tag,
            message: entry.eventMessage,
            type,
        };
    }
    static getLogLevel(level) {
        switch (level) {
            case 'Default':
                return 'debug';
            case 'Info':
                return 'info';
            case 'Debug':
                return 'debug';
            case 'Error':
                return 'error';
            case 'Notice':
                return 'verbose';
            case 'Fault':
                return 'fatal';
            default:
                return 'unknown';
        }
    }
    static parseLogLine(line) {
        const matches = line.match(logRegex);
        if (matches) {
            return {
                date: new Date(Date.parse(matches[1])),
                tag: matches[3],
                tid: 0,
                pid: parseInt(matches[4], 10),
                type: iOSLogListener.getLogLevel(matches[5]),
                message: matches[6],
            };
        }
        return undefined;
    }
}
exports.iOSLogListener = iOSLogListener;
//# sourceMappingURL=iOSLogListener.js.map