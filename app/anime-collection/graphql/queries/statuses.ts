import { graphql } from 'gql.tada';

export const GetStatuses = graphql(`
  query GetStatuses {
    statusType: __type(name: "MediaStatus") {
      enumValues {
        name
        description
      }
    }
  }
`);
