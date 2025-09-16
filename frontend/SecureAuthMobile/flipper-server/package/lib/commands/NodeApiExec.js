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
exports.commandNodeApiExec = void 0;
const child_process_1 = require("child_process");
const assert_1 = __importDefault(require("assert"));
const commandNodeApiExec = async (command, options) => new Promise((resolve, reject) => (0, child_process_1.exec)(command, options, (error, stdout, stderr) => {
    (0, assert_1.default)(typeof stdout === 'string');
    (0, assert_1.default)(typeof stderr === 'string');
    if (error) {
        const wrappedError = {
            message: error.message,
            stdout,
            stderr,
            cmd: error.cmd,
            killed: error.killed,
            code: error.code,
            stack: error.stack,
        };
        reject(wrappedError);
        return;
    }
    resolve({
        stdout,
        stderr,
    });
}));
exports.commandNodeApiExec = commandNodeApiExec;
//# sourceMappingURL=NodeApiExec.js.map