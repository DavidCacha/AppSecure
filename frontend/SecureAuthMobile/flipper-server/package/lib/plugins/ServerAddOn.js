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
exports.ServerAddOn = void 0;
const assert_1 = __importDefault(require("assert"));
const Utilities_1 = require("../app-connectivity/Utilities");
const ServerAddOnDesktopToModuleConnection_1 = require("./ServerAddOnDesktopToModuleConnection");
const ServerAddOnModuleToDesktopConnection_1 = require("./ServerAddOnModuleToDesktopConnection");
const loadServerAddOn_1 = require("./loadServerAddOn");
class ServerAddOn {
    constructor(pluginName, cleanup, connection, initialOwner) {
        this.pluginName = pluginName;
        this.cleanup = cleanup;
        this.connection = connection;
        this.owners = new Set([initialOwner]);
    }
    static async start(pluginName, details, initialOwner, flipperServer) {
        console.info('ServerAddOn.start', pluginName, details);
        const { default: serverAddOn } = (0, loadServerAddOn_1.loadServerAddOn)(pluginName, details);
        (0, Utilities_1.assertNotNull)(serverAddOn);
        (0, assert_1.default)(typeof serverAddOn === 'function', `ServerAddOn ${pluginName} must export "serverAddOn" function as a default export.`);
        const serverAddOnModuleToDesktopConnection = new ServerAddOnModuleToDesktopConnection_1.ServerAddOnModuleToDesktopConnection(pluginName);
        const cleanup = await serverAddOn(serverAddOnModuleToDesktopConnection, {
            flipperServer,
        });
        (0, assert_1.default)(typeof cleanup === 'function', `ServerAddOn ${pluginName} must return a clean up function, instead it returned ${typeof cleanup}.`);
        const desktopToModuleConnection = new ServerAddOnDesktopToModuleConnection_1.ServerAddOnDesktopToModuleConnection(serverAddOnModuleToDesktopConnection, flipperServer);
        return new ServerAddOn(pluginName, cleanup, desktopToModuleConnection, initialOwner);
    }
    addOwner(owner) {
        this.owners.add(owner);
    }
    removeOwner(owner) {
        const ownerExisted = this.owners.delete(owner);
        if (!this.owners.size && ownerExisted) {
            return this.stop();
        }
    }
    async stop() {
        console.info('ServerAddOn.stop', this.pluginName);
        await this.cleanup();
    }
}
exports.ServerAddOn = ServerAddOn;
//# sourceMappingURL=ServerAddOn.js.map