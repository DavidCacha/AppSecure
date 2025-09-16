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
exports.FlipperServerImpl = void 0;
const child_process_1 = __importDefault(require("child_process"));
const os_1 = __importDefault(require("os"));
const util_1 = require("util");
require("./utils/macCa");
require("./utils/fetch-polyfill");
const events_1 = __importDefault(require("events"));
const ServerController_1 = require("./app-connectivity/ServerController");
const androidDeviceManager_1 = require("./devices/android/androidDeviceManager");
const iOSDeviceManager_1 = require("./devices/ios/iOSDeviceManager");
const metroDeviceManager_1 = __importDefault(require("./devices/metro/metroDeviceManager"));
const desktopDeviceManager_1 = __importDefault(require("./devices/desktop/desktopDeviceManager"));
const js_base64_1 = require("js-base64");
const MetroDevice_1 = __importDefault(require("./devices/metro/MetroDevice"));
const AndroidDevice_1 = require("./devices/android/AndroidDevice");
const FlipperServerConfig_1 = require("./FlipperServerConfig");
const settings_1 = require("./utils/settings");
const launcherSettings_1 = require("./utils/launcherSettings");
const keytar_1 = require("./utils/keytar");
const PluginManager_1 = require("./plugins/PluginManager");
const runHealthchecks_1 = require("./utils/runHealthchecks");
const openFile_1 = require("./utils/openFile");
const pathUtils_1 = require("./utils/pathUtils");
const sendScribeLogs_1 = require("./fb-stubs/sendScribeLogs");
const internRequests_1 = require("./fb-stubs/internRequests");
const NodeApiExec_1 = require("./commands/NodeApiExec");
const DownloadFile_1 = require("./commands/DownloadFile");
const fs_1 = require("fs");
const rimraf_1 = __importDefault(require("rimraf"));
const assert_1 = __importDefault(require("assert"));
const adbClient_1 = require("./devices/android/adbClient");
const Utilities_1 = require("./app-connectivity/Utilities");
const fs_extra_1 = require("fs-extra");
const paths_1 = require("./utils/paths");
const jf_1 = require("./fb-stubs/jf");
const path_1 = __importDefault(require("path"));
const findInstallation_1 = require("./utils/findInstallation");
const GK_1 = __importDefault(require("./fb-stubs/GK"));
const fetchNewVersion_1 = require("./fb-stubs/fetchNewVersion");
const dns_1 = __importDefault(require("dns"));
const recorder_1 = require("./recorder");
// The default on node16 is to prefer ipv4 results which causes issues
// in some setups.
// @ts-ignore: Not in our node typings yet
dns_1.default.setDefaultResultOrder('verbatim');
const { access, copyFile, mkdir, unlink, stat, readlink, readFile, writeFile } = fs_1.promises;
function isHandledStartupError(e) {
    if (e.message.includes('EADDRINUSE')) {
        return true;
    }
    return false;
}
function setProcessState(settings) {
    const androidHome = settings.androidHome;
    const idbPath = settings.idbPath;
    process.env.ANDROID_HOME = androidHome;
    process.env.ANDROID_SDK_ROOT = androidHome;
    // emulator/emulator is more reliable than tools/emulator, so prefer it if
    // it exists
    process.env.PATH =
        `${['emulator', 'tools', 'platform-tools']
            .map((directory) => path_1.default.resolve(androidHome, directory))
            .join(':')}:${idbPath}` + `:${process.env.PATH}`;
}
/**
 * FlipperServer takes care of all incoming device & client connections.
 * It will set up managers per device type, and create the incoming
 * RSocket/WebSocket server to handle incoming client connections.
 *
 * The server should be largely treated as event emitter, by listening to the relevant events
 * using '.on'. All events are strongly typed.
 */
class FlipperServerImpl {
    constructor(config, logger, keytarModule) {
        this.config = config;
        this.logger = logger;
        this.events = new events_1.default();
        this.disposers = [];
        this.devices = new Map();
        this.state = 'pending';
        this.stateError = undefined;
        this.unresponsiveClients = new Set();
        this.acceptingNewConections = true;
        this.commandHandler = {
            'device-install-app': async (serial, bundlePath) => {
                return this.devices.get(serial)?.installApp(bundlePath);
            },
            'device-open-app': async (serial, name) => {
                return this.devices.get(serial)?.openApp(name);
            },
            'get-server-state': async () => ({
                state: this.state,
                error: this.stateError,
            }),
            'node-api-exec': NodeApiExec_1.commandNodeApiExec,
            'node-api-fs-access': access,
            'node-api-fs-pathExists': async (path, mode) => {
                try {
                    await access(path, mode);
                    return true;
                }
                catch {
                    return false;
                }
            },
            'node-api-fs-unlink': unlink,
            'node-api-fs-mkdir': mkdir,
            'node-api-fs-rm': async (path, options) => new Promise((resolve, reject) => (0, rimraf_1.default)(path, { disableGlob: true, maxBusyTries: options?.maxRetries ?? 0 }, (err) => (err ? reject(err) : resolve()))),
            'node-api-fs-copyFile': copyFile,
            'node-api-fs-stat': async (path) => {
                const stats = await stat(path);
                const { atimeMs, birthtimeMs, ctimeMs, gid, mode, mtimeMs, size, uid } = stats;
                return {
                    atimeMs,
                    birthtimeMs,
                    ctimeMs,
                    gid,
                    mode,
                    mtimeMs,
                    size,
                    uid,
                    isDirectory: stats.isDirectory(),
                    isFile: stats.isFile(),
                    isSymbolicLink: stats.isSymbolicLink(),
                };
            },
            'log-connectivity-event': async (level, query, message) => {
                recorder_1.recorder.log_(level, query ?? recorder_1.recorder.undefinedClientQuery_, message);
            },
            'node-api-fs-readlink': readlink,
            'node-api-fs-readfile': async (path, options) => {
                const contents = await readFile(path, options ?? 'utf8');
                (0, assert_1.default)(typeof contents === 'string', `File ${path} was not read with a string encoding`);
                return contents;
            },
            'node-api-fs-readfile-binary': async (path) => {
                const contents = await readFile(path);
                return js_base64_1.Base64.fromUint8Array(contents);
            },
            'node-api-fs-writefile': (path, contents, options) => writeFile(path, contents, options ?? 'utf8'),
            'node-api-fs-writefile-binary': (path, base64contents) => writeFile(path, js_base64_1.Base64.toUint8Array(base64contents), 'binary'),
            // TODO: Do we need API to cancel an active download?
            'download-file-start': async (endpoint, dest, options) => {
                const downloadFileStart = (0, DownloadFile_1.commandDownloadFileStartFactory)(this.emit.bind(this));
                const { url, headers, proxy } = await (0, internRequests_1.rewriteInternRequest)(endpoint, options?.headers ?? {});
                return downloadFileStart(url, dest, {
                    ...options,
                    proxy: proxy ?? undefined,
                    headers: headers,
                });
            },
            'get-config': async () => this.config,
            'get-changelog': pathUtils_1.getChangelog,
            'device-find': async (deviceSerial) => {
                return this.devices.get(deviceSerial)?.info;
            },
            'device-list': async () => {
                return Array.from(this.devices.values()).map((d) => d.info);
            },
            'device-take-screenshot': async (serial) => js_base64_1.Base64.fromUint8Array(await this.getDevice(serial).screenshot()),
            'device-start-screencapture': async (serial, destination) => this.getDevice(serial).startScreenCapture(destination),
            'device-stop-screencapture': async (serial) => this.getDevice(serial).stopScreenCapture(),
            'device-shell-exec': async (serial, command) => this.getDevice(serial).executeShell(command),
            'device-forward-port': async (serial, local, remote) => this.getDevice(serial).forwardPort(local, remote),
            'device-clear-logs': async (serial) => this.getDevice(serial).clearLogs(),
            'device-navigate': async (serial, loc) => this.getDevice(serial).navigateToLocation(loc),
            'fetch-debug-data': () => this.fetchDebugLogs(),
            'metro-command': async (serial, command) => {
                const device = this.getDevice(serial);
                if (!(device instanceof MetroDevice_1.default)) {
                    throw new Error(`Not a Metro device: ${serial}`);
                }
                device.sendCommand(command);
            },
            'client-find': async (clientId) => {
                return this.server.connections.get(clientId)?.client;
            },
            'client-list': async () => {
                return Array.from(this.server.connections.values()).map((c) => c.client);
            },
            'client-request': async (clientId, payload) => {
                this.server.connections.get(clientId)?.connection?.send(payload);
            },
            'client-request-response': async (clientId, payload) => {
                const client = this.server.connections.get(clientId);
                if (client && client.connection) {
                    return await client.connection.sendExpectResponse(payload);
                }
                return {
                    length: 0,
                    error: {
                        message: `Client '${clientId} is no longer connected, failed to deliver: ${JSON.stringify(payload)}`,
                        name: 'CLIENT_DISCONNECTED',
                        stacktrace: '',
                    },
                };
            },
            'android-get-emulators': async () => {
                (0, Utilities_1.assertNotNull)(this.android);
                return this.android.getAndroidEmulators();
            },
            'android-launch-emulator': async (name, coldBoot) => (0, AndroidDevice_1.launchEmulator)(this.config.settings.androidHome, name, coldBoot),
            'android-adb-kill': async () => {
                (0, Utilities_1.assertNotNull)(this.android);
                return this.android.adbKill();
            },
            'ios-get-simulators': async (bootedOnly) => {
                (0, Utilities_1.assertNotNull)(this.ios);
                return this.ios.getSimulators(bootedOnly);
            },
            'ios-launch-simulator': async (udid) => {
                (0, Utilities_1.assertNotNull)(this.ios);
                return this.ios.launchSimulator(udid);
            },
            'ios-launch-app': async (udid, bundleId) => {
                (0, Utilities_1.assertNotNull)(this.ios);
                return this.ios.launchApp(udid, bundleId);
            },
            'ios-idb-kill': async () => {
                (0, Utilities_1.assertNotNull)(this.ios);
                return this.ios.idbKill();
            },
            'persist-settings': async (settings) => (0, settings_1.saveSettings)(settings),
            'persist-launcher-settings': async (settings) => (0, launcherSettings_1.saveLauncherSettings)(settings),
            'keychain-read': (service) => this.keytarManager.retrieveToken(service),
            'keychain-write': (service, password) => this.keytarManager.writeKeychain(service, password),
            'keychain-unset': (service) => this.keytarManager.unsetKeychain(service),
            'plugins-load-dynamic-plugins': () => this.pluginManager.loadDynamicPlugins(),
            'plugins-load-marketplace-plugins': () => this.pluginManager.loadMarketplacePlugins(),
            'plugins-get-installed-plugins': () => this.pluginManager.getInstalledPlugins(),
            'plugins-remove-plugins': (plugins) => this.pluginManager.removePlugins(plugins),
            'plugin-start-download': (details) => this.pluginManager.downloadPlugin(details),
            'plugins-get-updatable-plugins': (query) => this.pluginManager.getUpdatablePlugins(query),
            'plugins-install-from-content': (contents) => {
                const bytes = js_base64_1.Base64.toUint8Array(contents);
                const buffer = Buffer.from(bytes);
                return this.pluginManager.installPluginFromFileOrBuffer(buffer);
            },
            'plugins-install-from-marketplace': (name) => this.pluginManager.installPluginForMarketplace(name),
            'plugins-install-from-npm': (name) => this.pluginManager.installPluginFromNpm(name),
            'plugin-source': (path) => this.pluginManager.loadSource(path),
            'plugins-server-add-on-start': (pluginName, details, owner) => this.pluginManager.startServerAddOn(pluginName, details, owner),
            'plugins-server-add-on-stop': (pluginName, owner) => this.pluginManager.stopServerAddOn(pluginName, owner),
            'plugins-server-add-on-request-response': async (payload) => {
                try {
                    const serverAddOn = this.pluginManager.getServerAddOnForMessage(payload);
                    (0, Utilities_1.assertNotNull)(serverAddOn);
                    return await serverAddOn.sendExpectResponse(payload);
                }
                catch {
                    return {
                        length: 0,
                        error: {
                            message: `Server add-on for message '${JSON.stringify(payload)} is no longer running.`,
                            name: 'SERVER_ADDON_STOPPED',
                            stacktrace: '',
                        },
                    };
                }
            },
            'doctor-get-healthchecks': runHealthchecks_1.getHealthChecks,
            'doctor-run-healthcheck': runHealthchecks_1.runHealthcheck,
            'open-file': openFile_1.openFile,
            'intern-graph-post': async (endpoint, formfields, filefields, options) => {
                const token = await this.keytarManager.retrieveToken(keytar_1.SERVICE_FLIPPER);
                return (0, internRequests_1.internGraphPOSTAPIRequest)(endpoint, formfields, filefields, options, token);
            },
            'intern-graph-get': async (endpoint, params, options) => {
                const token = await this.keytarManager.retrieveToken(keytar_1.SERVICE_FLIPPER);
                return (0, internRequests_1.internGraphGETAPIRequest)(endpoint, params, options, token);
            },
            'intern-upload-scribe-logs': sendScribeLogs_1.sendScribeLogs,
            'intern-cloud-upload': async (path) => {
                const uploadRes = await (0, jf_1.jfUpload)(path);
                if (!uploadRes) {
                    throw new Error('Upload failed');
                }
                return uploadRes;
            },
            restart: async () => {
                if (os_1.default.platform() === 'darwin') {
                    const execAsPromise = (0, util_1.promisify)(child_process_1.default.exec);
                    await execAsPromise('open flipper://execute?cmd=restart');
                    return;
                }
                throw new Error('Restarting the app is only supported on macOS');
            },
            shutdown: async () => {
                // Do not use processExit helper. We want to server immediatelly quit when this call is triggerred
                process.exit(0);
            },
            'is-logged-in': async () => {
                try {
                    const token = await this.keytarManager.retrieveToken(keytar_1.SERVICE_FLIPPER);
                    return !!token;
                }
                catch (e) {
                    return false;
                }
            },
            'environment-info': async () => {
                return this.config.environmentInfo;
            },
            'move-pwa': async () => {
                await (0, findInstallation_1.movePWA)();
            },
            'fetch-new-version': fetchNewVersion_1.fetchNewVersion,
        };
        (0, FlipperServerConfig_1.setFlipperServerConfig)(config);
        console.info(`Loaded flipper config: ${JSON.stringify(config, null, 2)}`);
        setProcessState(config.settings);
        const server = (this.server = new ServerController_1.ServerController(this));
        this.keytarManager = new keytar_1.KeytarManager(keytarModule);
        // given flipper-dump, it might make more sense to have the plugin command
        // handling (like download, install, etc) moved to flipper-server & app,
        // but let's keep things simple for now
        this.pluginManager = new PluginManager_1.PluginManager(this);
        server.addListener('error', (err) => {
            this.emit('server-error', err);
        });
        server.addListener('start-client-setup', (client) => {
            this.emit('client-setup', client);
        });
        server.addListener('client-setup-step', ({ client, step }) => {
            this.emit('client-setup-step', { client, step });
        });
        server.addListener('client-setup-error', ({ client, error }) => {
            this.emit('client-setup-error', {
                client,
                type: 'error',
                message: `Failed to exchange certificates with the following error: ${error.message}`,
            });
        });
        server.addListener('client-setup-secret-exchange', (client, secret) => {
            this.emit('client-setup-secret-exchange', {
                client,
                secret,
            });
        });
        server.addListener('client-unresponsive-error', ({ client, medium, }) => {
            const clientIdentifier = `${client.deviceName}#${client.appName}`;
            if (!this.unresponsiveClients.has(clientIdentifier)) {
                this.unresponsiveClients.add(clientIdentifier);
                // A timeout is very unlikely to take place as the app is constantly trying to reconnect.
                // Even if there was an error. The only plausible explanations are:
                // - The app stopped running during the certificate exchange process, which is very unlikely.
                // - If WWW certificate exchange is enabled, the app is probably still waiting for a response from the server.
                let message = 'Timeout establishing connection. It looks like the app is taking longer than it should to reconnect using the exchanged certificates. ';
                message +=
                    medium === 'WWW'
                        ? `Verify that your mobile device is connected to Lighthouse/VPN and that you are logged in to
              Flipper with the same user account used by the app (unfortunately, test accounts are not currently supported),
              so that certificates can be exhanged. See: https://fburl.com/flippervpn. Once this is done, re-running the app may solve this issue.`
                        : 'Re-running the app may solve this issue.';
                this.emit('client-setup-error', {
                    client,
                    type: 'error',
                    message,
                });
            }
            else {
                console.warn(`[conn] Client still unresponsive: "${client.appName}" on "${client.deviceName}"`);
            }
        });
    }
    startAcceptingNewConections() {
        if (!GK_1.default.get('flipper_disconnect_device_when_ui_offline')) {
            return;
        }
        if (this.acceptingNewConections) {
            return;
        }
        this.acceptingNewConections = true;
        this.server.insecureServer?.startAcceptingNewConections();
        this.server.altInsecureServer?.startAcceptingNewConections();
        this.server.secureServer?.startAcceptingNewConections();
        this.server.altSecureServer?.startAcceptingNewConections();
        this.server.browserServer?.startAcceptingNewConections();
    }
    stopAcceptingNewConections() {
        if (!GK_1.default.get('flipper_disconnect_device_when_ui_offline')) {
            return;
        }
        this.acceptingNewConections = false;
        this.server.insecureServer?.stopAcceptingNewConections();
        this.server.altInsecureServer?.stopAcceptingNewConections();
        this.server.secureServer?.stopAcceptingNewConections();
        this.server.altSecureServer?.stopAcceptingNewConections();
        this.server.browserServer?.stopAcceptingNewConections();
    }
    setServerState(state, error) {
        this.state = state;
        this.stateError = `${error}`;
        this.emit('server-state', { state, error: this.stateError });
    }
    /**
     * Starts listening to parts and watching for devices.
     * Connect never throws directly, but communicates
     * through server-state events
     */
    async connect() {
        if (this.state !== 'pending') {
            throw new Error('Server already started');
        }
        this.setServerState('starting');
        try {
            await this.createFolders();
            await this.server.init();
            await this.pluginManager.start();
            this.startDeviceListeners();
            this.setServerState('started');
        }
        catch (e) {
            if (!isHandledStartupError(e)) {
                console.error('Failed to start FlipperServer', e);
            }
            this.setServerState('error', e);
            throw e;
        }
    }
    async createFolders() {
        await Promise.all([
            (0, fs_extra_1.mkdirp)(paths_1.flipperDataFolder),
            (0, fs_extra_1.mkdirp)(paths_1.flipperSettingsFolder),
        ]);
    }
    async startDeviceListeners() {
        const asyncDeviceListenersPromises = [];
        if (this.config.settings.enableAndroid) {
            asyncDeviceListenersPromises.push((0, adbClient_1.initializeAdbClient)(this.config.settings)
                .then((adbClient) => {
                if (!adbClient) {
                    return;
                }
                this.android = new androidDeviceManager_1.AndroidDeviceManager(this, adbClient);
                return this.android.watchAndroidDevices(true);
            })
                .catch((e) => {
                console.error('FlipperServerImpl.startDeviceListeners.watchAndroidDevices -> unexpected error', e);
            }));
        }
        if (this.config.settings.enableIOS) {
            this.ios = new iOSDeviceManager_1.IOSDeviceManager(this, this.config.settings);
            asyncDeviceListenersPromises.push(this.ios.watchIOSDevices().catch((e) => {
                console.error('FlipperServerImpl.startDeviceListeners.watchIOSDevices -> unexpected error', e);
            }));
        }
        const asyncDeviceListeners = await Promise.all(asyncDeviceListenersPromises);
        this.disposers.push(...asyncDeviceListeners, (0, metroDeviceManager_1.default)(this), (0, desktopDeviceManager_1.default)(this));
    }
    on(event, callback) {
        this.events.on(event, callback);
    }
    once(event, callback) {
        this.events.once(event, callback);
    }
    off(event, callback) {
        this.events.off(event, callback);
    }
    onAny(callback) {
        this.events.on('*', callback);
    }
    offAny(callback) {
        this.events.off('*', callback);
    }
    /**
     * @internal
     */
    emit(event, payload) {
        this.events.emit(event, payload);
        this.events.emit('*', event, payload);
    }
    isExecWithOptions(argsAmbiguous) {
        return typeof argsAmbiguous[0] === 'object';
    }
    async exec(...argsAmbiguous) {
        let _timeout;
        let event;
        let args;
        if (this.isExecWithOptions(argsAmbiguous)) {
            _timeout = argsAmbiguous[0].timeout;
            event = argsAmbiguous[1];
            args = argsAmbiguous.slice(2);
        }
        else {
            // _timeout is currently not used, so we are setting it to a random value. Update it to a meaningful timeout before using it!
            _timeout = 42;
            event = argsAmbiguous[0];
            args = argsAmbiguous.slice(1);
        }
        try {
            const handler = this.commandHandler[event];
            if (!handler) {
                throw new Error(`Unimplemented server command: ${event}`);
            }
            const result = await handler(...args);
            console.debug(`[FlipperServer] command '${event}' - OK`);
            return result;
        }
        catch (e) {
            console.debug(`[FlipperServer] command '${event}' - ERROR: ${e} `);
            throw e;
        }
    }
    registerDevice(device) {
        // destroy existing device
        const { serial } = device.info;
        const existing = this.devices.get(serial);
        if (existing) {
            // assert different kind of devices aren't accidentally reusing the same serial
            if (existing.info.deviceType !== 'dummy' &&
                Object.getPrototypeOf(existing) !== Object.getPrototypeOf(device)) {
                throw new Error(`Tried to register a new device type for existing serial '${serial}': Trying to replace existing '${Object.getPrototypeOf(existing).constructor.name}' with a new '${Object.getPrototypeOf(device).constructor.name}`);
            }
            // clean up connection
            existing.disconnect();
        }
        // register new device
        this.devices.set(device.info.serial, device);
        this.emit('device-connected', device.info);
    }
    unregisterDevice(serial) {
        const device = this.devices.get(serial);
        if (!device) {
            return;
        }
        this.devices.delete(serial);
        device.disconnect();
        this.emit('device-disconnected', device.info);
        this.emit('device-removed', device.info);
    }
    getDevice(serial) {
        const device = this.devices.get(serial);
        if (!device) {
            console.warn(`No device with serial ${serial}.`);
            throw new Error('No device with matching serial.');
        }
        return device;
    }
    hasDevice(serial) {
        return !!this.devices.get(serial);
    }
    getDeviceWithName(name) {
        const devices = this.getDevices();
        const matches = devices.filter((device) => device.info.title === name);
        if (matches.length === 1) {
            return matches[0];
        }
    }
    getDeviceWithSerial(serial) {
        return this.devices.get(serial);
    }
    getDeviceSerials() {
        return Array.from(this.devices.keys());
    }
    getDevices() {
        return Array.from(this.devices.values());
    }
    async fetchDebugLogs() {
        const debugDataForEachDevice = await Promise.all([...this.devices.values()]
            .filter((device) => device.connected &&
            (device.info.os === 'Android' || device.info.os === 'iOS'))
            .map((device) => device
            .readFlipperFolderForAllApps()
            .catch((e) => {
            console.warn('fetchDebugLogs -> could not fetch debug data', device.info.serial, e);
        })));
        return debugDataForEachDevice
            .filter((item) => !!item)
            .flat();
    }
    async close() {
        this.server.close();
        for (const device of this.devices.values()) {
            device.disconnect();
        }
        this.disposers.forEach((f) => f?.());
        this.setServerState('closed');
    }
}
exports.FlipperServerImpl = FlipperServerImpl;
//# sourceMappingURL=FlipperServerImpl.js.map