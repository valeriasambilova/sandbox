'use client';

import { fetchAnimeSearchList } from 'app/anime-search/api/anilist';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

export default function AnimeSearchPage() {
  const { data, loading, hasMore, observerRef } =
    useInfiniteScroll(fetchAnimeSearchList);

  return (
    <div>
      {data &&
        data.map((item, index) => {
          return <div key={index}>{item.title.romaji}</div>;
        })}
      <div ref={observerRef} />
    </div>
  );
}
