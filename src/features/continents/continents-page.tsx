import React from 'react';
import Continent from './components/Continent';
import { useAppMachine } from '../../utils';
import { useActor } from '@xstate/react';

type Props = {
    machineState: string;
};

function ContinentsPage({ machineState }: Props) {
    const [appState] = useAppMachine(machineState);
    const service = appState.children.continentsMachine;

    const [state, send] = useActor(service);

    // Using matches has issues with TS
    // if (state.matches('fetching')) {
    if (state?.value === 'fetching') {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (state?.value === 'error') {
        return (
            <div>
                <h1>There has been an error</h1>
            </div>
        );
    }

    if (state?.value === 'loaded') {
        return (
            <div>
                <h1>Continents</h1>
                <ul>
                    {state.context.continents.map(({ name, code }) => (
                        <Continent
                            key={code}
                            value={name}
                            onClick={() => send({ type: 'SELECT', code })}
                        />
                    ))}
                </ul>
                <button onClick={() => send('FETCH')}>Fetch again</button>
            </div>
        );
    }

    return null;
}

export default ContinentsPage;
