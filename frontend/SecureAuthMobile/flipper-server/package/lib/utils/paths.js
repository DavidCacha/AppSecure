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
exports.flipperSettingsFolder = exports.flipperDataFolder = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const xdg_basedir_1 = __importDefault(require("xdg-basedir"));
exports.flipperDataFolder = path_1.default.resolve(os_1.default.homedir(), '.flipper');
exports.flipperSettingsFolder = path_1.default.resolve(...(xdg_basedir_1.default.config ? [xdg_basedir_1.default.config] : [os_1.default.homedir(), '.config']), 'flipper');
//# sourceMappingURL=paths.js.map