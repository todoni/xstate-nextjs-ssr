import gql from 'graphql-tag';

export const continentQuery = gql`
    query getContinents {
        continents {
            name
            code
        }
    }
`;
