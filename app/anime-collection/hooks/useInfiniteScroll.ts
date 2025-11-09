'use client';

import { useEffect, useRef, useState } from 'react';

type PageResult<T> = {
  items: T[];
  hasMore: boolean;
};

export const useInfiniteScroll = <T>(fetchData, params) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const requestIdRef = useRef(0);
  const initialLoadRef = useRef(true); // to prevent StrictMode double run
  const observerRef = useRef<HTMLDivElement>(null);
  const previousKeyRef = useRef<string>(''); // stable key for params

  const paramsKey = JSON.stringify(params);
  const paramsChanged = paramsKey !== previousKeyRef.current;

  const loadPage = async (pageNumber: number, reset = false) => {
    const currentRequestId = ++requestIdRef.current;

    if (!reset) setLoading(true);

    try {
      const result = await fetchData(pageNumber, params);

      if (currentRequestId !== requestIdRef.current) return; // cancelled

      setData((prevData) =>
        reset ? result.items : [...prevData, ...result.items]
      );
      setHasMore(result.hasMore);
      if (!reset) pageRef.current = pageNumber + 1;
    } catch (error) {
      console.log(error);
    } finally {
      if (currentRequestId === requestIdRef.current) setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      loadPage(1, true);
    }
  });

  // reset on param changes
  useEffect(() => {
    if (!paramsChanged) return;

    pageRef.current = 1;
    setData([]);
    setHasMore(true);
    previousKeyRef.current = paramsKey;

    loadPage(1, true);
  }, [paramsKey, paramsChanged]);

  // infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !loading &&
          requestIdRef.current === 0
        ) {
          loadPage(pageRef.current);
        }
      },
      { threshold: 1, rootMargin: '0px 0px 400px 0px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return { data, loading, hasMore, observerRef };
};
