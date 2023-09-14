import request from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';
import { print, ASTNode } from 'graphql';
import { State, interpret, Event, actions } from 'xstate';
import { useMachine } from '@xstate/react';
import { AppContext, AppEvents, appMachine } from './app/machine';

export async function fetchData<T>(
    query: ASTNode,
    variables?: Variables
): Promise<T> {
    return await request<T>(
        'https://countries.trevorblades.com/',
        print(query),
        variables
    );
}

export function useAppMachine(state: string) {
    return useMachine(appMachine, {
        devTools: true,
        state: JSON.parse(state),
    });
}

export function initialiseAppMachine(
    event: Event<AppEvents>,
    context: AppContext = {}
) {
    const machineWithContext = appMachine.withContext(context);
    const service = interpret(machineWithContext).start();
    service.onTransition((state) =>
        console.log('TRANSITION', state.value, state.event)
    );
    service.onEvent((event) => console.log('EVENT', event));
    service.send(event);

    return JSON.stringify(service.state);
}
