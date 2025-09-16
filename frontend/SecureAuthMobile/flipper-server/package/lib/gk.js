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
exports.getGatekeepers = void 0;
const GK_1 = __importDefault(require("./fb-stubs/GK"));
let loaded = false;
function getGatekeepers(username) {
    if (!loaded) {
        // this starts fetching gatekeepers, note that they will only be available on next restart!
        GK_1.default.init(username);
        loaded = true;
    }
    return GK_1.default.allGKs();
}
exports.getGatekeepers = getGatekeepers;
//# sourceMappingURL=gk.js.map