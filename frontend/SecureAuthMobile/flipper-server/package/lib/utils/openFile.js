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
exports.openFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const open_1 = __importDefault(require("open"));
async function openFile(path) {
    if (!path) {
        return;
    }
    let fileStat;
    try {
        fileStat = await fs_extra_1.default.stat(path);
    }
    catch (err) {
        throw new Error(`Couldn't open file: ${path}: ${err}`);
    }
    // Rather randomly chosen. Some FSs still reserve 8 bytes for empty files.
    // If this doesn't reliably catch "corrupt" files, you might want to increase this.
    if (fileStat.size <= 8) {
        throw new Error(`File seems to be (almost) empty: ${path}`);
    }
    await (0, open_1.default)(path);
}
exports.openFile = openFile;
//# sourceMappingURL=openFile.js.map