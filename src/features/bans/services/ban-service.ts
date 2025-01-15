import { api } from "@/trpc/react";
import type { BanFilter } from "../types";

interface BanQueryParams {
  filter?: BanFilter;
  page?: number;
  search?: string;
}

// Refresh intervals for different ban states
const REFRESH_INTERVALS = {
  ACTIVE: 1000, // Update active bans every second
  NEAR_EXPIRY: 500, // Update more frequently when close to expiry
  INACTIVE: 60000, // Update inactive bans every minute
} as const;

export class BanService {
  static useInvalidateBans() {
    const utils = api.useUtils();
    return (params: BanQueryParams) => {
      void utils.exhib.getBans.invalidate({
        filter: params.filter?.active ? "banned" : undefined,
        page: params.page,
        search: params.search
      });
    };
  }

  static usePrefetchBans() {
    const utils = api.useUtils();
    return (params: BanQueryParams) => {
      void utils.exhib.getBans.prefetch({
        filter: params.filter?.active ? "banned" : undefined,
        page: params.page,
        search: params.search
      });
    };
  }

  static getRefreshInterval(banLength: number, banTime: number): number {
    if (banLength === 0) return REFRESH_INTERVALS.INACTIVE; // Permanent ban
    
    const now = Math.floor(Date.now() / 1000);
    const endTime = banTime + banLength;
    const timeLeft = endTime - now;

    // If ban is expired or unbanned
    if (timeLeft <= 0) return REFRESH_INTERVALS.INACTIVE;

    // If ban is close to expiry (less than 1 minute)
    if (timeLeft < 60) return REFRESH_INTERVALS.NEAR_EXPIRY;

    // Active ban with more than 1 minute left
    return REFRESH_INTERVALS.ACTIVE;
  }

  static formatTimeLeft(banLength: number, banTime: number): string {
    if (banLength === 0) return "Permanent";
    
    const now = Math.floor(Date.now() / 1000);
    const endTime = banTime + banLength;
    const timeLeft = endTime - now;

    if (timeLeft <= 0) return "Expired";

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }
} 