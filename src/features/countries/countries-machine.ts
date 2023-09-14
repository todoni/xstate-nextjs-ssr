import { MachineConfig, Machine, assign } from 'xstate';
import { fetchCountries } from './countries-queries';
import { Country } from '../../types';

export type CountriesEvents =
    | { type: 'FETCH' }
    | { type: 'LOAD' }
    | { type: 'SELECT'; code: string };

export type CountriesContext = {
    countries?: Country[];
    errors?: any[];
    continentCode?: string;
    name?: string;
};

export type CountriesSchema = {
    states: {
        init: {};
        loaded: {};
        error: {};
        fetching: {};
        finished: {};
    };
};

const config: MachineConfig<
    CountriesContext,
    CountriesSchema,
    CountriesEvents
> = {
    id: 'countriesMachine',
    context: {},
    states: {
        init: {
            on: {
                LOAD: [
                    {
                        target: 'loaded',
                        cond: (ctx) =>
                            ctx.countries !== undefined &&
                            ctx.countries.length > 0,
                    },
                    { target: 'fetching' },
                ],
            },
        },
        fetching: {
            invoke: {
                id: 'loadCountries',
                src: 'fetchCountries',
                onDone: {
                    target: 'loaded',
                    actions: [
                        assign((_, event) => ({
                            countries: event.data.continent.countries,
                            name: event.data.continent.name,
                        })),
                    ],
                },
                onError: {
                    target: 'error',
                },
            },
        },
        loaded: {
            states: {},
            on: {
                SELECT: {
                    get target() {
                        return config.states.finished;
                    },
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
        },
    },
    initial: 'init',
};

export const countriesMachine = Machine(config, {
    services: {
        fetchCountries: fetchCountries,
    },
});
