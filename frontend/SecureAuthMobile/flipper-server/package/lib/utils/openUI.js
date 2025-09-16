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
exports.openUI = exports.UIPreference = void 0;
const open_1 = __importDefault(require("open"));
const certificate_utils_1 = require("../app-connectivity/certificate-exchange/certificate-utils");
const findInstallation_1 = require("./findInstallation");
const tracker_1 = require("../tracker");
var UIPreference;
(function (UIPreference) {
    UIPreference[UIPreference["Browser"] = 0] = "Browser";
    UIPreference[UIPreference["PWA"] = 1] = "PWA";
})(UIPreference || (exports.UIPreference = UIPreference = {}));
async function openUI(preference, port) {
    console.info('[flipper-server] Launch UI');
    const token = await (0, certificate_utils_1.getAuthToken)();
    console.info(`[flipper-server] Get authentication token: ${token?.length != 0}`);
    const openInBrowser = async () => {
        console.info('[flipper-server] Open in browser');
        const url = new URL(`http://localhost:${port}`);
        console.info(`[flipper-server] Go to: ${url.toString()}`);
        try {
            const process = await (0, open_1.default)(url.toString(), {
                app: { name: open_1.default.apps.chrome },
            });
            await new Promise((resolve, reject) => {
                process.on('spawn', resolve);
                process.on('error', reject);
            });
            tracker_1.tracker.track('server-open-ui', {
                browser: true,
                hasToken: token?.length != 0,
            });
        }
        catch (err) {
            console.error('[flipper-server] Failed to open browser', err);
        }
    };
    if (preference === UIPreference.Browser) {
        await openInBrowser();
    }
    else {
        const path = await (0, findInstallation_1.findInstallation)();
        if (path) {
            console.info('[flipper-server] Open in PWA. Location:', path);
            tracker_1.tracker.track('server-open-ui', {
                browser: false,
                hasToken: token?.length != 0,
            });
            (0, open_1.default)(path);
        }
        else {
            await openInBrowser();
        }
    }
    console.info('[flipper-server] Launch UI completed');
}
exports.openUI = openUI;
//# sourceMappingURL=openUI.js.map