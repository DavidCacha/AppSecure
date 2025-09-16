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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeIOSBridge = exports.SimctlBridge = exports.IDBBridge = exports.ERR_PHYSICAL_DEVICE_LOGS_WITHOUT_IDB = exports.ERR_NO_IDB_OR_XCODE_AVAILABLE = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const iOSContainerUtility_1 = __importStar(require("./iOSContainerUtility"));
const child_process_1 = __importDefault(require("child_process"));
const flipper_common_1 = require("flipper-common");
const path_1 = __importDefault(require("path"));
const promisify_child_process_1 = require("promisify-child-process");
const FlipperServerConfig_1 = require("../../FlipperServerConfig");
const iOSContainerUtility_2 = __importDefault(require("./iOSContainerUtility"));
exports.ERR_NO_IDB_OR_XCODE_AVAILABLE = 'Neither Xcode nor idb available. Cannot provide iOS device functionality.';
exports.ERR_PHYSICAL_DEVICE_LOGS_WITHOUT_IDB = 'Cannot provide logs from a physical device without idb.';
class IDBBridge {
    constructor(idbPath, enablePhysicalDevices) {
        this.idbPath = idbPath;
        this.enablePhysicalDevices = enablePhysicalDevices;
    }
    async launchSimulator(udid) {
        await this._execIdb(`boot --udid ${udid}`);
        await (0, promisify_child_process_1.execFile)('open', ['-a', 'simulator']);
    }
    async getInstalledApps(serial) {
        const { stdout } = await this._execIdb(`list-apps --udid ${serial}`);
        if (typeof stdout !== 'string') {
            throw new Error(`IDBBridge.getInstalledApps -> returned ${typeof stdout}, not a string`);
        }
        // Skip last item, as the last line also has \n at the end
        const appStrings = stdout.split('\n').slice(0, -1);
        const appDescriptors = appStrings.map((appString) => {
            const [bundleID, name, installType, architecturesString, runningStatus, debuggableStatusString,] = appString.split(' | ');
            return {
                bundleID,
                name,
                installType: installType,
                architectures: architecturesString.split(', '),
                runningStatus: runningStatus,
                debuggableStatus: debuggableStatusString !== 'Not Debuggable',
            };
        });
        return appDescriptors;
    }
    async ls(serial, appBundleId, path) {
        const { stdout } = await this._execIdb(`file ls --udid ${serial} --log ERROR --bundle-id ${appBundleId} '${path}'`);
        if (typeof stdout !== 'string') {
            throw new Error(`IDBBridge.ls -> returned ${typeof stdout}, not a string`);
        }
        // Skip last item, as the last line also has \n at the end
        const pathContent = stdout.split('\n').slice(0, -1);
        return pathContent;
    }
    pull(serial, src, bundleId, dst) {
        return iOSContainerUtility_2.default.pull(serial, src, bundleId, dst, this.idbPath);
    }
    async installApp(serial, ipaPath) {
        console.log(`Installing app via IDB ${ipaPath} ${serial}`);
        await this._execIdb(`install ${ipaPath} --udid ${serial}`);
    }
    async openApp(serial, bundleId) {
        console.log(`Opening app via IDB ${bundleId} ${serial}`);
        await this._execIdb(`launch --udid ${serial} ${bundleId} -f`);
    }
    async getActiveDevices(bootedOnly) {
        return iOSContainerUtility_1.default
            .targets(this.idbPath, this.enablePhysicalDevices, bootedOnly)
            .catch((e) => {
            console.warn('Failed to get active iOS devices:', e.message);
            return [];
        });
    }
    async navigate(serial, location) {
        this._execIdb(`open --udid ${serial} "${location}"`);
    }
    recordVideo(serial, outputFile) {
        console.log(`Starting screen record via idb to ${outputFile}.`);
        return this._execIdb(`record-video --udid ${serial} ${outputFile}`);
    }
    async screenshot(serial) {
        const imagePath = makeTempScreenshotFilePath();
        await this._execIdb(`screenshot --udid ${serial} ${imagePath}`);
        return readScreenshotIntoBuffer(imagePath);
    }
    startLogListener(udid, deviceType) {
        return child_process_1.default.spawn(this.idbPath, ['log', '--udid', udid, '--', ...getLogExtraArgs(deviceType)], {
            env: {
                PYTHONUNBUFFERED: '1',
            },
        });
    }
    _execIdb(command) {
        return (0, promisify_child_process_1.exec)(`${this.idbPath} ${command}`);
    }
}
exports.IDBBridge = IDBBridge;
class SimctlBridge {
    pull(serial, src, bundleId, dst) {
        return iOSContainerUtility_2.default.pull(serial, src, bundleId, dst, '');
    }
    async getInstalledApps(_serial) {
        throw new Error('SimctlBridge does not support getInstalledApps. Install idb (https://fbidb.io/).');
    }
    async ls(_serial, _appBundleId) {
        throw new Error('SimctlBridge does not support ls. Install idb (https://fbidb.io/).');
    }
    async openApp() {
        throw new Error('openApp is not implemented for SimctlBridge');
    }
    async installApp(serial, ipaPath, tempPath) {
        console.log(`Installing  app ${ipaPath} with xcrun`);
        const buildName = path_1.default.parse(ipaPath).name;
        const extractTmpDir = path_1.default.join(tempPath, `${buildName}-extract`, (0, flipper_common_1.uuid)());
        try {
            await fs_extra_1.default.mkdirp(extractTmpDir);
            await unzip(ipaPath, extractTmpDir);
            await (0, promisify_child_process_1.exec)(`xcrun simctl install ${serial} ${path_1.default.join(extractTmpDir, 'Payload', '*.app')}`);
        }
        finally {
            await fs_extra_1.default.rm(extractTmpDir, { recursive: true });
        }
    }
    startLogListener(udid, deviceType) {
        if (deviceType === 'physical') {
            throw new Error(exports.ERR_PHYSICAL_DEVICE_LOGS_WITHOUT_IDB);
        }
        const deviceSetPath = process.env.DEVICE_SET_PATH
            ? ['--set', process.env.DEVICE_SET_PATH]
            : [];
        return child_process_1.default.spawn('xcrun', [
            'simctl',
            ...deviceSetPath,
            'spawn',
            udid,
            'log',
            'stream',
            ...getLogExtraArgs(deviceType),
        ], {});
    }
    async screenshot(serial) {
        const imagePath = makeTempScreenshotFilePath();
        await (0, promisify_child_process_1.exec)(`xcrun simctl io ${serial} screenshot ${imagePath}`);
        return readScreenshotIntoBuffer(imagePath);
    }
    async navigate(serial, location) {
        (0, promisify_child_process_1.exec)(`xcrun simctl io ${serial} launch url "${location}"`);
    }
    recordVideo(serial, outputFile) {
        console.log(`Starting screen record via xcrun to ${outputFile}.`);
        return (0, promisify_child_process_1.exec)(`xcrun simctl io ${serial} recordVideo --codec=h264 --force ${outputFile}`);
    }
    async getActiveDevices(bootedOnly) {
        const devices = await (0, iOSContainerUtility_1.queryTargetsWithXcode)();
        return devices.filter((target) => !bootedOnly || (bootedOnly && target.state === 'booted'));
    }
    async launchSimulator(udid) {
        await (0, promisify_child_process_1.execFile)('xcrun', ['simctl', ...(0, iOSContainerUtility_1.getDeviceSetPath)(), 'boot', udid]);
        await (0, promisify_child_process_1.execFile)('open', ['-a', 'simulator']);
    }
}
exports.SimctlBridge = SimctlBridge;
function getLogExtraArgs(deviceType) {
    if (deviceType === 'physical') {
        return [
        // idb has a --json option, but that doesn't actually work for physical
        // devices!
        ];
    }
    else {
        return [
            '--style',
            'json',
            '--predicate',
            'senderImagePath contains "Containers"',
            '--debug',
            '--info',
        ];
    }
}
function makeTempScreenshotFilePath() {
    const imageName = `${(0, flipper_common_1.uuid)()}.png`;
    return path_1.default.join((0, FlipperServerConfig_1.getFlipperServerConfig)().paths.tempPath, imageName);
}
async function unzip(filePath, destination) {
    await (0, promisify_child_process_1.exec)(`unzip -qq  -o ${filePath} -d ${destination}`);
    if (!(await fs_extra_1.default.pathExists(path_1.default.join(destination, 'Payload')))) {
        throw new Error(`${path_1.default.join(destination, 'Payload')} Directory does not exists`);
    }
}
async function readScreenshotIntoBuffer(imagePath) {
    const buffer = await fs_extra_1.default.readFile(imagePath);
    await fs_extra_1.default.unlink(imagePath);
    return buffer;
}
async function makeIOSBridge(idbPath, isXcodeDetected, enablePhysicalDevices, isAvailable = iOSContainerUtility_1.isIdbAvailable) {
    if (await isAvailable(idbPath)) {
        return new IDBBridge(idbPath, enablePhysicalDevices);
    }
    // If Xcode is available then xcrun instead of idb is used.
    if (isXcodeDetected) {
        return new SimctlBridge();
    }
    throw new Error(exports.ERR_NO_IDB_OR_XCODE_AVAILABLE);
}
exports.makeIOSBridge = makeIOSBridge;
//# sourceMappingURL=IOSBridge.js.map