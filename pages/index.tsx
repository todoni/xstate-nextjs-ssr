import React from 'react';
import { GetServerSideProps } from 'next';
import { useAppMachine, initialiseAppMachine } from '../src/utils';

function Index(props) {
    const [, send] = useAppMachine(props.state);

    return (
        <div>
            <h1>Hi</h1>
            <button onClick={() => send('NEXT')}>Go to Continents page</button>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const state = initialiseAppMachine('ROUTE_INDEX');

    return { props: { state } };
};

export default Index;
