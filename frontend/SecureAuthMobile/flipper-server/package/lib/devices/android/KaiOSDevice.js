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
const AndroidDevice_1 = __importDefault(require("./AndroidDevice"));
class KaiOSDevice extends AndroidDevice_1.default {
    constructor(flipperServer, serial, deviceType, title, adb, abiList, sdkVersion) {
        super(flipperServer, serial, deviceType, title, adb, abiList, sdkVersion, [
            'KaiOS',
        ]);
    }
}
exports.default = KaiOSDevice;
//# sourceMappingURL=KaiOSDevice.js.map