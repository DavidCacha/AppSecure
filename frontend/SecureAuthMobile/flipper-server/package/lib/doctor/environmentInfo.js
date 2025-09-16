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
exports.getEnvInfo = void 0;
const envinfo_1 = require("envinfo");
async function retrieveAndParseEnvInfo() {
    return JSON.parse(await (0, envinfo_1.run)({
        SDKs: ['iOS SDK'],
        IDEs: ['Xcode'],
    }, { json: true, showNotFound: true }));
}
async function getEnvInfo() {
    return await retrieveAndParseEnvInfo();
}
exports.getEnvInfo = getEnvInfo;
//# sourceMappingURL=environmentInfo.js.map