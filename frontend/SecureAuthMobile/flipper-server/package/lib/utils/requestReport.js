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
const flipper_common_1 = require("flipper-common");
async function report(key, promise) {
    return new Promise((resolve, reject) => {
        promise
            .then((res) => {
            if (res.status === 200) {
                (0, flipper_common_1.logPlatformSuccessRate)(key, { kind: 'success' });
            }
            else {
                (0, flipper_common_1.logPlatformSuccessRate)(key, {
                    kind: 'failure',
                    supportedOperation: true,
                    error: `${res.status} (${res.statusText})`,
                });
            }
            resolve(res);
        })
            .catch((err) => {
            if (err instanceof flipper_common_1.CancelledPromiseError) {
                (0, flipper_common_1.logPlatformSuccessRate)(key, {
                    kind: 'cancelled',
                });
            }
            else {
                (0, flipper_common_1.logPlatformSuccessRate)(key, {
                    kind: 'failure',
                    supportedOperation: !(err instanceof flipper_common_1.UnsupportedError),
                    error: err,
                });
            }
            reject(err);
        });
    });
}
exports.default = report;
//# sourceMappingURL=requestReport.js.map