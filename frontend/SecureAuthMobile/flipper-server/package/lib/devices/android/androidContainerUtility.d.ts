/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/adbkit" />
import { ClientQuery } from 'flipper-common';
import { Client } from 'adbkit';
export type AppName = string;
export type Command = string;
export type FilePath = string;
export type FileContent = string;
export declare function push(adbClient: Client, deviceId: string, app: string, filepath: string, contents: string, clientQuery?: ClientQuery): Promise<void>;
export declare function pull(adbClient: Client, deviceId: string, app: string, path: string, clientQuery?: ClientQuery): Promise<string>;
export declare function executeCommandAsApp(adbClient: Client, deviceId: string, app: string, command: string): Promise<string>;
//# sourceMappingURL=androidContainerUtility.d.ts.map