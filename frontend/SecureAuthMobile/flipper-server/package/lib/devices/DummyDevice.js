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
const ServerDevice_1 = require("./ServerDevice");
/**
 * Use this device when you do not have the actual uuid of the device.
 * For example, it is currently used in the case when, we do certificate
 * exchange through WWW mode.
 *
 * In this mode we do not know the device id of the app and we
 * generate a fake one.
 */
class DummyDevice extends ServerDevice_1.ServerDevice {
    constructor(flipperServer, serial, title, os) {
        super(flipperServer, {
            serial,
            deviceType: 'dummy',
            title,
            os,
            features: {
                screenCaptureAvailable: false,
                screenshotAvailable: false,
            },
        });
    }
}
exports.default = DummyDevice;
//# sourceMappingURL=DummyDevice.js.map