/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import CertificateProvider from '../../app-connectivity/certificate-exchange/CertificateProvider';
import { IdbConfig } from './iOSContainerUtility';
import { ClientQuery } from 'flipper-common';
export default class iOSCertificateProvider extends CertificateProvider {
    private idbConfig;
    name: string;
    medium: "FS_ACCESS";
    constructor(idbConfig: IdbConfig);
    getTargetDeviceId(clientQuery: ClientQuery, appName: string, appDirectory: string, csr: string): Promise<string>;
    protected deployOrStageFileForDevice(clientQuery: ClientQuery, destination: string, filename: string, contents: string, csr: string): Promise<void>;
    private getRelativePathInAppContainer;
    private pushFileToiOSDevice;
    private iOSDeviceHasMatchingCSR;
}
//# sourceMappingURL=iOSCertificateProvider.d.ts.map