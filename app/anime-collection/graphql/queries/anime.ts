import { graphql } from 'gql.tada';

export const GetAnime = graphql(`
  query GetAnime(
    $page: Int = 1
    $genre_in: [String]
    $status: MediaStatus
    $sort: [MediaSort]
  ) {
    Page(page: $page) {
      pageInfo {
        hasNextPage
      }
      media(type: ANIME, genre_in: $genre_in, status: $status, sort: $sort) {
        id
        coverImage {
          large
        }
        title {
          romaji
          english
        }
        description(asHtml: false)
        format
        averageScore
        seasonYear
        status
        genres
      }
    }
  }
`);
