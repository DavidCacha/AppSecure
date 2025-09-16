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
exports.NoopListener = exports.DeviceListener = exports.RESTART_CNT = void 0;
const flipper_common_1 = require("flipper-common");
const Utilities_1 = require("../app-connectivity/Utilities");
const StateMachine_1 = require("./StateMachine");
exports.RESTART_CNT = 3;
const RESTART_SLEEP = 100;
class DeviceListener {
    constructor(isDeviceConnected) {
        this.isDeviceConnected = isDeviceConnected;
        this.name = this.constructor.name;
        this._state = new StateMachine_1.StateMachine('inactive');
        this.restartCnt = exports.RESTART_CNT;
        // Reset number of retries every time we manage to start the listener
        this._state.on('active', () => {
            this.restartCnt = exports.RESTART_CNT;
        });
        this._state.on('fatal', () => {
            if (this.restartCnt <= 0) {
                return;
            }
            console.info(`${this.name} -> fatal. Listener crashed. Trying to restart.`);
            // Auto-restarting crashed listener
            this.start().catch((e) => {
                console.error(`${this.name} -> unexpected start error`, e);
            });
        });
    }
    async start() {
        if (this._state.is('active')) {
            console.debug(`${this.name}.start -> already active`);
            return;
        }
        if (this._state.is('starting')) {
            console.debug(`${this.name}.start -> already starting. Subscribed to 'active' and 'fatal' events`);
            return new Promise((resolve, reject) => {
                this._state.once(['active', 'fatal'], async () => {
                    try {
                        await this.start();
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        if (this._state.is('stopping')) {
            console.debug(`${this.name}.start -> currently stopping. Subscribed to 'inactive' and 'zombie' events`);
            return new Promise((resolve, reject) => {
                this._state.once(['inactive', 'zombie'], async () => {
                    try {
                        await this.start();
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        // State is either 'inactive' of 'zombie'. Trying to start the listener.
        console.debug(`${this.name}.start -> starting`);
        this.stopLogListener = undefined;
        this._state.set('starting');
        while (!this.stopLogListener) {
            if (!this.isDeviceConnected()) {
                this._state.set('inactive');
                return;
            }
            try {
                this.stopLogListener = await this.startListener();
                break;
            }
            catch (e) {
                if (this.restartCnt <= 0) {
                    this._state.set('fatal', e);
                    console.warn(`${this.name}.start -> failure after ${exports.RESTART_CNT} retries`, e);
                    return;
                }
                console.debug(`${this.name}.start -> error. Retrying. ${this.restartCnt} retries left.`, e);
                this.restartCnt--;
                await (0, flipper_common_1.sleep)(RESTART_SLEEP);
            }
        }
        this._state.set('active');
        console.info(`${this.name}.start -> success`);
    }
    async stop() {
        if (this._state.is(['inactive', 'fatal', 'zombie'])) {
            console.debug(`${this.name}.stop -> already stopped or crashed`);
            return;
        }
        if (this._state.is('stopping')) {
            console.debug(`${this.name}.stop -> currently stopping. Subscribed to 'inactive' and 'zombie' events`);
            return new Promise((resolve, reject) => {
                this._state.once(['inactive', 'zombie'], async () => {
                    try {
                        await this.stop();
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        if (this._state.is('starting')) {
            console.debug(`${this.name}.stop -> currently starting. Subscribed to 'active' and 'fatal' events`);
            return new Promise((resolve, reject) => {
                this._state.once(['active', 'fatal'], async () => {
                    try {
                        await this.stop();
                        resolve();
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        // State is 'active'. Trying to stop the listener.
        console.debug(`${this.name}.stop -> stopping`);
        this._state.set('stopping');
        try {
            (0, Utilities_1.assertNotNull)(this.stopLogListener);
            await this.stopLogListener();
            this._state.set('inactive');
            console.info(`${this.name}.stop -> success`);
        }
        catch (e) {
            this._state.set('zombie', e);
            console.error(`${this.name}.stop -> failure`, e);
        }
    }
    once(state, cb) {
        return this._state.once(state, cb);
    }
    on(state, cb) {
        return this._state.on(state, cb);
    }
    get state() {
        return this._state.currentState;
    }
    get error() {
        return this._state.error;
    }
}
exports.DeviceListener = DeviceListener;
class NoopListener extends DeviceListener {
    async startListener() {
        return () => { };
    }
}
exports.NoopListener = NoopListener;
//# sourceMappingURL=DeviceListener.js.map