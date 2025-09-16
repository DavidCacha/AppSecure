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
exports.runHealthcheck = exports.getHealthChecks = void 0;
const doctor_1 = require("../doctor");
const immer_1 = __importDefault(require("immer"));
async function getHealthChecks(options) {
    return (0, immer_1.default)((0, doctor_1.getHealthchecks)(options.isProduction), (healthchecks) => {
        if (!options.settings.enableAndroid) {
            healthchecks.android = {
                label: healthchecks.android.label,
                isSkipped: true,
                skipReason: 'Healthcheck is skipped, because "Android Development" option is disabled in the Flipper settings',
            };
        }
        if (!options.settings.enableIOS) {
            healthchecks.ios = {
                label: healthchecks.ios.label,
                isSkipped: true,
                skipReason: 'Healthcheck is skipped, because "iOS Development" option is disabled in the Flipper settings',
            };
        }
        Object.keys(healthchecks).forEach((cat) => {
            const category = healthchecks[cat];
            if ('healthchecks' in category) {
                category.healthchecks.forEach((h) => {
                    delete h.run;
                });
            }
        });
    });
}
exports.getHealthChecks = getHealthChecks;
async function runHealthcheck(options, categoryName, ruleName) {
    const healthchecks = (0, doctor_1.getHealthchecks)(options.isProduction);
    const category = healthchecks[categoryName];
    if (!category) {
        throw new Error(`Unknown category: ${categoryName}`);
    }
    if (!('healthchecks' in category)) {
        throw new Error(`Skipped category: ${categoryName}`);
    }
    const check = category.healthchecks.find((h) => h.key === ruleName);
    if (!check) {
        throw new Error(`Unknown healthcheck: ${ruleName}`);
    }
    const envInfoPromise = (0, doctor_1.getEnvInfo)();
    const environmentInfo = await envInfoPromise;
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const checkResult = await check.run(environmentInfo, options.settings);
    return checkResult.hasProblem && check.isRequired
        ? {
            status: 'FAILED',
            subchecks: checkResult.subchecks,
            message: checkResult.message,
        }
        : checkResult.hasProblem && !check.isRequired
            ? {
                status: 'WARNING',
                message: checkResult.message,
            }
            : {
                status: 'SUCCESS',
                message: checkResult.message,
            };
}
exports.runHealthcheck = runHealthcheck;
//# sourceMappingURL=runHealthchecks.js.map