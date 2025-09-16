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
const module_1 = __importDefault(require("module"));
module_1.default.prototype.require = new Proxy(module_1.default.prototype.require, {
    apply(target, thisArg, argumentsList) {
        const name = argumentsList[0];
        if (process.env.FLIPPER_FORCE_PUBLIC_BUILD !== 'true' &&
            typeof name === 'string' &&
            name.includes('fb-stubs')) {
            const replacement = name.replace('/fb-stubs/', '/fb/');
            try {
                return Reflect.apply(target, thisArg, [
                    replacement,
                    argumentsList.slice(1),
                ]);
            }
            catch {
                return Reflect.apply(target, thisArg, argumentsList);
            }
        }
        return Reflect.apply(target, thisArg, argumentsList);
    },
});
//# sourceMappingURL=replace-fb-stubs.js.map