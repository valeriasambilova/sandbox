'use client';

import { fetchAnimeList } from '../graphql/anilist';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

import Card from './card';

export default function List({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { data, loading, hasMore, observerRef } = useInfiniteScroll(
    fetchAnimeList,
    searchParams
  );

  return (
    <>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {data.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <div ref={observerRef} />
    </>
  );
}
