import gql from 'graphql-tag';
import { fetchData } from '../../utils';
import { Country } from '../../types';

export const countriesQuery = gql`
    query getContinent($code: ID!) {
        continent(code: $code) {
            name
            countries {
                code
                name
            }
        }
    }
`;

export const fetchCountries = async ctx => {
    console.log('fetcccch', ctx);
    return await fetchData<any>(countriesQuery, {
        code: ctx.continentCode,
    });
};
