/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { FlipperServerType, EnvironmentInfo } from 'flipper-common';
import { KeytarModule } from '../utils/keytar';
import { FlipperServerImpl } from '../FlipperServerImpl';
/**
 * Creates an instance of FlipperServer (FlipperServerImpl). This is the
 * server used by clients to connect to.
 * @param rootPath Application path.
 * @param staticPath Static assets path.
 * @param settingsString Optional settings used to override defaults.
 * @param enableLauncherSettings Optional launcher settings used to override defaults.
 * @returns
 */
export declare function startFlipperServer(rootPath: string, staticPath: string, settingsString: string, enableLauncherSettings: boolean, keytarModule: KeytarModule | undefined, type: FlipperServerType, environmentInfo: EnvironmentInfo): Promise<FlipperServerImpl>;
//# sourceMappingURL=startFlipperServer.d.ts.map