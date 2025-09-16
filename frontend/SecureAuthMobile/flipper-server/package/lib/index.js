"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionId = exports.hasAuthToken = exports.getAuthToken = exports.WEBSOCKET_MAX_MESSAGE_SIZE = exports.initializeLogger = exports.isFBBuild = exports.setupPrefetcher = exports.getGatekeepers = exports.setProcessExitRoutine = exports.processExit = exports.getEnvironmentInfo = exports.loadProcessConfig = exports.loadLauncherSettings = exports.loadSettings = exports.FlipperServerImpl = void 0;
var FlipperServerImpl_1 = require("./FlipperServerImpl");
Object.defineProperty(exports, "FlipperServerImpl", { enumerable: true, get: function () { return FlipperServerImpl_1.FlipperServerImpl; } });
var settings_1 = require("./utils/settings");
Object.defineProperty(exports, "loadSettings", { enumerable: true, get: function () { return settings_1.loadSettings; } });
__exportStar(require("./tracker"), exports);
var launcherSettings_1 = require("./utils/launcherSettings");
Object.defineProperty(exports, "loadLauncherSettings", { enumerable: true, get: function () { return launcherSettings_1.loadLauncherSettings; } });
var processConfig_1 = require("./utils/processConfig");
Object.defineProperty(exports, "loadProcessConfig", { enumerable: true, get: function () { return processConfig_1.loadProcessConfig; } });
var environmentInfo_1 = require("./utils/environmentInfo");
Object.defineProperty(exports, "getEnvironmentInfo", { enumerable: true, get: function () { return environmentInfo_1.getEnvironmentInfo; } });
var processExit_1 = require("./utils/processExit");
Object.defineProperty(exports, "processExit", { enumerable: true, get: function () { return processExit_1.processExit; } });
Object.defineProperty(exports, "setProcessExitRoutine", { enumerable: true, get: function () { return processExit_1.setProcessExitRoutine; } });
var gk_1 = require("./gk");
Object.defineProperty(exports, "getGatekeepers", { enumerable: true, get: function () { return gk_1.getGatekeepers; } });
var Prefetcher_1 = require("./fb-stubs/Prefetcher");
Object.defineProperty(exports, "setupPrefetcher", { enumerable: true, get: function () { return Prefetcher_1.setupPrefetcher; } });
__exportStar(require("./server/attachSocketServer"), exports);
__exportStar(require("./server/startFlipperServer"), exports);
__exportStar(require("./server/startServer"), exports);
__exportStar(require("./server/utilities"), exports);
__exportStar(require("./utils/openUI"), exports);
var constants_1 = require("./fb-stubs/constants");
Object.defineProperty(exports, "isFBBuild", { enumerable: true, get: function () { return constants_1.isFBBuild; } });
var Logger_1 = require("./fb-stubs/Logger");
Object.defineProperty(exports, "initializeLogger", { enumerable: true, get: function () { return Logger_1.initializeLogger; } });
var ServerWebSocket_1 = require("./app-connectivity/ServerWebSocket");
Object.defineProperty(exports, "WEBSOCKET_MAX_MESSAGE_SIZE", { enumerable: true, get: function () { return ServerWebSocket_1.WEBSOCKET_MAX_MESSAGE_SIZE; } });
var certificate_utils_1 = require("./app-connectivity/certificate-exchange/certificate-utils");
Object.defineProperty(exports, "getAuthToken", { enumerable: true, get: function () { return certificate_utils_1.getAuthToken; } });
Object.defineProperty(exports, "hasAuthToken", { enumerable: true, get: function () { return certificate_utils_1.hasAuthToken; } });
var sessionId_1 = require("./sessionId");
Object.defineProperty(exports, "sessionId", { enumerable: true, get: function () { return sessionId_1.sessionId; } });
//# sourceMappingURL=index.js.map