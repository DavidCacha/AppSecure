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
exports.executeCommandAsApp = exports.pull = exports.push = void 0;
const flipper_common_1 = require("flipper-common");
const adbkit_1 = __importDefault(require("adbkit"));
const recorder_1 = require("../../recorder");
const allowedAppNameRegex = /^[\w.-]+$/;
const appNotApplicationRegex = /not an application/;
const appNotDebuggableRegex = /debuggable/;
const operationNotPermittedRegex = /not permitted/;
const permissionDeniedRegex = /permission denied/;
const logTag = 'androidContainerUtility';
async function push(adbClient, deviceId, app, filepath, contents, clientQuery) {
    validateAppName(app);
    validateFilePath(filepath);
    validateFileContent(contents);
    return await _push(adbClient, deviceId, app, filepath, contents, clientQuery);
}
exports.push = push;
async function pull(adbClient, deviceId, app, path, clientQuery) {
    validateAppName(app);
    validateFilePath(path);
    return await _pull(adbClient, deviceId, app, path, clientQuery);
}
exports.pull = pull;
function validateAppName(app) {
    if (!app.match(allowedAppNameRegex)) {
        throw new Error(`Disallowed run-as user: ${app}`);
    }
}
function validateFilePath(filePath) {
    if (filePath.match(/[']/)) {
        throw new Error(`Disallowed escaping filepath: ${filePath}`);
    }
}
function validateFileContent(content) {
    if (content.match(/["]/)) {
        throw new Error(`Disallowed escaping file content: ${content}`);
    }
}
var RunAsErrorCode;
(function (RunAsErrorCode) {
    RunAsErrorCode[RunAsErrorCode["NotAnApp"] = 1] = "NotAnApp";
    RunAsErrorCode[RunAsErrorCode["NotDebuggable"] = 2] = "NotDebuggable";
    RunAsErrorCode[RunAsErrorCode["PermissionDenied"] = 3] = "PermissionDenied";
})(RunAsErrorCode || (RunAsErrorCode = {}));
class RunAsError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
async function _push(adbClient, deviceId, app, filename, contents, clientQuery) {
    console.debug(`Deploying ${filename} to ${deviceId}:${app}`, logTag);
    const cmd = `echo "${contents}" > '${filename}' && chmod 644 '${filename}'`;
    const description = 'Push file to device using adb shell (echo / chmod)';
    const troubleshoot = 'Failed to execute adb command, adb may be unresponsive, try running `adb kill-server` from your terminal';
    const reportSuccess = () => {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            troubleshoot,
            success: true,
            context: clientQuery,
        });
    };
    const reportFailure = (error) => {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            troubleshoot,
            stdout: error.message,
            success: false,
            context: clientQuery,
        });
    };
    try {
        await executeCommandAsApp(adbClient, deviceId, app, cmd);
        reportSuccess();
    }
    catch (error) {
        if (error instanceof RunAsError) {
            // Fall back to running the command directly.
            // This will work if adb is running as root.
            try {
                await executeCommandWithSu(adbClient, deviceId, app, cmd, error);
                reportSuccess();
                return;
            }
            catch (suError) {
                reportFailure(suError);
                throw suError;
            }
        }
        reportFailure(error);
        throw error;
    }
}
async function _pull(adbClient, deviceId, app, path, clientQuery) {
    const cmd = `cat '${path}'`;
    const description = 'Pull file from device using adb shell (cat)';
    const troubleshoot = 'Failed to execute adb command, adb may be unresponsive, try running `adb kill-server` from your terminal';
    const reportSuccess = () => {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            troubleshoot,
            success: true,
            context: clientQuery,
        });
    };
    const reportFailure = (error) => {
        recorder_1.recorder.event('cmd', {
            cmd,
            description,
            troubleshoot,
            stdout: error.message,
            success: false,
            context: clientQuery,
        });
    };
    try {
        const content = await executeCommandAsApp(adbClient, deviceId, app, cmd);
        reportSuccess();
        return content;
    }
    catch (error) {
        if (error instanceof RunAsError) {
            // Fall back to running the command directly.
            // This will work if adb is running as root.
            try {
                const content = await executeCommandWithSu(adbClient, deviceId, app, cmd, error);
                reportSuccess();
                return content;
            }
            catch (suError) {
                reportFailure(suError);
                throw suError;
            }
        }
        reportFailure(error);
        throw error;
    }
}
// Keep this method private since it relies on pre-validated arguments
function executeCommandAsApp(adbClient, deviceId, app, command) {
    return _executeCommandWithRunner(adbClient, deviceId, app, command, `run-as '${app}'`);
}
exports.executeCommandAsApp = executeCommandAsApp;
async function executeCommandWithSu(adbClient, deviceId, app, command, originalErrorToThrow) {
    try {
        return _executeCommandWithRunner(adbClient, deviceId, app, command, 'su');
    }
    catch (e) {
        throw originalErrorToThrow;
    }
}
function _executeCommandWithRunner(adbClient, deviceId, app, command, runner) {
    return adbClient
        .shell(deviceId, `echo '${command}' | ${runner}`)
        .then(adbkit_1.default.util.readAll)
        .then((buffer) => buffer.toString())
        .then((output) => {
        if (output.match(appNotApplicationRegex)) {
            throw new RunAsError(RunAsErrorCode.NotAnApp, `Android package ${app} is not an application. To use it with Flipper, either run adb as root or add an <application> tag to AndroidManifest.xml`);
        }
        if (output.match(appNotDebuggableRegex)) {
            throw new RunAsError(RunAsErrorCode.NotDebuggable, `Android app ${app} is not debuggable. To use it with Flipper, add android:debuggable="true" to the application section of AndroidManifest.xml`);
        }
        if (output.toLowerCase().match(operationNotPermittedRegex)) {
            throw new flipper_common_1.UnsupportedError(`Your android device (${deviceId}) does not support the adb shell run-as command. We're tracking this at https://github.com/facebook/flipper/issues/92`);
        }
        if (output.toLowerCase().match(permissionDeniedRegex)) {
            throw new RunAsError(RunAsErrorCode.PermissionDenied, `No permission to run-as application. To use it with Flipper, either run adb as root or allow running as app`);
        }
        return output;
    });
}
//# sourceMappingURL=androidContainerUtility.js.map