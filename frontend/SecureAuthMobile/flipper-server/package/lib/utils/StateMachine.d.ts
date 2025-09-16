/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
export declare class StateMachine<TState extends string, TError extends TState> {
    private _currentState;
    private _error?;
    private valueEmitter;
    constructor(_currentState: TState);
    get error(): Error | undefined;
    get currentState(): TState;
    set<T extends TState>(...[newState, error]: T extends TError ? [T, Error] : [T]): void;
    wait<T extends TState | TState[]>(state: T): Promise<void>;
    once(state: TState | TState[], cb: () => void): () => void;
    on(state: TState | TState[], cb: () => void): () => void;
    is(targetState: TState | TState[]): boolean;
    private subscribe;
}
//# sourceMappingURL=StateMachine.d.ts.map