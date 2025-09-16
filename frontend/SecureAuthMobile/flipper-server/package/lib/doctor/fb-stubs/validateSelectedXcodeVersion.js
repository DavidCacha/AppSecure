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
exports.validateSelectedXcodeVersion = void 0;
async function validateSelectedXcodeVersion(_selectedPath, _availableXcode, _subchecks) {
    return {
        hasProblem: false,
        message: ['ios.xcode-select--noop'],
    };
}
exports.validateSelectedXcodeVersion = validateSelectedXcodeVersion;
//# sourceMappingURL=validateSelectedXcodeVersion.js.map