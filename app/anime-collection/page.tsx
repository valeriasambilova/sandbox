import List from './components/list';
import FilterBar from './components/filterBar';
import SortBar from './components/sortBar';
import { getFilters } from './graphql/cachedFilters';

export const metadata = {
  title: 'Anime Collection',
  description: 'Browse & Filter Anime from AniList.',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = await getFilters();

  return (
    <>
      <FilterBar
        filters={filters}
        genre={searchParams.genre}
        status={searchParams.status}
      />
      <SortBar sort={searchParams.sort} />
      <List searchParams={searchParams} />
    </>
  );
}
