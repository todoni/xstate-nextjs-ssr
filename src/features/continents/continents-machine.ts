import { MachineConfig, Machine, assign } from 'xstate';
import { fetchData } from '../../utils';
import { continentQuery } from './continents-queries';
import { Continent } from '../../types';

export type ContinentsEvents =
    | { type: 'FETCH' }
    | { type: 'SELECT'; code: string };

export type ContinentsContext = {
    continents: Continent[];
    errors: any[];
    code?: string;
};

export type ContinentsSchema = {
    states: {
        loaded: {};
        error: {};
        fetching: {};
        finished: {};
    };
};

const config: MachineConfig<
    ContinentsContext,
    ContinentsSchema,
    ContinentsEvents
> = {
    id: 'continents',
    context: {
        continents: [],
        errors: [],
    },
    states: {
        fetching: {
            states: {},
            invoke: {
                id: 'loadContinents',
                src: async () => await fetchData<Continent[]>(continentQuery),
                onDone: {
                    target: 'loaded',
                    actions: [
                        assign({
                            continents: (_, event) => event.data.continents,
                        }),
                    ],
                },
                onError: {
                    target: 'error',
                    actions: (ctx, event) => console.log(ctx, event.toString()),
                },
            },
        },
        loaded: {
            states: {},
            on: {
                SELECT: {
                    target: 'finished',
                    actions: assign((_, event) => ({ code: event.code })),
                },
                FETCH: {
                    target: 'fetching',
                },
            },
        },
        error: {
            states: {},
            on: {
                FETCH: { target: 'fetching' },
            },
        },
        finished: {
            type: 'final',
            data: ctx => ({ code: ctx.code }),
        },
    },
    initial: 'fetching',
    on: {},
};

export const continentsMachine = Machine(config);
