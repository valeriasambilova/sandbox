import { graphql } from 'gql.tada';

export const GetAnime = graphql(`
  query GetAnime(
    $page: Int = 1
    # $genre: String
    # $status: MediaStatus
    $sort: [MediaSort] = [START_DATE_DESC]
  ) {
    Page(page: $page) {
      pageInfo {
        hasNextPage
      }
      # media(type: ANIME, genre_in: [$genre], status: $status, sort: $sort) {
      media(type: ANIME, sort: $sort) {
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
