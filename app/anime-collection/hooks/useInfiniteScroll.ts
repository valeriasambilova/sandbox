'use client';

import { useEffect, useRef, useState } from 'react';

// TODO: proper type for params
export const useInfiniteScroll = (fetchData: Function, params: any = {}) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // setting variable to prevent StrictMode useEffect double run
  const initialLoadRef = useRef(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);
  const pageRef = useRef(1);
  const loadingRef = useRef(true);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const loadPage = async (pageNumber: number) => {
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const result = await fetchData(pageNumber);

      if (currentRequestId !== requestIdRef.current) return;

      setData((prev) =>
        pageNumber === 1 ? result.items : [...prev, ...result.items]
      );
      setHasMore(result.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      if (currentRequestId === requestIdRef.current) setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    // checking if it is the first call to prevent StrictMode useEffect double run
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;

    loadPage(1);
  }, []);

  // observer - uses refs to read latest state to avoid recreation on every page/loading change
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreRef.current && !loadingRef.current) {
          const nextPage = pageRef.current + 1;
          setPage(nextPage);
          loadPage(nextPage);
        }
      },
      { threshold: 1.0, rootMargin: '0px 0px 300px 0px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { data, loading, hasMore, observerRef };
};

// export const useInfiniteScrollTest = (getList:  Function, {})
