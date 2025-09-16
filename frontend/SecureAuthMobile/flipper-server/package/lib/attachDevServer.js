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
exports.attachDevServer = exports.getPluginSourceFolders = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const p_filter_1 = __importDefault(require("p-filter"));
const os_1 = require("os");
const flipper_common_1 = require("flipper-common");
const constants_1 = require("./fb-stubs/constants");
// This file is heavily inspired by scripts/start-dev-server.ts!
// part of that is done by start-flipper-server-dev (compiling "main"),
// the other part ("renderer") here.
const uiSourceDirs = ['flipper-ui', 'flipper-plugin', 'flipper-common'];
// copied from plugin-lib/src/pluginPaths
async function getPluginSourceFolders() {
    const pluginFolders = [];
    const flipperConfigPath = path_1.default.join((0, os_1.homedir)(), '.flipper', 'config.json');
    if (await fs_extra_1.default.pathExists(flipperConfigPath)) {
        const config = await fs_extra_1.default.readJson(flipperConfigPath);
        if (config.pluginPaths) {
            pluginFolders.push(...config.pluginPaths);
        }
    }
    pluginFolders.push(path_1.default.resolve(__dirname, '..', '..', 'plugins', 'public'));
    pluginFolders.push(path_1.default.resolve(__dirname, '..', '..', 'plugins', 'fb'));
    return (0, p_filter_1.default)(pluginFolders, (p) => fs_extra_1.default.pathExists(p));
}
exports.getPluginSourceFolders = getPluginSourceFolders;
/**
 * Attaches the necessary routing and middleware to observe
 * for local changes and apply them to the running instance.
 * @param app Express app.
 * @param server HTTP server.
 * @param socket Web Socket server.
 * @param rootDir Root directory.
 */
async function attachDevServer(app, server, socket, rootDir) {
    const Metro = require('metro');
    // eslint-disable-next-line node/no-extraneous-require
    const MetroResolver = require('metro-resolver');
    const { getWatchFolders, startWatchPlugins } = require('flipper-pkg-lib');
    const babelTransformationsDir = path_1.default.resolve(rootDir, 'babel-transformer', 'lib');
    const stubModules = new Set(flipper_common_1.BUILTINS);
    if (!stubModules.size) {
        throw new Error('Failed to load list of Node builtins');
    }
    const watchFolders = await dedupeFolders([
        ...(await Promise.all(uiSourceDirs.map((dir) => getWatchFolders(path_1.default.resolve(rootDir, dir))))).flat(),
    ]);
    const baseConfig = await Metro.loadConfig();
    const config = Object.assign({}, baseConfig, {
        projectRoot: rootDir,
        watchFolders,
        transformer: {
            ...baseConfig.transformer,
            babelTransformerPath: path_1.default.join(babelTransformationsDir, 'transform-browser'),
        },
        resolver: {
            ...baseConfig.resolver,
            resolverMainFields: ['flipperBundlerEntry', 'browser', 'module', 'main'],
            blacklistRE: [/\.native\.js$/],
            sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'mjs', 'cjs'],
            resolveRequest(context, moduleName, ...rest) {
                // flipper is special cased, for plugins that we bundle,
                // we want to resolve `impoSrt from 'flipper'` to 'deprecated-exports', which
                // defines all the deprecated exports
                if (moduleName === 'flipper') {
                    return MetroResolver.resolve(context, 'deprecated-exports', ...rest);
                }
                // stubbed modules are modules that don't make sense outside a Node / Electron context,
                // like fs, child_process etc etc.
                // UI / plugins using these features should use the corresponding RenderHost api's instead
                // Ideally we'd fail hard on those, but not all plugins are properly converted yet, and some
                // libraries try to require them for feature detection (e.g. jsbase64)
                if (stubModules.has(moduleName)) {
                    console.warn(`Found a reference to built-in module '${moduleName}', which will be stubbed out. Referer: ${context.originModulePath}`);
                    return {
                        type: 'empty',
                    };
                }
                return MetroResolver.resolve({
                    ...context,
                    resolveRequest: null,
                }, moduleName, ...rest);
            },
        },
        watch: true,
    });
    const connectMiddleware = await Metro.createConnectMiddleware(config);
    app.use(connectMiddleware.middleware);
    connectMiddleware.attachHmrServer(server);
    app.use(function (err, _req, _res, next) {
        console.error(chalk_1.default.red('\n\nCompile error in client bundle\n'), err);
        socket.clients.forEach((client) => {
            client.send(JSON.stringify({ event: 'hasErrors', payload: err.toString() }));
        });
        next();
    });
    await startWatchPlugins(process.env.FLIPPER_RELEASE_CHANNEL === 'insiders', constants_1.isFBBuild && !process.env.FLIPPER_FORCE_PUBLIC_BUILD, (changedPlugins) => {
        socket.clients.forEach((client) => {
            client.send(JSON.stringify({
                event: 'plugins-source-updated',
                payload: changedPlugins,
            }));
        });
    });
    console.log('DEV webserver started.');
}
exports.attachDevServer = attachDevServer;
async function dedupeFolders(paths) {
    return (0, p_filter_1.default)(paths.filter((value, index, self) => self.indexOf(value) === index), (f) => fs_extra_1.default.pathExists(f));
}
//# sourceMappingURL=attachDevServer.js.map