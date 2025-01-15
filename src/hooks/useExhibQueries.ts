import { api } from "@/trpc/react";
import { useCallback } from "react";

export function useHomeQuery() {
  return api.exhib.home.useQuery(undefined, {
    staleTime: 30 * 1000, // Data considered fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
  });
}

export function useStaffQuery() {
  return api.exhib.staff.useQuery(undefined, {
    staleTime: 2 * 60 * 1000, // Data considered fresh for 2 minutes
    gcTime: 15 * 60 * 1000, // Keep unused data in cache for 15 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
  });
}

export function useProfileQuery(steamid64: string) {
  return api.exhib.profile.useQuery(
    { steamid64 },
    {
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
    }
  );
}

export function useBansQuery(input: {
  search?: string | null;
  filter?: "banned" | "unbanned" | "expired";
  page?: number;
}) {
  return api.exhib.getBans.useQuery(input, {
    staleTime: 60 * 1000, // 1 minute for fresh data
    gcTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
  });
}

// Prefetch utilities
export function usePrefetchProfile() {
  const utils = api.useUtils();

  return useCallback(
    (steamid64: string) => {
      void utils.exhib.profile.prefetch({ steamid64 }, {
        staleTime: 5 * 60 * 1000,
      });
    },
    [utils]
  );
} 