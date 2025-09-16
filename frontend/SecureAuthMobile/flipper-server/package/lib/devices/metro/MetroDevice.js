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
const util_1 = __importDefault(require("util"));
const ServerDevice_1 = require("../ServerDevice");
const metroLogLevelMapping = {
    trace: 'verbose',
    info: 'info',
    warn: 'warn',
    error: 'error',
    log: 'info',
    group: 'info',
    groupCollapsed: 'info',
    groupEnd: 'info',
    debug: 'debug',
};
function getLoglevelFromMessageType(type) {
    switch (type) {
        case 'bundle_build_done':
        case 'bundle_build_started':
        case 'initialize_done':
            return 'debug';
        case 'bundle_build_failed':
        case 'bundling_error':
        case 'global_cache_error':
        case 'hmr_client_error':
            return 'error';
        case 'bundle_transform_progressed':
            return null; // Don't show at all
        case 'client_log':
            return null; // Handled separately
        case 'dep_graph_loaded':
        case 'dep_graph_loading':
        case 'global_cache_disabled':
        default:
            return 'verbose';
    }
}
class MetroDevice extends ServerDevice_1.ServerDevice {
    constructor(flipperServer, serial, ws) {
        super(flipperServer, {
            serial,
            deviceType: 'emulator',
            title: 'React Native',
            os: 'Metro',
            icon: 'mobile',
            features: {
                screenCaptureAvailable: false,
                screenshotAvailable: false,
            },
        });
        this._handleWSMessage = ({ data }) => {
            const message = JSON.parse(data);
            if (message.type === 'client_log') {
                const type = metroLogLevelMapping[message.level] || 'unknown';
                this.addLogEntry({
                    date: new Date(),
                    pid: 0,
                    tid: 0,
                    type,
                    tag: message.type,
                    message: util_1.default.format(...message.data.map((v) => v && typeof v === 'object' ? JSON.stringify(v, null, 2) : v)),
                });
            }
            else {
                const level = getLoglevelFromMessageType(message.type);
                if (level !== null) {
                    this.addLogEntry({
                        date: new Date(),
                        pid: 0,
                        tid: 0,
                        type: level,
                        tag: message.type,
                        message: JSON.stringify(message, null, 2),
                    });
                }
            }
        };
        if (ws) {
            this.ws = ws;
            ws.onmessage = this._handleWSMessage;
        }
    }
    sendCommand(command, params) {
        if (this.ws) {
            this.ws.send(JSON.stringify({
                version: 2,
                type: 'command',
                command,
                params,
            }));
        }
        else {
            console.warn('Cannot send command, no connection', command);
        }
    }
}
exports.default = MetroDevice;
//# sourceMappingURL=MetroDevice.js.map