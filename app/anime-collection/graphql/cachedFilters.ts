import { anilist } from './anilist';
import { GetGenres } from './queries/genres';
import { GetStatuses } from './queries/statuses';

// export const revalidate = 86_400;

export async function getFilters() {
  const [genresResponse, statusesResponse] = await Promise.all([
    anilist.request(GetGenres),
    anilist.request(GetStatuses),
  ]);

  return {
    genres: genresResponse.GenreCollection,
    statuses: (statusesResponse as any).statusType.enumValues,
  };
}
