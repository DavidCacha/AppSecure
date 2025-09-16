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
const ServerDevice_1 = require("../ServerDevice");
class MacDevice extends ServerDevice_1.ServerDevice {
    constructor(flipperServer) {
        super(flipperServer, {
            serial: '',
            deviceType: 'physical',
            title: 'Mac',
            os: 'MacOS',
            icon: 'app-apple',
            features: {
                screenCaptureAvailable: false,
                screenshotAvailable: false,
            },
        });
    }
}
exports.default = MacDevice;
//# sourceMappingURL=MacDevice.js.map