import { graphql } from 'gql.tada';

export const GetGenres = graphql(`
  query GetGenres {
    GenreCollection
  }
`);
