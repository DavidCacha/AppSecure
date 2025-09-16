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
exports.commandDownloadFileStartFactory = void 0;
const flipper_common_1 = require("flipper-common");
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const { unlink } = fs_1.promises;
// Adapter which forces node.js implementation for axios instead of browser implementation
// Node.js implementation is better, because it
// supports streams which can be used for direct downloading to disk.
const axiosHttpAdapter = require('axios/lib/adapters/http'); // eslint-disable-line import/no-commonjs
const commandDownloadFileStartFactory = (emit) => async (url, dest, { method = 'GET', timeout, maxRedirects, headers, overwrite, proxy } = {}) => {
    const destExists = await (0, fs_extra_1.pathExists)(dest);
    if (destExists) {
        if (!overwrite) {
            throw new Error('FlipperServerImpl -> executing "download-file" -> path already exists and overwrite set to false');
        }
        await unlink(dest);
    }
    console.debug('commandDownloadFileStartFactory -> start', {
        http: {
            usedSockets: Object.keys(http_1.default.globalAgent.sockets).length,
            freeSocket: Object.keys(http_1.default.globalAgent.freeSockets).length,
            maxSockets: http_1.default.globalAgent.maxSockets,
            maxTotalSockets: http_1.default.globalAgent.maxTotalSockets,
        },
        https: {
            usedSockets: Object.keys(https_1.default.globalAgent.sockets).length,
            freeSocket: Object.keys(https_1.default.globalAgent.freeSockets).length,
            maxSockets: https_1.default.globalAgent.maxSockets,
            maxTotalSockets: https_1.default.globalAgent.maxTotalSockets,
        },
    });
    const downloadId = (0, flipper_common_1.uuid)();
    const response = await axios_1.default.request({
        method,
        url,
        responseType: 'stream',
        adapter: axiosHttpAdapter,
        timeout,
        maxRedirects,
        headers,
        proxy,
    });
    let totalSize = parseInt(response.headers['content-length'], 10);
    if (Number.isNaN(totalSize)) {
        totalSize = 0;
    }
    const writeStream = response.data.pipe((0, fs_1.createWriteStream)(dest, { autoClose: true }));
    let downloaded = 0;
    response.data.on('data', (data) => {
        downloaded += Buffer.byteLength(data);
        emit('download-file-update', {
            id: downloadId,
            downloaded,
            totalSize,
            status: 'downloading',
        });
    });
    response.data.on('error', (e) => {
        writeStream.destroy(e);
    });
    writeStream.on('finish', () => {
        emit('download-file-update', {
            id: downloadId,
            downloaded,
            totalSize,
            status: 'success',
        });
        console.debug('commandDownloadFileStartFactory -> finish', {
            http: {
                usedSockets: Object.keys(http_1.default.globalAgent.sockets).length,
                freeSocket: Object.keys(http_1.default.globalAgent.freeSockets).length,
            },
            https: {
                usedSockets: Object.keys(https_1.default.globalAgent.sockets).length,
                freeSocket: Object.keys(https_1.default.globalAgent.freeSockets).length,
            },
        });
    });
    writeStream.on('error', (e) => {
        response.data.destroy();
        emit('download-file-update', {
            id: downloadId,
            downloaded,
            totalSize,
            status: 'error',
            message: e.message,
            stack: e.stack,
        });
        console.debug('commandDownloadFileStartFactory -> error', {
            http: {
                usedSockets: Object.keys(http_1.default.globalAgent.sockets).length,
                freeSocket: Object.keys(http_1.default.globalAgent.freeSockets).length,
            },
            https: {
                usedSockets: Object.keys(https_1.default.globalAgent.sockets).length,
                freeSocket: Object.keys(https_1.default.globalAgent.freeSockets).length,
            },
        });
    });
    return {
        id: downloadId,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        totalSize,
    };
};
exports.commandDownloadFileStartFactory = commandDownloadFileStartFactory;
//# sourceMappingURL=DownloadFile.js.map