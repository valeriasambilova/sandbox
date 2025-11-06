'use client';

import { fetchAnimeSearchList, getAnimeList } from '../graphql/anilist';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import Card from './card';

export default function List() {
  const { data, loading, hasMore, observerRef } =
    useInfiniteScroll(fetchAnimeSearchList);

  // console.log(getAnimeList({ page: 1 }));

  return (
    <>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {data &&
          data.map((item, index) => {
            return <Card item={item} key={index} />;
          })}
      </div>
      <div ref={observerRef} />
    </>
  );
}
