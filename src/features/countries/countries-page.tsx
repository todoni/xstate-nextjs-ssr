import { useAppMachine } from '../../utils';
import { useService, useMachine } from '@xstate/react';
import { CountriesContext, CountriesEvents } from './countries-machine';
import { Interpreter } from 'xstate';

type Props = {
    machineState: string;
};

export default function CountriesPage({ machineState }: Props) {
    const [appState] = useAppMachine(machineState);
    const service = appState.children.countriesMachine as Interpreter<
        CountriesContext,
        any,
        CountriesEvents
    >;

    const [state, send] = useMachine(service.machine);

    console.log(state.value, state.context, appState.context);

    return <div>hi</div>;
}
