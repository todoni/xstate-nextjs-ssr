import CountriesPage from '../../../src/features/countries/countries-page';
import { GetServerSideProps } from 'next';
import { initialiseAppMachine } from '../../../src/utils';
import { fetchCountries } from '../../../src/features/countries/countries-queries';

export default CountriesPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
    const code = Array.isArray(ctx.query.code)
        ? ctx.query.code[0]
        : ctx.query.code;

    const countries = await fetchCountries({ continentCode: code });

    const machineState = initialiseAppMachine('ROUTE_COUNTRIES', {
        selectedContinent: countries.continent,
    });

    return { props: { machineState } };
};
