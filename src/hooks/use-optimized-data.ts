'use client';

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

interface OptimizedDataConfig<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  staleTime?: number;
  cacheTime?: number;
  prefetch?: boolean;
}

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5 minutes
const DEFAULT_CACHE_TIME = 1000 * 60 * 30; // 30 minutes

export function useOptimizedData<T>(
  queryKey: string[],
  fetcher: () => Promise<T>,
  config: OptimizedDataConfig<T> = {}
) {
  const queryClient = useQueryClient();
  const memoryCache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());
  const queryKeyString = queryKey.join('-');

  // Check memory cache first
  const getFromMemoryCache = useCallback(() => {
    const cached = memoryCache.current.get(queryKeyString);
    if (cached && Date.now() - cached.timestamp < (config.staleTime ?? DEFAULT_STALE_TIME)) {
      return cached.data;
    }
    return undefined;
  }, [queryKeyString, config.staleTime]);

  // Update memory cache
  const updateMemoryCache = useCallback((data: T) => {
    memoryCache.current.set(queryKeyString, {
      data,
      timestamp: Date.now(),
    });
  }, [queryKeyString]);

  // Optimized fetcher that checks memory cache first
  const optimizedFetcher = useCallback(async () => {
    // Check memory cache first
    const cachedData = getFromMemoryCache();
    if (cachedData) {
      return cachedData;
    }

    // Fetch fresh data
    const data = await fetcher();
    updateMemoryCache(data);
    return data;
  }, [fetcher, getFromMemoryCache, updateMemoryCache]);

  // Set up query with optimizations
  const query = useQuery({
    queryKey,
    queryFn: optimizedFetcher,
    staleTime: config.staleTime ?? DEFAULT_STALE_TIME,
    gcTime: config.cacheTime ?? DEFAULT_CACHE_TIME,
    ...config,
  });

  // Prefetch function
  const prefetch = useCallback(async () => {
    if (!query.data) {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: optimizedFetcher,
        staleTime: config.staleTime ?? DEFAULT_STALE_TIME,
      });
    }
  }, [queryClient, queryKey, optimizedFetcher, config.staleTime, query.data]);

  // Initialize prefetch if configured
  if (config.prefetch && !query.data) {
    void prefetch();
  }

  return {
    ...query,
    prefetch,
  };
} 