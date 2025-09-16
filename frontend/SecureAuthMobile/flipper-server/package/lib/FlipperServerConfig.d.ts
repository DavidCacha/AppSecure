/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServerConfig } from 'flipper-common';
export declare function getFlipperServerConfig(): FlipperServerConfig;
export declare function setFlipperServerConfig(config: FlipperServerConfig | undefined): void;
type ServerPorts = {
    insecure: number;
    secure: number;
};
export declare function getServerPortsConfig(): {
    serverPorts: ServerPorts;
    altServerPorts: ServerPorts;
    browserPort: number;
};
export {};
//# sourceMappingURL=FlipperServerConfig.d.ts.map