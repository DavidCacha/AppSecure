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
const GK_1 = __importDefault(require("../fb-stubs/GK"));
/**
 * Defines the base class to be used by any server implementation e.g.
 * RSocket, WebSocket, etc.
 */
class ServerWebSocketBase {
    constructor(listener) {
        this.listener = listener;
        this.acceptingNewConections = true;
        this.deviceLogRegex = /(\d+):(info|warning|error):(.*)/;
    }
    /**
     * Handle a message received over an insecure connection. The only
     * supported message is to sign certificates.
     * @param clientQuery A ClientQuery instance containing metadata about
     * the client e.g. OS, device, app, etc.
     * @param rawData Raw data as sent by the client.
     * @returns The response to be sent back to the client. If the received
     * request is to sign a certificate and no errors were found, the response
     * should contain the device identifier to use by the client.
     */
    async _onHandleUntrustedMessage(clientQuery, rawData) {
        // OSS's older Client SDK might not send medium information.
        // This is not an issue for internal FB users, as Flipper release
        // is insync with client SDK through launcher.
        const message = rawData;
        if (message.method === 'signCertificate') {
            console.info(`[conn] Connection attempt: ${clientQuery.app} on ${clientQuery.device}, medium: ${message.medium}, cert: ${message.destination}`, clientQuery);
            const { csr, destination, timestamp, logs } = message;
            console.info(`[conn] Starting certificate exchange: ${clientQuery.app} on ${clientQuery.device}`);
            this.processDeviceLogs(clientQuery, logs);
            try {
                if (timestamp) {
                    const requestDate = new Date(timestamp);
                    function isSameDay(date) {
                        const currentDate = new Date();
                        return date.toDateString() === currentDate.toDateString();
                    }
                    console.info(`[conn] CSR created at`, requestDate.toISOString());
                    if (!isSameDay(requestDate)) {
                        throw new Error(`Please ensure that the device's date and time settings are correct`);
                    }
                }
                const result = await this.listener.onProcessCSR(csr, clientQuery, destination);
                console.info(`[conn] Exchanged certificate: ${clientQuery.app} on ${result.deviceId}`);
                const response = JSON.stringify(result);
                return response;
            }
            catch (error) {
                this.listener.onClientSetupError(clientQuery, error);
                return JSON.stringify({});
            }
        }
        else if (message.method === 'signCertificateAck') {
            const { logs, ...remainder } = message;
            console.info(`[conn] Connection attempt, sign certificate ACK received: ${clientQuery.app} on ${clientQuery.device}`, remainder);
            this.processDeviceLogs(clientQuery, logs);
        }
        return undefined;
    }
    startAcceptingNewConections() {
        if (!GK_1.default.get('flipper_disconnect_device_when_ui_offline')) {
            return;
        }
        this.acceptingNewConections = true;
    }
    stopAcceptingNewConections() {
        if (!GK_1.default.get('flipper_disconnect_device_when_ui_offline')) {
            return;
        }
        this.acceptingNewConections = false;
        this.stopAcceptingNewConectionsImpl();
    }
    processDeviceLogs(clientQuery, logs) {
        if (logs) {
            console.info(`[conn] Device logs until now are found below`);
            const entries = [];
            for (const log of logs) {
                const match = log.match(this.deviceLogRegex);
                if (match) {
                    const timestamp = match[1];
                    const level = match[2];
                    const message = match[3];
                    const timestampMS = parseInt(timestamp, 10);
                    if (!isNaN(timestampMS)) {
                        const time = new Date(timestampMS);
                        entries.push({
                            time,
                            type: level,
                            os: clientQuery.os,
                            device: clientQuery.device,
                            app: clientQuery.app,
                            message,
                            medium: clientQuery.medium,
                        });
                        console.log(`[conn][device][log][${time.toISOString()}][${level}] ${message}`);
                    }
                }
            }
            this.listener.onDeviceLogs(entries);
        }
    }
}
exports.default = ServerWebSocketBase;
//# sourceMappingURL=ServerWebSocketBase.js.map