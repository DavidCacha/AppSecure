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
exports.queryTargetsWithXcode = exports.isSimulatorAvailable = exports.getDeviceSetPath = exports.isIdbAvailable = void 0;
const async_mutex_1 = require("async-mutex");
const promisify_child_process_1 = require("promisify-child-process");
const flipper_common_1 = require("flipper-common");
const fs_1 = require("fs");
const lodash_memoize_1 = __importDefault(require("lodash.memoize"));
const util_1 = require("util");
const child_process_1 = __importDefault(require("child_process"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const recorder_1 = require("../../recorder");
const constants_1 = require("../../fb-stubs/constants");
const exec = (0, util_1.promisify)(child_process_1.default.exec);
// Use debug to get helpful logs when idb fails
const IDB_LOG_LEVEL = 'DEBUG';
const LOG_TAG = 'iOSContainerUtility';
const CMD_RECORD_THROTTLE_COUNT = 10;
const mutex = new async_mutex_1.Mutex();
let idbDeviceListing = 0;
let idbCompanionDeviceListing = 0;
let xcodeDeviceListing = 0;
async function isIdbAvailable(idbPath) {
    if (!idbPath) {
        return false;
    }
    try {
        await fs_1.promises.access(idbPath, fs_1.constants.X_OK);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isIdbAvailable = isIdbAvailable;
async function safeExec(command) {
    const release = await mutex.acquire();
    return await (0, promisify_child_process_1.exec)(command).finally(release);
}
function getDeviceSetPath() {
    return process.env.DEVICE_SET_PATH
        ? ['--set', process.env.DEVICE_SET_PATH]
        : [];
}
exports.getDeviceSetPath = getDeviceSetPath;
function isSimulatorAvailable(simulator) {
    // For some users "availability" is set, for others it's "isAvailable"
    // It's not clear which key is set, so we are checking both.
    // We've also seen isAvailable return "YES" and true, depending on version.
    return (simulator.availability === '(available)' ||
        simulator.isAvailable === 'YES' ||
        simulator.isAvailable === true);
}
exports.isSimulatorAvailable = isSimulatorAvailable;
function getOSVersionFromXCRunOutput(s) {
    // E.g. 'com.apple.CoreSimulator.SimRuntime.iOS-16-1'
    const match = s.match(/com\.apple\.CoreSimulator\.SimRuntime\.iOS-(\d+)-(\d+)/);
    if (match) {
        return `${match[1]}.${match[2]}`;
    }
}
async function queryTargetsWithXcode(context) {
    const cmd = 'xcrun simctl list devices --json';
    const description = 'Query available devices with Xcode';
    const troubleshoot = `Xcode command line tools are not installed.
    Run 'xcode-select --install' from terminal.`;
    try {
        const { stdout } = await (0, promisify_child_process_1.execFile)('xcrun', [
            'simctl',
            ...getDeviceSetPath(),
            'list',
            'devices',
            '--json',
        ]);
        if (!stdout) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: false,
                troubleshoot,
                context,
            });
            throw new Error('No output from command');
        }
        xcodeDeviceListing++;
        if (xcodeDeviceListing % CMD_RECORD_THROTTLE_COUNT === 0) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: true,
                context,
            });
        }
        const devices = JSON.parse(stdout.toString()).devices;
        return Object.keys(devices).flatMap((key) => devices[key]
            .filter((simulator) => isSimulatorAvailable(simulator))
            .map((simulator) => {
            return {
                ...simulator,
                type: 'emulator',
                state: simulator.state.toLowerCase(),
                osVersion: getOSVersionFromXCRunOutput(key),
            };
        }));
    }
    catch (e) {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            success: false,
            troubleshoot,
            stderr: e.toString(),
            context,
        });
        return [];
    }
}
exports.queryTargetsWithXcode = queryTargetsWithXcode;
async function queryTargetsWithIdb(idbPath, context) {
    const cmd = `${idbPath} list-targets --json`;
    const description = `Query available devices with idb. idb is aware of the companions that you have
    manually connected, as well as other iOS targets that do not yet have companions.`;
    let troubleshoot = `Either idb is not installed or needs to be reset.
    Run 'idb kill' from terminal.`;
    if (constants_1.isFBBuild) {
        troubleshoot += ` If the steps above do not fix the issue, try re-installing idb by running these commands on the terminal 'sudo microdnf remove fb-idb fb-idb-companion'
and 'sudo microdnf install fb-idb fb-idb-companion'.`;
    }
    try {
        const { stdout } = await (0, promisify_child_process_1.exec)(cmd);
        if (!stdout) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: false,
                troubleshoot,
                context,
            });
            throw new Error('No output from command');
        }
        idbDeviceListing++;
        if (idbDeviceListing % CMD_RECORD_THROTTLE_COUNT === 0) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: true,
                context,
            });
        }
        return parseIdbTargets(stdout.toString());
    }
    catch (e) {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            success: false,
            troubleshoot,
            stderr: e.toString(),
            context,
        });
        return [];
    }
}
async function _queryTargetsWithIdbCompanion(idbCompanionPath, isPhysicalDeviceEnabled, context) {
    const cmd = `${idbCompanionPath} --list 1 --only device`;
    const description = `Query available devices with idb companion. Lists all available devices and simulators
    in the current context. If Xcode is not correctly installed, only devices will be listed.`;
    const troubleshoot = `Unable to locate idb_companion in '${idbCompanionPath}'.
    Try running sudo yum install -y fb-idb`;
    if (await isIdbAvailable(idbCompanionPath)) {
        try {
            const { stdout } = await safeExec(cmd);
            if (!stdout) {
                recorder_1.recorder.event('cmd', {
                    cmd,
                    description,
                    success: false,
                    troubleshoot,
                    context,
                });
                throw new Error('No output from command');
            }
            idbCompanionDeviceListing++;
            if (idbCompanionDeviceListing % CMD_RECORD_THROTTLE_COUNT === 0) {
                recorder_1.recorder.event('cmd', {
                    cmd,
                    description,
                    success: true,
                    context,
                });
            }
            const devices = parseIdbTargets(stdout.toString());
            if (devices.length > 0 && !isPhysicalDeviceEnabled) {
                recorder_1.recorder.logErrorGeneric(`You are trying to connect Physical Device.
          Please enable the toggle "Enable physical iOS device" from the setting screen.`);
            }
            return devices;
        }
        catch (e) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: false,
                troubleshoot,
                stderr: e.toString(),
                context,
            });
            return [];
        }
    }
    else {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            success: false,
            troubleshoot,
            context,
        });
        return [];
    }
}
function parseIdbTarget(line) {
    const parsed = JSON.parse(line);
    return {
        udid: parsed.udid,
        type: (parsed.type || parsed.target_type) === 'simulator'
            ? 'emulator'
            : 'physical',
        name: parsed.name,
        osVersion: parsed.os_version,
        state: parsed.state?.toLocaleLowerCase(),
    };
}
function parseIdbTargets(lines) {
    const parsedIdbTargets = lines
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => parseIdbTarget(line))
        .filter((target) => !!target);
    const dedupedIdbTargets = {};
    for (const idbTarget of parsedIdbTargets) {
        dedupedIdbTargets[idbTarget.udid] =
            dedupedIdbTargets[idbTarget.udid] ?? idbTarget;
    }
    return Object.values(dedupedIdbTargets);
}
async function idbDescribeTarget(idbPath, context) {
    const cmd = `${idbPath} describe --json`;
    const description = `Returns metadata about the specified target, including:
    UDID,
    Name,
    Screen dimensions and density,
    State (booted/...),
    Type (simulator/device),
    iOS version,
    Architecture,
    Information about its companion,
  `;
    const troubleshoot = `Either idb is not installed or needs to be reset.
    Run 'idb kill' from terminal.`;
    try {
        const { stdout } = await safeExec(cmd);
        if (!stdout) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: false,
                troubleshoot,
                context,
            });
            throw new Error('No output from command');
        }
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            success: true,
            stdout: stdout.toString(),
            context,
        });
        return parseIdbTarget(stdout.toString());
    }
    catch (e) {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            success: false,
            troubleshoot,
            stderr: e.toString(),
            context,
        });
        return undefined;
    }
}
async function targets(idbPath, isPhysicalDeviceEnabled, bootedOnly = false, context) {
    if (process.platform !== 'darwin') {
        return [];
    }
    const bootedFilter = (targets) => {
        return targets
            ? targets.filter((target) => !bootedOnly || (bootedOnly && target.state === 'booted'))
            : [];
    };
    // If companion is started by some external process and its path
    // is provided to Flipper via IDB_COMPANION environment variable,
    // use that instead and do not query other devices.
    // See stack of D36315576 for details
    if (process.env.IDB_COMPANION) {
        const target = await idbDescribeTarget(idbPath, context);
        return bootedFilter(target ? [target] : []);
    }
    if (await (0, lodash_memoize_1.default)(isIdbAvailable)(idbPath)) {
        const targets = await queryTargetsWithIdb(idbPath, context);
        return bootedFilter(targets);
    }
    else {
        const targets = await queryTargetsWithXcode(context);
        return bootedFilter(targets);
    }
}
async function push(udid, src, bundleId, dst, idbPath, context) {
    await (0, lodash_memoize_1.default)(checkIdbIsInstalled)(idbPath);
    const push_ = async () => {
        const cmd = `${idbPath} file push --log ${IDB_LOG_LEVEL} --udid ${udid} --bundle-id ${bundleId} '${src}' '${dst}'`;
        const description = `idb push file to device`;
        const troubleshoot = `Either idb is not installed or needs to be reset.
    Run 'idb kill' from terminal.`;
        try {
            await safeExec(cmd);
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: true,
                troubleshoot,
                context,
            });
        }
        catch (e) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: false,
                stdout: e.toString(),
                troubleshoot,
                context,
            });
            handleMissingIdb(e, idbPath);
            throw e;
        }
    };
    return (0, flipper_common_1.reportPlatformFailures)(push_(), `${LOG_TAG}:push`);
}
async function pull(udid, src, bundleId, dst, idbPath, context) {
    await (0, lodash_memoize_1.default)(checkIdbIsInstalled)(idbPath);
    const pull_ = async () => {
        const cmd = `${idbPath} file pull --log ${IDB_LOG_LEVEL} --udid ${udid} --bundle-id ${bundleId} '${src}' '${dst}'`;
        const description = `idb pull file from device`;
        const troubleshoot = `Either idb is not installed or needs to be reset.
    Run 'idb kill' from terminal.`;
        try {
            await safeExec(cmd);
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: true,
                troubleshoot,
                context,
            });
        }
        catch (e) {
            recorder_1.recorder.event('cmd', {
                cmd,
                description,
                success: false,
                stdout: e.toString(),
                troubleshoot,
                context,
            });
            handleMissingIdb(e, idbPath);
            handleMissingPermissions(e);
            throw e;
        }
    };
    return (0, flipper_common_1.reportPlatformFailures)(pull_(), `${LOG_TAG}:pull`);
}
async function checkIdbIsInstalled(idbPath) {
    const isInstalled = await isIdbAvailable(idbPath);
    if (!isInstalled) {
        throw new Error(`idb is required to use iOS devices. Install it with instructions
      from https://github.com/facebook/idb and set the installation path in Flipper settings.`);
    }
}
// The fb-internal idb binary is a shim that downloads the proper one on first run.
// It requires sudo to do so. If we detect this, tell the user how to fix it.
function handleMissingIdb(e, idbPath) {
    if (e.message &&
        e.message.includes('sudo: no tty present and no askpass program specified')) {
        console.warn(e);
        throw new Error(`idb doesn't appear to be installed. Run "${idbPath} list-targets" to fix this.`);
    }
}
function handleMissingPermissions(e) {
    if (e.message &&
        e.message.includes('Command failed') &&
        e.message.includes('file pull') &&
        e.message.includes('sonar/app.csr')) {
        console.warn(e);
        throw new Error('Cannot connect to iOS application. idb_certificate_pull_failed, ' +
            'idb lacks permissions to exchange certificates. Did you install a source build ([FB] or enable certificate exchange)? See console logs for more details.');
    }
}
async function isXcodeDetected() {
    try {
        const { stdout } = await exec('xcode-select -p');
        return fs_extra_1.default.pathExists(stdout.trim());
    }
    catch (e) {
        return false;
    }
}
exports.default = {
    targets,
    push,
    pull,
    isXcodeDetected,
};
//# sourceMappingURL=iOSContainerUtility.js.map