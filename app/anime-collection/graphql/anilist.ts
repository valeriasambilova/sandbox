import { GraphQLClient } from 'graphql-request';
import { GetAnime } from './queries/anime';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const anilist = new GraphQLClient(ANILIST_API_URL);

export async function fetchAnimeList(
  page: number,
  filterParams: { genre?: string; status?: string; sort?: string }
) {
  const variables: any = { page };

  if (filterParams?.genre) {
    variables.genre_in = filterParams.genre.split(',');
  }

  if (filterParams?.status) {
    variables.status = filterParams.status;
  }

  variables.sort = [filterParams?.sort || 'START_DATE_DESC'];

  const { Page } = await anilist.request(GetAnime, variables);

  return {
    items: Page?.media,
    hasMore: Page?.pageInfo?.hasNextPage,
  };
}
