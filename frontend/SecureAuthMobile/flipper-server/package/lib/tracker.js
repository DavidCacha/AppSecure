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
exports.tracker = void 0;
const flipper_common_1 = require("flipper-common");
class ServerCoreTracker {
    track(event, payload) {
        (0, flipper_common_1.getLogger)().track('usage', event, payload);
    }
}
exports.tracker = new ServerCoreTracker();
//# sourceMappingURL=tracker.js.map