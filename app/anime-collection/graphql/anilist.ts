import { GraphQLClient } from 'graphql-request';
import { GetAnime } from './queries/anime';
import { DEFAULT_SORT } from './sortOptions';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const anilist = new GraphQLClient(ANILIST_API_URL);

export async function fetchAnimeList(
  page: number,
  filterParams: { genre?: string; status?: string; sort?: string }
) {
  const variables: any = { page };

  if (filterParams?.genre) {
    variables.genre = filterParams.genre;
  }

  if (filterParams?.status) {
    variables.status = filterParams.status;
  }

  variables.sort = [filterParams?.sort || DEFAULT_SORT];

  const { Page } = await anilist.request(GetAnime, variables);

  return {
    items: Page?.media,
    hasMore: Page?.pageInfo?.hasNextPage,
  };
}
