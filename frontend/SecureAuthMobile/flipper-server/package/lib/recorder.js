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
exports.recorder = void 0;
const flipper_common_1 = require("flipper-common");
class Recorder {
    constructor() {
        this.undefinedClientQuery_ = {
            app: 'NONE',
            app_id: 'NONE',
            device: 'NONE',
            medium: 'NONE',
            os: 'Browser',
            device_id: '',
        };
        this.handler_ = {
            cmd: (payload) => {
                if (this.flipperServer_) {
                    const clientQuery = payload.context;
                    const device = clientQuery?.device ?? 'NONE';
                    const app = clientQuery?.app ?? 'NONE';
                    const medium = clientQuery?.medium ?? 'NONE';
                    const os = clientQuery?.os ?? (payload.cmd.includes('idb') ? 'iOS' : 'Android');
                    const entry = {
                        time: new Date(),
                        type: payload.success ? 'info' : 'error',
                        os,
                        device,
                        app,
                        message: payload.cmd,
                        medium,
                        cmd: payload.cmd,
                        description: payload.description,
                        success: payload.success,
                        stdout: payload.stdout,
                        stderr: payload.stderr,
                        troubleshoot: payload.troubleshoot,
                    };
                    this.flipperServer_.emit('connectivity-troubleshoot-cmd', entry);
                }
            },
        };
        this.log_ = (type, clientQuery, ...args) => {
            console.log(`[conn][${type}]`, ...args);
            if (this.flipperServer_) {
                const entry = {
                    time: new Date(),
                    type,
                    os: clientQuery.os,
                    device: clientQuery.device,
                    app: clientQuery.app,
                    message: args.join(' '),
                    medium: clientQuery.medium,
                };
                this.flipperServer_.emit('connectivity-troubleshoot-log', [entry]);
                (0, flipper_common_1.getLogger)().track('usage', 'connectivity-log', entry);
            }
        };
    }
    event(event, payload) {
        const handler = this.handler_[event];
        if (!handler) {
            return;
        }
        handler(payload);
    }
    logConnectionRecordEntries(logs) {
        if (this.flipperServer_) {
            this.flipperServer_.emit('connectivity-troubleshoot-log', logs);
            logs.forEach((entry) => (0, flipper_common_1.getLogger)().track('usage', 'connectivity-log', entry));
        }
    }
    log(clientQuery, ...args) {
        this.log_('info', clientQuery, args);
    }
    logErrorGeneric(...args) {
        this.log_('error', this.undefinedClientQuery_, args);
    }
    logError(clientQuery, ...args) {
        this.log_('error', clientQuery, args);
    }
    enable(flipperServer) {
        this.flipperServer_ = flipperServer;
    }
}
const recorder = new Recorder();
exports.recorder = recorder;
//# sourceMappingURL=recorder.js.map