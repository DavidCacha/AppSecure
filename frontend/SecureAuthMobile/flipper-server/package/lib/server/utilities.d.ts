/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/**
 * Checks if a port is in use.
 * @param port The port to check.
 * @returns True if the port is in use. Otherwise, false.
 */
export declare function checkPortInUse(port: number): Promise<boolean>;
/**
 * Checks if a running Flipper server is available on the given port.
 * @param port The port to check.
 * @returns If successful, it will return the version of the running
 * Flipper server. Otherwise, undefined.
 */
export declare function checkServerRunning(port: number): Promise<string | undefined>;
/**
 * Attempts to shutdown an existing Flipper server instance.
 * @param port The port of the running Flipper server
 * @returns Returns true if the shutdown was successful. Otherwise, false.
 */
export declare function shutdownRunningInstance(port: number): Promise<boolean>;
/**
 * Compares two versions excluding build identifiers
 * (the bit after + in the semantic version string).
 * @return 0 if v1 == v2, 1 if v1 is greater, -1 if v2 is greater.
 */
export declare function compareServerVersion(v1: string, v2: string): number;
//# sourceMappingURL=utilities.d.ts.map