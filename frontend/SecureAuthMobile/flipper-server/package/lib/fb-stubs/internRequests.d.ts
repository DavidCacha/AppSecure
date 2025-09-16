/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import type { AxiosProxyConfig } from 'axios';
import { GraphFileUpload, GraphResponse } from 'flipper-common';
export declare function internGraphPOSTAPIRequest(endpoint: string, formFields: {
    [key: string]: any;
}, fileFields: Record<string, GraphFileUpload>, options: {
    timeout?: number;
    internGraphUrl?: string;
    headers?: Record<string, string | number | boolean>;
    vpnMode?: 'vpn' | 'vpnless';
}, token: string): Promise<GraphResponse>;
export declare function internGraphGETAPIRequest(endpoint: string, params: {
    [key: string]: any;
}, _options: {
    timeout?: number;
    internGraphUrl?: string;
    headers?: Record<string, string | number | boolean>;
    vpnMode?: 'vpn' | 'vpnless';
}, token: string): Promise<GraphResponse>;
export declare function rewriteInternRequest(url: string, headers: Record<string, string>): Promise<{
    url: string;
    headers: Record<string, string>;
    proxy: AxiosProxyConfig | null;
}>;
//# sourceMappingURL=internRequests.d.ts.map