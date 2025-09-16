/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
export type GKID = string;
export declare const TEST_PASSING_GK = "TEST_PASSING_GK";
export declare const TEST_FAILING_GK = "TEST_FAILING_GK";
export type GKMap = {
    [key: string]: boolean;
};
export declare function loadGKs(_username: string, _gks: Array<GKID>): Promise<GKMap>;
export declare function loadDistilleryGK(_gk: GKID): Promise<{
    [key: string]: {
        result: boolean;
    };
}>;
export default class GK {
    static init(_username: string): void;
    static get(id: GKID): boolean;
    static withWhitelistedGK(id: GKID, callback: () => Promise<void> | void): Promise<void>;
    static allGKs(): GKMap;
}
//# sourceMappingURL=GK.d.ts.map