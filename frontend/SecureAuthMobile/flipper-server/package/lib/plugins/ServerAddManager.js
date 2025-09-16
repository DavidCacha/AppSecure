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
exports.ServerAddOnManager = void 0;
const Utilities_1 = require("../app-connectivity/Utilities");
const StateMachine_1 = require("../utils/StateMachine");
const ServerAddOn_1 = require("./ServerAddOn");
class ServerAddOnManager {
    constructor(pluginName, details, initialOwner, flipperServer) {
        this.pluginName = pluginName;
        this.state = new StateMachine_1.StateMachine('inactive');
        this.startServerAddOn(details, initialOwner, flipperServer);
    }
    sendExpectResponse(message) {
        if (!this.state.is('active')) {
            console.info('StateAddOnManager.sendExpectResponse -> error: server add-on is not active, Current state:', this.state.currentState);
            throw new Error('StateAddOnManager.sendExpectResponse -> error: server add-on is not active');
        }
        (0, Utilities_1.assertNotNull)(this._serverAddOn, 'StateAddOnManager.sendExpectResponse -> _serverAddOn is undefined');
        return this._serverAddOn.connection.sendExpectResponse(message);
    }
    async addOwner(owner) {
        if (this.state.is('starting')) {
            await this.state.wait(['active', 'fatal']);
        }
        if (!this.state.is('active')) {
            console.info('StateAddOnManager.addOwner -> error: server add-on is not active, Current state:', this.state.currentState);
            throw new Error('StateAddOnManager.addOwner -> error: server add-on is not active');
        }
        (0, Utilities_1.assertNotNull)(this._serverAddOn, 'StateAddOnManager.addOwner -> _serverAddOn is undefined');
        this._serverAddOn.addOwner(owner);
    }
    async removeOwner(owner) {
        if (this.state.is(['stopping', 'inactive'])) {
            return this.state.wait(['zombie', 'inactive']);
        }
        if (this.state.is('starting')) {
            await this.state.wait(['active', 'fatal']);
        }
        if (!this.state.is('active')) {
            console.debug('StateAddOnManager.removeOwner -> error: server add-on failed to start, Current state:', this.state.currentState);
            return;
        }
        (0, Utilities_1.assertNotNull)(this._serverAddOn, 'StateAddOnManager.addOwner -> _serverAddOn is undefined');
        const stopping = this._serverAddOn.removeOwner(owner);
        if (stopping) {
            this.state.set('stopping');
            try {
                await stopping;
                this.state.set('inactive');
            }
            catch (e) {
                this.state.set('zombie');
                console.error('ServerAddOnManager.removeOwner -> server add-on failed to clean up', this.pluginName, e);
                throw e;
            }
        }
    }
    async startServerAddOn(details, initialOwner, flipperServer) {
        try {
            this.state.set('starting');
            this._serverAddOn = await ServerAddOn_1.ServerAddOn.start(this.pluginName, details, initialOwner, flipperServer);
            this.state.set('active');
        }
        catch (e) {
            this.state.set('fatal', e);
            console.error('StateAddOnManager.startServerAddOn -> error', this.pluginName, details, initialOwner, e);
        }
    }
}
exports.ServerAddOnManager = ServerAddOnManager;
//# sourceMappingURL=ServerAddManager.js.map