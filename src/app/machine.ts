import { MachineConfig, Machine, assign, Interpreter } from 'xstate';
import Router from 'next/router';
import { continentsMachine } from '../features/continents/continents-machine';
import {
    countriesMachine,
    CountriesContext,
    CountriesEvents,
} from '../features/countries/countries-machine';

type RouterEvents =
    | { type: 'ROUTE_INDEX' }
    | { type: 'ROUTE_CONTINENTS' }
    | { type: 'ROUTE_COUNTRIES' };

export type AppEvents =
    | RouterEvents
    | { type: 'FETCH'; code: string }
    | { type: 'BACK' }
    | { type: 'NEXT' }
    | { type: 'VIEW_COUNTRIES'; code: string };

export type AppContext = {
    errors?: any[];
    selectedCode?: string;
    countriesMachineRef?: Interpreter<CountriesContext, any, CountriesEvents>;
};

export type AppSchema = {
    states: {
        init: {};
        index: {};
        continents: {};
        countries: {};
    };
};

const config: MachineConfig<AppContext, AppSchema, AppEvents> = {
    id: 'app',
    context: {},
    states: {
        init: {
            on: {
                ROUTE_INDEX: {
                    target: 'index',
                },
                ROUTE_CONTINENTS: {
                    target: 'continents',
                },
                ROUTE_COUNTRIES: {
                    target: 'countries',
                },
            },
        },
        index: {
            states: {},
            on: {
                NEXT: {
                    target: 'continents',
                    actions: () => Router.push('/continents'),
                },
            },
        },
        continents: {
            invoke: {
                id: 'continentsMachine',
                src: continentsMachine,
                onDone: {
                    target: 'countries',
                    actions: [
                        assign((_, event) => ({
                            selectedCode: event.data.code,
                        })),
                        (ctx) =>
                            Router.push(
                                `/continents/${ctx.selectedCode}/countries`
                            ),
                    ],
                },
            },
            on: {
                BACK: {
                    target: 'index',
                    actions: () => Router.push('/'),
                },
            },
        },
        countries: {
            invoke: {
                id: 'countriesMachine',
                src: countriesMachine,
                data: (ctx) => ({
                    continentCode: ctx.selectedCode,
                }),
            },
            on: {
                BACK: {
                    target: 'continents',
                },
            },
        },
    },
    initial: 'init',
};

export const appMachine = Machine(config);
