/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperDoctor } from 'flipper-common';
export declare function getHealthChecks(options: FlipperDoctor.HealthcheckSettings): Promise<FlipperDoctor.Healthchecks>;
export declare function runHealthcheck(options: FlipperDoctor.HealthcheckSettings, categoryName: keyof FlipperDoctor.Healthchecks, ruleName: string): Promise<FlipperDoctor.HealthcheckResult>;
//# sourceMappingURL=runHealthchecks.d.ts.map