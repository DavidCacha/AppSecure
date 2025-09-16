/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/openssl-wrapper" />
import { Action } from 'openssl-wrapper';
export declare function openssl(action: Action, options: {}): Promise<string>;
export declare function isInstalled(): Promise<boolean>;
//# sourceMappingURL=openssl-wrapper-with-promises.d.ts.map