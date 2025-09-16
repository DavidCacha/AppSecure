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
exports.loadServerAddOn = void 0;
const Utilities_1 = require("../app-connectivity/Utilities");
const loadServerAddOn = (pluginName, details) => {
    console.debug('loadPlugin', pluginName, details);
    (0, Utilities_1.assertNotNull)(details.path, `loadPlugin -> server add-on path is empty plugin ${pluginName}.`);
    const serverAddOnModule = require(details.path);
    return serverAddOnModule;
};
exports.loadServerAddOn = loadServerAddOn;
//# sourceMappingURL=loadServerAddOn.js.map