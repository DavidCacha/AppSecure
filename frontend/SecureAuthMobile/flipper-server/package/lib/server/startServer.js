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
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const ws_1 = require("ws");
const ServerWebSocket_1 = require("../app-connectivity/ServerWebSocket");
const url_1 = require("url");
const exit_hook_1 = __importDefault(require("exit-hook"));
const attachSocketServer_1 = require("./attachSocketServer");
const certificate_utils_1 = require("../app-connectivity/certificate-exchange/certificate-utils");
const tracker_1 = require("../tracker");
const flipper_common_1 = require("flipper-common");
const constants_1 = require("../fb-stubs/constants");
const sessionId_1 = require("../sessionId");
const openUI_1 = require("../utils/openUI");
const processExit_1 = require("../utils/processExit");
const node_util_1 = __importDefault(require("node:util"));
const verifyAuthToken = (req) => {
    let token = null;
    if (req.url) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        token = url.searchParams.get('token');
    }
    if (!token && req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (!(0, flipper_common_1.isProduction)()) {
        console.info('[conn] verifyAuthToken -> token', token);
    }
    if (!token) {
        console.warn('[conn] A token is required for authentication');
        tracker_1.tracker.track('server-auth-token-verification', {
            successful: false,
            present: false,
            error: 'No token was supplied',
        });
        return false;
    }
    try {
        (0, certificate_utils_1.validateAuthToken)(token);
        console.info('[conn] Token was successfully validated');
        tracker_1.tracker.track('server-auth-token-verification', {
            successful: true,
            present: true,
        });
    }
    catch (err) {
        console.warn('[conn] An invalid token was supplied for authentication');
        tracker_1.tracker.track('server-auth-token-verification', {
            successful: false,
            present: true,
            error: err.toString(),
        });
        return false;
    }
    return true;
};
/**
 * The following two variables are used to control when
 * the server is ready to accept incoming connections.
 * - isReady, is used to synchronously check if the server is
 * ready or not.
 * - isReadyWaitable achieves the same but is used by
 * asynchronous functions which may want to wait until the
 * server is ready.
 */
let isReady = false;
let isReadyWaitable;
/**
 * Time to wait until server becomes ready to accept incoming connections.
 * If within 30 seconds it is not ready, the server is considered unresponsive
 * and must be terminated.
 */
const timeoutSeconds = 30;
/**
 * Orchestrates the creation of the HTTP server, proxy, and WS server.
 * @param config Server configuration.
 * @returns Returns a promise to the created server, proxy and WS server.
 */
async function startServer(config, environmentInfo) {
    setTimeout(() => {
        if (!isReady && (0, flipper_common_1.isProduction)()) {
            tracker_1.tracker.track('server-ready-timeout', { timeout: timeoutSeconds });
            console.error(`[flipper-server] Unable to become ready within ${timeoutSeconds} seconds, exit`);
            (0, processExit_1.processExit)(1);
        }
    }, timeoutSeconds * 1000);
    return await startHTTPServer(config, environmentInfo);
}
exports.startServer = startServer;
/**
 * Creates an express app with configured routing and creates
 * a proxy server.
 * @param config Server configuration.
 * @returns A promise to both app and HTTP server.
 */
async function startHTTPServer(config, environmentInfo) {
    const app = (0, express_1.default)();
    app.use((_req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    });
    const serveRoot = async (_req, res) => {
        const resource = isReady
            ? path_1.default.join(config.staticPath, config.entry)
            : path_1.default.join(config.staticPath, 'loading.html');
        const token = await (0, certificate_utils_1.getAuthToken)();
        const flipperConfig = {
            theme: 'light',
            entryPoint: (0, flipper_common_1.isProduction)()
                ? 'bundle.js'
                : 'flipper-ui/src/index-fast-refresh.bundle?platform=web&dev=true&minify=false',
            debug: !(0, flipper_common_1.isProduction)(),
            graphSecret: constants_1.GRAPH_SECRET,
            appVersion: environmentInfo.appVersion,
            sessionId: sessionId_1.sessionId,
            unixname: environmentInfo.os.unixname,
            authToken: token,
        };
        fs_extra_1.default.readFile(resource, (_err, content) => {
            const processedContent = content
                .toString()
                .replace('FLIPPER_CONFIG_PLACEHOLDER', node_util_1.default.inspect(flipperConfig));
            res.end(processedContent);
        });
    };
    app.get('/', serveRoot);
    app.get('/index.web.html', serveRoot);
    app.get('/ready', (_req, res) => {
        tracker_1.tracker.track('server-endpoint-hit', { name: 'ready' });
        res.json({ isReady });
    });
    app.get('/info', (_req, res) => {
        tracker_1.tracker.track('server-endpoint-hit', { name: 'info' });
        res.json(environmentInfo);
    });
    app.get('/shutdown', (_req, res) => {
        console.info('[flipper-server] Received shutdown request, process will terminate');
        tracker_1.tracker.track('server-endpoint-hit', { name: 'shutdown' });
        res.json({ success: true });
        // Just exit the process, this will trigger the shutdown hooks.
        // Do not use prcoessExit util as we want the serve to shutdown immediately
        process.exit(0);
    });
    app.get('/health', (_req, res) => {
        tracker_1.tracker.track('server-endpoint-hit', { name: 'health' });
        res.end('flipper-ok');
    });
    app.get('/open-ui', (_req, res) => {
        tracker_1.tracker.track('server-endpoint-hit', { name: 'open-ui' });
        const preference = (0, flipper_common_1.isProduction)() ? openUI_1.UIPreference.PWA : openUI_1.UIPreference.Browser;
        (0, openUI_1.openUI)(preference, config.port);
        res.json({ success: true });
    });
    app.use(express_1.default.static(config.staticPath));
    const server = http_1.default.createServer(app);
    const socket = attachWS(server, config);
    (0, exit_hook_1.default)(() => {
        console.log('[flipper-server] Shutdown HTTP server');
        server.close();
    });
    server.on('error', (e) => {
        console.warn('[flipper-server] HTTP server error: ', e.code);
        tracker_1.tracker.track('server-error', { code: e.code, message: e.message });
        if (e.code === 'EADDRINUSE') {
            console.warn(`[flipper-server] Unable to listen at port: ${config.port}, is already in use`);
            tracker_1.tracker.track('server-socket-already-in-use', {});
            (0, processExit_1.processExit)(1);
        }
    });
    server.listen(config.port);
    /**
     * Create the promise which can be waited on. In this case,
     * a reference to resolve is kept outside of the body of the promise
     * so that other asynchronous functions can resolve the promise
     * on its behalf.
     */
    let isReadyResolver;
    isReadyWaitable = new Promise((resolve, _reject) => {
        isReadyResolver = resolve;
    });
    return new Promise((resolve) => {
        console.info(`[flipper-server] Starting server on http://localhost:${config.port}`);
        const readyForIncomingConnections = (serverImpl) => {
            (0, attachSocketServer_1.attachSocketServer)(socket, serverImpl);
            /**
             * At this point, the server is ready to accept incoming
             * connections. Change the isReady state and resolve the
             * promise so that other asychronous function become unblocked.
             */
            isReady = true;
            isReadyResolver();
            return new Promise((resolve) => {
                tracker_1.tracker.track('server-started', {
                    port: config.port,
                });
                resolve();
            });
        };
        resolve({ app, server, socket, readyForIncomingConnections });
    });
}
/**
 * Adds a WS to the existing HTTP server.
 * @param server HTTP server.
 * @param config Server configuration. Port is used to verify
 * incoming connections origin.
 * @returns Returns the created WS.
 */
function attachWS(server, _config) {
    const verifyClient = ({ req }) => {
        return process.env.SKIP_TOKEN_VERIFICATION ? true : verifyAuthToken(req);
    };
    const options = {
        noServer: true,
        maxPayload: ServerWebSocket_1.WEBSOCKET_MAX_MESSAGE_SIZE,
        verifyClient,
    };
    const wss = new ws_1.WebSocketServer(options);
    server.on('upgrade', async function upgrade(request, socket, head) {
        if (!request.url) {
            console.log('[flipper-server] No request URL available');
            socket.destroy();
            return;
        }
        const { pathname } = (0, url_1.parse)(request.url);
        // Handled by Metro
        if (pathname === '/hot') {
            return;
        }
        if (pathname === '/') {
            // Wait until the server is ready to accept incoming connections.
            await isReadyWaitable;
            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request);
            });
            return;
        }
        console.error('[flipper-server] Unable to upgrade, unknown pathname', pathname);
        socket.destroy();
    });
    return wss;
}
//# sourceMappingURL=startServer.js.map