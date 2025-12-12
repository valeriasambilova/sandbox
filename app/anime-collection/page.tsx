import List from './components/list';
import FilterBar from './components/filterBar';
import SortBar from './components/sortBar';
import { getFilters } from './graphql/cachedFilters';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Anime Collection',
  description: 'Browse & Filter Anime from AniList.',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = await getFilters();
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <Suspense fallback={<div></div>}>
        <FilterBar
          filters={filters}
          genre={resolvedSearchParams.genre}
          status={resolvedSearchParams.status}
        />
        <SortBar sort={resolvedSearchParams.sort} />
      </Suspense>
      <List searchParams={resolvedSearchParams} />
    </>
  );
}
