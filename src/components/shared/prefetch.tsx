"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

// Add NetworkInformation type
interface NetworkInformation {
  saveData: boolean;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

export function usePrefetchProfile(steamID64: string) {
  const utils = api.useUtils();

  useEffect(() => {
    // Start prefetching profile data with error handling
    void utils.exhib.profile.prefetch({ steamid64: steamID64 }).catch(() => {
      // Error handling
    });
  }, [steamID64, utils]);
}

export function Prefetch() {
  const router = useRouter();
  const utils = api.useUtils();

  useEffect(() => {
    // Only prefetch if the browser supports it and save-data is not enabled
    if (!navigator.connection?.saveData) {
      // Prefetch common routes with priority
      const prefetchRoutes = async () => {
        try {
          // High priority routes first
          await Promise.all([
            router.prefetch("/staff"),
            utils.exhib.staff.prefetch(),
          ]);

          // Lower priority routes after a delay
          setTimeout(() => {
            void router.prefetch("/profile/[steamid64]");
            void utils.exhib.home.prefetch().catch(() => {
              // Error handling
            });
          }, 2000);
        } catch {
          // Error handling
        }
      };

      void prefetchRoutes();
    }
  }, [router, utils]);

  return null;
}
