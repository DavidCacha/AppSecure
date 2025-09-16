/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ClientQuery, ConnectionRecordEntry } from 'flipper-common';
import { FlipperServerImpl } from './FlipperServerImpl';
type CommandEventPayload = {
    cmd: string;
    description: string;
    success: boolean;
    stdout?: string;
    stderr?: string;
    troubleshoot?: string;
    context?: any;
};
type ConnectionRecorderEvents = {
    cmd: CommandEventPayload;
};
declare class Recorder {
    private flipperServer_;
    undefinedClientQuery_: ClientQuery;
    private handler_;
    log_: (type: 'info' | 'warning' | 'error', clientQuery: ClientQuery, ...args: any[]) => void;
    event<Event extends keyof ConnectionRecorderEvents>(event: Event, payload: ConnectionRecorderEvents[Event]): void;
    logConnectionRecordEntries(logs: ConnectionRecordEntry[]): void;
    log(clientQuery: ClientQuery, ...args: any[]): void;
    logErrorGeneric(...args: any[]): void;
    logError(clientQuery: ClientQuery, ...args: any[]): void;
    enable(flipperServer: FlipperServerImpl): void;
}
declare const recorder: Recorder;
export { recorder };
//# sourceMappingURL=recorder.d.ts.map