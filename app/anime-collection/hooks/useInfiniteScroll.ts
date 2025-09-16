'use client';

import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (fetchData: Function) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const loadPage = async (pageNumber: number) => {
    setLoading(true);

    try {
      const result = await fetchData(pageNumber);

      setData((prev) =>
        pageNumber === 1 ? result.items : [...prev, ...result.items]
      );
      setHasMore(result.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          loadPage(nextPage);
          setPage(nextPage);
        }
      },
      { threshold: 1.0, rootMargin: '0px 0px 200px 0px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  return { data, loading, hasMore, observerRef };
};
