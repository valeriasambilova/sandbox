import { graphql } from 'gql.tada';

export const GetFilters = graphql(`
  query GetFilters {
    genres: GenreCollection
    statuses: __type(name: "MediaStatus") {
      enumValues {
        name
        description
      }
    }
  }
`);
