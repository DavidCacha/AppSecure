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
exports.httpGet = exports.loadAvailablePlugins = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const axios_1 = __importDefault(require("axios"));
const requestReport_1 = __importDefault(require("../../utils/requestReport"));
async function loadAvailablePlugins(server, marketplaceURL) {
    try {
        const response = await (0, node_fetch_1.default)(marketplaceURL);
        const plugins = await response.json();
        return plugins;
    }
    catch (e) {
        console.error('Failed while retrieving marketplace plugins', e);
        return [];
    }
}
exports.loadAvailablePlugins = loadAvailablePlugins;
// Adapter which forces node.js implementation for axios instead of browser implementation
const axiosHttpAdapter = require('axios/lib/adapters/http'); // eslint-disable-line import/no-commonjs
async function httpGet(url, config) {
    return (0, requestReport_1.default)('plugin-download', axios_1.default.get(url.toString(), {
        adapter: axiosHttpAdapter,
        responseType: 'stream',
        headers: {
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
        },
        ...config,
    }));
}
exports.httpGet = httpGet;
//# sourceMappingURL=pluginMarketplaceAPI.js.map