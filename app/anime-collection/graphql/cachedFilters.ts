import { anilist } from './anilist';
import { GetFilters } from './queries/filters';
import { STATUS_LABELS } from './statusLabels';
import { unstable_cache } from 'next/cache';

export type Filters = {
  genres: string[];
  statuses: { name: string; label: string; description?: string }[];
};

// caching values for 24 hours
const CACHE_KEY = 'anime-collection-filters';
const REVALIDATE_SECONDS = 86_400;

const getCachedFilters = unstable_cache(
  async (): Promise<Filters> => {
    const response = await anilist.request(GetFilters);

    const genres: string[] = Array.isArray(response.genres)
      ? response.genres.filter((genre) => typeof genre === 'string')
      : [];

    const enumValues = (response.statuses as any)?.__type?.enumValues;
    const statuses = Array.isArray(enumValues)
      ? enumValues.map((status) => ({
          name: status.name,
          label: STATUS_LABELS[status.name as keyof typeof STATUS_LABELS],
          description: status.description ?? undefined,
        }))
      : [];

    return { genres, statuses };
  },
  [CACHE_KEY],
  { revalidate: REVALIDATE_SECONDS, tags: ['filters'] },
);

export async function getFilters(): Promise<Filters> {
  return getCachedFilters();
}
