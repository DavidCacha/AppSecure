/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ServerAddOn as ServerAddOnFn, ServerAddOnStartDetails } from 'flipper-common';
interface ServerAddOnModule {
    default: ServerAddOnFn<any, any>;
}
export declare const loadServerAddOn: (pluginName: string, details: ServerAddOnStartDetails) => ServerAddOnModule;
export {};
//# sourceMappingURL=loadServerAddOn.d.ts.map