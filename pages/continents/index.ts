import ContinentsPage from '../../src/features/continents/continents-page';
import { GetServerSideProps } from 'next';
import { initialiseAppMachine } from '../../src/utils';

export default ContinentsPage;

export const getServerSideProps: GetServerSideProps = async () => {
    const machineState = initialiseAppMachine('ROUTE_CONTINENTS');

    return { props: { machineState } };
};
