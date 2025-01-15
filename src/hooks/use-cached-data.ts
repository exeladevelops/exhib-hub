"use client";

import { useCallback, useEffect, useState } from "react";

interface CacheConfig {
  revalidateInterval?: number; // in milliseconds
  initialData?: unknown;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  config: CacheConfig = {},
) {
  const [data, setData] = useState<T | undefined>(config.initialData as T);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!config.initialData);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
      const cacheEntry: CacheEntry<T> = {
        data: result,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheEntry));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      // Try to load from cache first
      const cached = localStorage.getItem(key);
      if (cached && isMounted) {
        try {
          const parsedCache = JSON.parse(cached) as CacheEntry<T>;
          const age = Date.now() - parsedCache.timestamp;

          if (age < (config.revalidateInterval ?? 300000)) {
            // Default 5 minutes
            setData(parsedCache.data);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Failed to parse cache:", err);
        }
      }

      if (isMounted) {
        await fetchData();
      }
    };

    void loadData();

    // Set up revalidation interval if specified
    let intervalId: NodeJS.Timeout | undefined;
    if (config.revalidateInterval) {
      intervalId = setInterval(() => {
        if (isMounted) {
          void fetchData();
        }
      }, config.revalidateInterval);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [key, config.revalidateInterval, fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
    refresh,
  };
}
