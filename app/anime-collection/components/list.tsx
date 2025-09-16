'use client';

import { fetchAnimeSearchList } from 'app/anime-collection/api/anilist';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function Card({ item }) {
  return (
    <div className='flex overflow-hidden rounded-lg bg-neutral-300 px-4 py-6 dark:bg-neutral-800'>
      <div className='max-w-45 shrink-0 overflow-hidden rounded-lg'>
        <img
          className='aspect-9/13 h-full w-full object-cover'
          src={item.coverImage.large}
          alt={`Cover Image of ${item.title.romaji}`}
        />
      </div>
      {item.title.romaji}
    </div>
  );
}

export default function List() {
  const { data, loading, hasMore, observerRef } =
    useInfiniteScroll(fetchAnimeSearchList);

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
