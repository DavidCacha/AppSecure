/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
export declare enum UIPreference {
    Browser = 0,
    PWA = 1
}
export declare function openUI(preference: UIPreference, port: number): Promise<void>;
//# sourceMappingURL=openUI.d.ts.map