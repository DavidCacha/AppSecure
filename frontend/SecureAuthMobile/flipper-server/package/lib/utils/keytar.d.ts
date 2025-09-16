/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
export declare const SERVICE_FLIPPER = "flipper.oAuthToken";
export type KeytarModule = {
    getPassword(service: string, username: string): Promise<string>;
    deletePassword(service: string, username: string): Promise<void>;
    setPassword(service: string, username: string, password: string): Promise<void>;
};
export declare class KeytarManager {
    private keytar;
    private memoryFallback;
    constructor(keytar: KeytarModule | undefined);
    writeKeychain(service: string, password: string): Promise<void>;
    unsetKeychain(service: string): Promise<void>;
    retrieveToken(service: string): Promise<string>;
}
//# sourceMappingURL=keytar.d.ts.map