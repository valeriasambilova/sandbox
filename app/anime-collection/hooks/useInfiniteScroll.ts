'use client';

import { useEffect, useRef, useState } from 'react';

type PageResult = { items: any[]; hasMore: boolean };

export const useInfiniteScroll = (fetchData, params) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  const requestIdRef = useRef(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<Map<string, Promise<PageResult>>>(new Map());

  const paramsKey = JSON.stringify(params);

  const loadPage = async (pageNumber: number, reset = false) => {
    const currentRequestId = ++requestIdRef.current;

    if (!reset) setLoading(true);

    const cacheKey = `${pageNumber}|${paramsKey}`;

    // get or create the promise
    let promise: Promise<PageResult> =
      cacheRef.current.get(cacheKey) ??
      (async () => {
        try {
          const result = await fetchData(pageNumber, params);
          return result;
        } finally {
          cacheRef.current.delete(cacheKey);
        }
      })();

    // store it if it was newly created
    if (!cacheRef.current.has(cacheKey)) {
      cacheRef.current.set(cacheKey, promise);
    }

    let result: PageResult;
    try {
      result = await promise;
    } catch (err) {
      console.error('Fetch error:', err);
      if (currentRequestId === requestIdRef.current) setLoading(false);
      return;
    }

    if (currentRequestId !== requestIdRef.current) return;

    setData((prev) => (reset ? result.items : [...prev, ...result.items]));
    setHasMore(result.hasMore);
    setLoadedPages((prev) => new Set(prev).add(pageNumber));
    setLoading(false);
  };

  // reset on params change
  useEffect(() => {
    setData([]);
    setHasMore(true);
    setLoadedPages(new Set());
    loadPage(1, true);
  }, [paramsKey]);

  // infinite scroll observer: load next page when sentinel enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading && data.length > 0) {
          // calc next page from loadedPages to avoid race conditions
          const nextPage = Math.max(...Array.from(loadedPages)) + 1;
          loadPage(nextPage);
        }
      },
      { threshold: 1, rootMargin: '0px 0px 400px 0px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, data.length, loadedPages]);

  return { data, loading, hasMore, observerRef };
};
