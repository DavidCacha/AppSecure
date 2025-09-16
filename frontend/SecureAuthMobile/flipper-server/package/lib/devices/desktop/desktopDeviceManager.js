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
const MacDevice_1 = __importDefault(require("./MacDevice"));
const WindowsDevice_1 = __importDefault(require("./WindowsDevice"));
exports.default = (flipperServer) => {
    let device;
    if (process.platform === 'darwin') {
        device = new MacDevice_1.default(flipperServer);
    }
    else if (process.platform === 'win32') {
        device = new WindowsDevice_1.default(flipperServer);
    }
    else {
        return;
    }
    flipperServer.registerDevice(device);
};
//# sourceMappingURL=desktopDeviceManager.js.map