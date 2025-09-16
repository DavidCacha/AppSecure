/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { Settings } from 'flipper-common';
export declare function loadSettings(settingsString?: string): Promise<Settings>;
export declare function saveSettings(settings: Settings): Promise<void>;
export declare const DEFAULT_ANDROID_SDK_PATH: Promise<string>;
//# sourceMappingURL=settings.d.ts.map