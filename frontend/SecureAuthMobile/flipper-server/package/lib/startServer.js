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
require("./replace-fb-stubs");
const process_1 = __importDefault(require("process"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const attachDevServer_1 = require("./attachDevServer");
const logger_1 = require("./logger");
const fs_extra_1 = __importDefault(require("fs-extra"));
const yargs_1 = __importDefault(require("yargs"));
const os_1 = __importDefault(require("os"));
const flipper_common_1 = require("flipper-common");
const exit_hook_1 = __importDefault(require("exit-hook"));
const tracker_1 = require("./tracker");
const environmentInfo_1 = require("./utils/environmentInfo");
const utilities_1 = require("./server/utilities");
const startServer_1 = require("./server/startServer");
const startFlipperServer_1 = require("./server/startFlipperServer");
const processExit_1 = require("./utils/processExit");
const Prefetcher_1 = require("./fb-stubs/Prefetcher");
const openUI_1 = require("./utils/openUI");
// eslint-disable-next-line node/no-sync
const argv = yargs_1.default
    .usage('yarn flipper-server [args]')
    .options({
    port: {
        describe: 'TCP port to serve on',
        type: 'number',
        default: 52342,
    },
    bundler: {
        describe: 'Serve the UI bundle from source. This option only works for source checkouts',
        type: 'boolean',
        default: false,
    },
    open: {
        describe: 'Open Flipper in the default browser after starting',
        type: 'boolean',
        default: true,
    },
    failFast: {
        describe: 'Exit the process immediately if the server cannot start, for example due to an incorrect configuration.',
        type: 'boolean',
        default: false,
    },
    settingsString: {
        describe: `override the existing defaults settings of flipper (settings.json file) e.g "{"androidHome":"/usr/local/bin","enableAndroid":true}"`,
        type: 'string',
        default: '',
    },
    launcherSettings: {
        describe: 'Open Flipper with the configuration stored in .config folder for the launcher',
        type: 'boolean',
        default: true,
    },
})
    .version('DEV')
    .help()
    .parseSync(process_1.default.argv.slice(1));
console.log(`[flipper-server] Starting flipper server with ${argv.bundler ? 'UI bundle from source' : 'pre-bundled UI'}`);
/**
 * When running as a standlone app not run from the terminal, the process itself
 * doesn't inherit the user's terminal PATH environment variable.
 * The PATH, when NOT launched from terminal is `/usr/bin:/bin:/usr/sbin:/sbin`
 * which is missing `/usr/local/bin`.
 */
if (os_1.default.platform() !== 'win32') {
    process_1.default.env.PATH = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin';
}
const rootPath = argv.bundler
    ? path_1.default.resolve(__dirname, '..', '..')
    : path_1.default.resolve(__dirname, '..'); // In pre-packaged versions of the server, static is copied inside the package.
const staticPath = path_1.default.join(rootPath, 'static');
const t0 = performance.now();
const browserConnectionTimeout = setTimeout(() => {
    tracker_1.tracker.track('browser-connection-created', {
        successful: false,
        timeMS: performance.now() - t0,
        timedOut: true,
    });
}, 10000);
let reported = false;
const reportBrowserConnection = (successful) => {
    if (reported) {
        return;
    }
    clearTimeout(browserConnectionTimeout);
    reported = true;
    tracker_1.tracker.track('browser-connection-created', {
        successful,
        timeMS: performance.now() - t0,
        timedOut: false,
    });
};
async function start() {
    const isProduction = process_1.default.env.NODE_ENV !== 'development' && process_1.default.env.NODE_ENV !== 'test';
    const environmentInfo = await (0, environmentInfo_1.getEnvironmentInfo)(rootPath, isProduction);
    await (0, logger_1.initializeLogger)(environmentInfo);
    const t1 = performance.now();
    const loggerInitializedMS = t1 - t0;
    console.info(`[flipper-server][bootstrap] Logger initialised (${loggerInitializedMS} ms)`);
    let keytar = undefined;
    try {
        if (process_1.default.env.FLIPPER_DISABLE_KEYTAR) {
            console.log('[flipper-server][bootstrap] Using keytar in-memory implementation as per FLIPPER_DISABLE_KEYTAR env var.');
        }
        else if (!(0, flipper_common_1.isTest)()) {
            const keytarPath = path_1.default.join(staticPath, 'native-modules', `keytar-${process_1.default.platform}-${process_1.default.arch}.node`);
            if (!(await fs_extra_1.default.pathExists(keytarPath))) {
                throw new Error(`Keytar binary does not exist for platform ${process_1.default.platform}-${process_1.default.arch}`);
            }
            keytar = require(keytarPath);
        }
    }
    catch (e) {
        console.error('[flipper-server] Failed to load keytar:', e);
    }
    const t2 = performance.now();
    const keytarLoadedMS = t2 - t1;
    console.info(`[flipper-server][bootstrap] Keytar loaded (${keytarLoadedMS} ms)`);
    console.info('[flipper-server] Check for running instances');
    const existingRunningInstanceVersion = await (0, utilities_1.checkServerRunning)(argv.port);
    if (existingRunningInstanceVersion) {
        console.info(`[flipper-server] Running instance found with version: ${existingRunningInstanceVersion}, current version: ${environmentInfo.appVersion}`);
        console.info(`[flipper-server] Shutdown running instance`);
        const success = await (0, utilities_1.shutdownRunningInstance)(argv.port);
        console.info(`[flipper-server] Shutdown running instance acknowledged: ${success}`);
    }
    else {
        console.info('[flipper-server] Checking if port is in use (TCP)');
        if (await (0, utilities_1.checkPortInUse)(argv.port)) {
            const success = await (0, utilities_1.shutdownRunningInstance)(argv.port);
            console.info(`[flipper-server] Shutdown running instance acknowledged: ${success}`);
        }
    }
    const t3 = performance.now();
    const runningInstanceShutdownMS = t3 - t2;
    console.info(`[flipper-server][bootstrap] Check for running instances completed (${runningInstanceShutdownMS} ms)`);
    const { app, server, socket, readyForIncomingConnections } = await (0, startServer_1.startServer)({
        staticPath,
        entry: `index.web.html`,
        port: argv.port,
    }, environmentInfo);
    const t4 = performance.now();
    const httpServerStartedMS = t4 - t3;
    console.info(`[flipper-server][bootstrap] HTTP server started (${httpServerStartedMS} ms)`);
    const flipperServer = await (0, startFlipperServer_1.startFlipperServer)(rootPath, staticPath, argv.settingsString, argv.launcherSettings, keytar, 'external', environmentInfo);
    flipperServer.once('browser-connection-created', () => {
        reportBrowserConnection(true);
    });
    const t5 = performance.now();
    const serverCreatedMS = t5 - t4;
    console.info(`[flipper-server][bootstrap] FlipperServer created (${serverCreatedMS} ms)`);
    // At this point, the HTTP server is ready and configuration is set.
    await launch();
    if (!isProduction) {
        (0, flipper_common_1.addLogTailer)((level, ...data) => {
            flipperServer.emit('server-log', (0, flipper_common_1.LoggerFormat)(level, ...data));
        });
    }
    const t6 = performance.now();
    const launchedMS = t6 - t5;
    (0, exit_hook_1.default)(async () => {
        console.log('[flipper-server] Shutdown Flipper server');
        await flipperServer.close();
    });
    if (argv.failFast) {
        flipperServer.on('server-state', ({ state }) => {
            if (state === 'error') {
                console.error('[flipper-server] state changed to error, process will exit.');
                (0, processExit_1.processExit)(1);
            }
        });
    }
    await flipperServer
        .connect()
        .catch((e) => console.warn('Flipper Server failed to initialize', e));
    const t7 = performance.now();
    const appServerStartedMS = t7 - t6;
    console.info(`[flipper-server][bootstrap] Ready for app connections (${appServerStartedMS} ms)`);
    if (argv.bundler) {
        await (0, attachDevServer_1.attachDevServer)(app, server, socket, rootPath);
    }
    const t8 = performance.now();
    const developmentServerAttachedMS = t8 - t7;
    console.info(`[flipper-server][bootstrap] Development server attached (${developmentServerAttachedMS} ms)`);
    readyForIncomingConnections(flipperServer);
    const t9 = performance.now();
    const serverStartedMS = t9 - t8;
    console.info(`[flipper-server][bootstrap] Listening at port ${chalk_1.default.green(argv.port)} (${serverStartedMS} ms)`);
    (0, Prefetcher_1.setupPrefetcher)(flipperServer.config.settings);
    const startupMS = t9 - t0;
    tracker_1.tracker.track('server-bootstrap-performance', {
        loggerInitializedMS,
        keytarLoadedMS,
        runningInstanceShutdownMS,
        httpServerStartedMS,
        serverCreatedMS,
        appServerStartedMS,
        developmentServerAttachedMS,
        serverStartedMS,
        launchedMS,
        startupMS,
    });
}
async function launch() {
    if (!argv.open) {
        console.warn('[flipper-server] Not opening UI, --open flag was not provided');
        return;
    }
    (0, openUI_1.openUI)(openUI_1.UIPreference.PWA, argv.port);
}
process_1.default.on('uncaughtException', (error) => {
    console.error('[flipper-server] uncaught exception, process will exit.', error);
    reportBrowserConnection(false);
    (0, processExit_1.processExit)(1);
});
process_1.default.on('unhandledRejection', (reason, promise) => {
    console.warn('[flipper-server] unhandled rejection for:', promise, 'reason:', reason);
});
// It has to fit in 32 bit int
const MAX_TIMEOUT = 2147483647;
// Node.js process never waits for all promises to settle and exits as soon as there is not pending timers or open sockets or tasks in teh macroqueue
const runtimeTimeout = setTimeout(() => { }, MAX_TIMEOUT);
// eslint-disable-next-line promise/catch-or-return
start()
    .catch((e) => {
    console.error(chalk_1.default.red('Server startup error: '), e);
    reportBrowserConnection(false);
    return (0, processExit_1.processExit)(1);
})
    .finally(() => {
    clearTimeout(runtimeTimeout);
});
//# sourceMappingURL=startServer.js.map