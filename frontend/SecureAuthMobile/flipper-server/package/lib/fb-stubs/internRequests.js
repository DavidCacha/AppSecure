"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteInternRequest = exports.internGraphGETAPIRequest = exports.internGraphPOSTAPIRequest = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
async function internGraphPOSTAPIRequest(endpoint, formFields, fileFields, options, token) {
    throw new Error('Feature not implemented');
}
exports.internGraphPOSTAPIRequest = internGraphPOSTAPIRequest;
async function internGraphGETAPIRequest(endpoint, params, _options, token) {
    throw new Error('Feature not implemented');
}
exports.internGraphGETAPIRequest = internGraphGETAPIRequest;
async function rewriteInternRequest(url, headers) {
    return { url, headers, proxy: null };
}
exports.rewriteInternRequest = rewriteInternRequest;
//# sourceMappingURL=internRequests.js.map