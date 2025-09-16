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
exports.ServerDevice = void 0;
const DeviceListener_1 = require("../utils/DeviceListener");
class ServerDevice {
    constructor(flipperServer, info) {
        this.connected = true;
        this.logListener = new DeviceListener_1.NoopListener(() => this.connected);
        this.crashWatcher = new DeviceListener_1.NoopListener(() => this.connected);
        this.flipperServer = flipperServer;
        this.info = info;
    }
    get serial() {
        return this.info.serial;
    }
    addLogEntry(entry) {
        this.flipperServer.emit('device-log', {
            serial: this.serial,
            entry,
        });
    }
    /**
     * The device might have no active connection
     */
    disconnect() {
        this.connected = false;
        this.info.features.screenCaptureAvailable = false;
        this.info.features.screenshotAvailable = false;
        this.logListener.stop();
        this.crashWatcher.stop();
        this.flipperServer.pluginManager.stopAllServerAddOns(this.info.serial);
    }
    screenshot() {
        return Promise.reject(new Error('No screenshot support for current device'));
    }
    async startScreenCapture(_destination) {
        throw new Error('startScreenCapture not implemented');
    }
    async stopScreenCapture() {
        throw new Error('stopScreenCapture not implemented');
    }
    async executeShell(_command) {
        throw new Error('executeShell not implemented');
    }
    async forwardPort(_local, _remote) {
        throw new Error('forwardPort not implemented');
    }
    async clearLogs() { }
    async navigateToLocation(_location) {
        throw new Error('navigateLocation not implemented');
    }
    async installApp(_appBundlePath) {
        throw new Error('installApp not implemented');
    }
    async openApp(_name) {
        throw new Error('openApp not implemented');
    }
}
exports.ServerDevice = ServerDevice;
//# sourceMappingURL=ServerDevice.js.map