import React from 'react';
import { AppContext, AppSchema, AppEvents } from './machine';
import { State, Interpreter } from 'xstate';

export type Context = [
    State<AppContext, AppEvents>,
    Interpreter<AppContext, AppSchema, AppEvents>['send'],
    Interpreter<AppContext, AppSchema, AppEvents>
];

export const AppStateContext = React.createContext<Context>(null);
