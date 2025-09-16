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
exports.getServerPortsConfig = exports.setFlipperServerConfig = exports.getFlipperServerConfig = void 0;
const environmentVariables_1 = require("./utils/environmentVariables");
let currentConfig = undefined;
// just an ugly utility to not need a reference to FlipperServerImpl itself everywhere
function getFlipperServerConfig() {
    if (!currentConfig) {
        throw new Error('FlipperServerConfig has not been set');
    }
    return currentConfig;
}
exports.getFlipperServerConfig = getFlipperServerConfig;
function setFlipperServerConfig(config) {
    currentConfig = config;
}
exports.setFlipperServerConfig = setFlipperServerConfig;
function getServerPortsConfig() {
    let portOverrides;
    if (process.env.FLIPPER_PORTS) {
        portOverrides = (0, environmentVariables_1.parseFlipperPorts)(process.env.FLIPPER_PORTS);
        if (!portOverrides) {
            console.error(`Ignoring malformed FLIPPER_PORTS env variable:
          "${process.env.FLIPPER_PORTS || ''}".
          Example expected format: "1111,2222".`);
        }
    }
    let portAltOverrides;
    if (process.env.FLIPPER_ALT_PORTS) {
        portAltOverrides = (0, environmentVariables_1.parseFlipperPorts)(process.env.FLIPPER_ALT_PORTS);
        if (!portAltOverrides) {
            console.error(`Ignoring malformed FLIPPER_ALT_PORTS env variable:
          "${process.env.FLIPPER_ALT_PORTS || ''}".
          Example expected format: "1111,2222".`);
        }
    }
    let portBrowserOverride;
    if (process.env.FLIPPER_BROWSER_PORT) {
        portBrowserOverride = (0, environmentVariables_1.parseEnvironmentVariableAsNumber)('FLIPPER_BROWSER_PORT');
        if (!portBrowserOverride) {
            console.error(`Ignoring malformed FLIPPER_BROWSER_PORT env variable:
          "${process.env.FLIPPER_BROWSER_PORT || ''}".
          Example expected format: "1111".`);
        }
    }
    return {
        serverPorts: portOverrides ?? {
            insecure: 8089,
            secure: 8088,
        },
        altServerPorts: portAltOverrides ?? {
            insecure: 9089,
            secure: 9088,
        },
        browserPort: portBrowserOverride ?? 8333,
    };
}
exports.getServerPortsConfig = getServerPortsConfig;
//# sourceMappingURL=FlipperServerConfig.js.map