import { api } from "@/trpc/react";

export type BanFilter = "banned" | "unbanned" | "expired";

interface BanQueryParams {
  filter?: BanFilter;
  page?: number;
  search?: string | null;
}

export function useProfileQuery(steamid64: string) {
  return api.exhib.profile.useQuery({ steamid64 }, {
    staleTime: 60 * 1000, // 1 minute
    retry: 2,
  });
}

export function useBansQuery(params?: BanQueryParams) {
  const isActiveBans = params?.filter === "banned";
  
  return api.exhib.getBans.useQuery(params ?? {}, {
    staleTime: isActiveBans ? 60 * 1000 : 60 * 10000, // 1 minute for active, 10 minutes for others
    retry: 2,
  });
}

export function useStaffQuery() {
  return api.exhib.staff.useQuery(undefined, {
    staleTime: 60 * 5000, // 5 minutes
    retry: 2,
  });
}

export function useHomeQuery() {
  return api.exhib.home.useQuery(undefined, {
    staleTime: 60 * 1000, // 1 minute
    retry: 2,
  });
} 