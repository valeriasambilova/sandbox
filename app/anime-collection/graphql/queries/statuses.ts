import { graphql } from 'gql.tada';

export const GetStatuses = graphql(`
  query GetStatuses {
    __type(name: "MediaStatus") {
      enumValues {
        name
        description
      }
    }
  }
`);
