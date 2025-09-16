/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/// <reference types="../types/adbkit" />
import CertificateProvider from '../../app-connectivity/certificate-exchange/CertificateProvider';
import { Client } from 'adbkit';
import { ClientQuery } from 'flipper-common';
export default class AndroidCertificateProvider extends CertificateProvider {
    private adb;
    name: string;
    medium: "FS_ACCESS";
    constructor(adb: Client);
    getTargetDeviceId(clientQuery: ClientQuery, appName: string, appDirectory: string, csr: string): Promise<string>;
    protected deployOrStageFileForDevice(clientQuery: ClientQuery, destination: string, filename: string, contents: string, csr: string): Promise<void>;
    private androidDeviceHasMatchingCSR;
}
//# sourceMappingURL=AndroidCertificateProvider.d.ts.map