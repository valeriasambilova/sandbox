import { anilist } from './anilist';
import { GetGenres } from './queries/genres';
import { GetStatuses } from './queries/statuses';
import { STATUS_LABELS } from './statusLabels';

// caching values for 24 hours
export const revalidate = 86_400;

export type Filters = {
  genres: string[];
  statuses: { name: string; label: string; description?: string }[];
};

export async function getFilters(): Promise<Filters> {
  const [genresResponse, statusesResponse] = await Promise.all([
    anilist.request(GetGenres),
    anilist.request(GetStatuses),
  ]);

  const genres: string[] = Array.isArray(genresResponse.GenreCollection)
    ? genresResponse.GenreCollection.filter(
        (genre) => typeof genre === 'string'
      )
    : [];

  const enumValues = (statusesResponse as any)?.__type?.enumValues;
  const statuses = Array.isArray(enumValues)
    ? enumValues.map((status) => ({
        name: status.name,
        label: STATUS_LABELS[status.name as keyof typeof STATUS_LABELS],
        description: status.description ?? undefined,
      }))
    : [];

  return { genres, statuses };
}
