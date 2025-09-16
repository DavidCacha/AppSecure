/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { LauncherSettings } from 'flipper-common';
export declare function xdgConfigDir(): string;
export declare function launcherConfigDir(): string;
export declare function loadLauncherSettings(enableLauncherSettings?: boolean): Promise<LauncherSettings>;
export declare function saveLauncherSettings(settings: LauncherSettings): Promise<void>;
//# sourceMappingURL=launcherSettings.d.ts.map