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
exports.processExit = exports.setProcessExitRoutine = void 0;
const onBeforeExitFns = [];
const setProcessExitRoutine = (onBeforeExit) => {
    onBeforeExitFns.push(onBeforeExit);
};
exports.setProcessExitRoutine = setProcessExitRoutine;
const resIsPromise = (res) => res instanceof Promise;
const processExit = async (code) => {
    console.debug('processExit', code);
    setTimeout(() => {
        console.error('Process exit routines timed out');
        process.exit(code);
    }, 5000);
    // eslint-disable-next-line promise/catch-or-return
    await Promise.all(onBeforeExitFns.map(async (fn) => {
        try {
            const res = fn();
            if (resIsPromise(res)) {
                return res.catch((e) => {
                    console.error('Process exit routine failed', e);
                });
            }
        }
        catch (e) {
            console.error('Process exit routine failed', e);
        }
    })).finally(() => {
        process.exit(code);
    });
};
exports.processExit = processExit;
//# sourceMappingURL=processExit.js.map