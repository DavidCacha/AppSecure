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
exports.compareServerVersion = exports.shutdownRunningInstance = exports.checkServerRunning = exports.checkPortInUse = void 0;
const net_1 = __importDefault(require("net"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const semver_1 = __importDefault(require("semver"));
/**
 * Checks if a port is in use.
 * @param port The port to check.
 * @returns True if the port is in use. Otherwise, false.
 */
async function checkPortInUse(port) {
    return new Promise((resolve, reject) => {
        const tester = net_1.default
            .createServer()
            .once('error', function (err) {
            if (err.code != 'EADDRINUSE')
                return reject(err);
            resolve(true);
        })
            .once('listening', function () {
            tester
                .once('close', function () {
                resolve(false);
            })
                .close();
        })
            .listen(port);
    });
}
exports.checkPortInUse = checkPortInUse;
/**
 * Checks if a running Flipper server is available on the given port.
 * @param port The port to check.
 * @returns If successful, it will return the version of the running
 * Flipper server. Otherwise, undefined.
 */
async function checkServerRunning(port) {
    try {
        const response = await (0, node_fetch_1.default)(`http://localhost:${port}/info`, {
            timeout: 1000,
        });
        if (response.status >= 200 && response.status < 300) {
            const environmentInfo = await response.json();
            return environmentInfo.appVersion;
        }
        else {
            console.info('[flipper-server] Running instance found, failed with HTTP status code: ', response.status);
        }
    }
    catch (e) {
        console.info(`[flipper-server] No running instance found, error found: ${e}`);
    }
}
exports.checkServerRunning = checkServerRunning;
/**
 * Attempts to shutdown an existing Flipper server instance.
 * @param port The port of the running Flipper server
 * @returns Returns true if the shutdown was successful. Otherwise, false.
 */
async function shutdownRunningInstance(port) {
    try {
        const response = await (0, node_fetch_1.default)(`http://localhost:${port}/shutdown`, {
            timeout: 1000,
        });
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            console.info(`[flipper-server] Shutdown request acknowledge: ${json?.success}`);
            return json?.success;
        }
        else {
            console.warn('[flipper-server] Shutdown request not handled, HTTP status code: ', response.status);
        }
    }
    catch (e) {
        console.warn('[flipper-server] Shutdown request failed with error: ', e);
    }
    return false;
}
exports.shutdownRunningInstance = shutdownRunningInstance;
/**
 * Compares two versions excluding build identifiers
 * (the bit after + in the semantic version string).
 * @return 0 if v1 == v2, 1 if v1 is greater, -1 if v2 is greater.
 */
function compareServerVersion(v1, v2) {
    return semver_1.default.compare(v1, v2);
}
exports.compareServerVersion = compareServerVersion;
//# sourceMappingURL=utilities.js.map