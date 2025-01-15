import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { api } from "@/trpc/react";

export function useProfilePrefetch() {
  const router = useRouter();
  const utils = api.useUtils();

  const prefetchProfile = useCallback(
    async (steamID64: string) => {
      // Prefetch the next route
      router.prefetch(`/profile/${steamID64}`);

      // Prefetch the profile data
      await utils.exhib.profile.prefetch({ steamid64: steamID64 });
    },
    [router, utils],
  );

  return prefetchProfile;
}
