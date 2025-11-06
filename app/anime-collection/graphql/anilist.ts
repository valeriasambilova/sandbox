import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { GetAnime } from './queries/anime';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const anilist = new GraphQLClient(ANILIST_API_URL);

export async function getAnimeList(params?) {
  const animeList = await anilist.request(GetAnime, params);

  return animeList;
}

const query = `
  query ($page: Int = 1) {
    Page(page: $page) {
      pageInfo {
        hasNextPage
      }
      media (
        type: ANIME
      ) {
        id
        coverImage {
          large
        }
        title {
          romaji
          english
        }
        averageScore
        description (
          asHtml: false
        )
        format
      }
    }
  }
`;

export async function fetchAnimeSearchList(page: number) {
  const variables = { page };
  const {
    data: {
      data: {
        Page: {
          media: items,
          pageInfo: { hasNextPage: hasMore },
        },
      },
    },
  } = await axios.post(
    ANILIST_API_URL,
    JSON.stringify({
      query,
      variables,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  return { items, hasMore };
}
