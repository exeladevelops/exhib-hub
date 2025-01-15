import { useMemo } from "react";
import type { BanData, GroupedBans } from "../../types";

export function useBanData(banData: BanData[] | undefined) {
  return useMemo(() => {
    if (!banData?.length) {
      return {
        groupedBans: {
          active: [],
          expired: [],
          unbanned: [],
        } as GroupedBans,
        servers: [] as string[],
      } as const;
    }

    // Initialize groups structure
    const groups: GroupedBans = {
      active: [],
      expired: [],
      unbanned: [],
    };

    // Process each ban
    for (const ban of banData) {
      if (ban.isUnbanned) {
        groups.unbanned.push(ban);
      } else if (ban.isBanActive) {
        groups.active.push(ban);
      } else {
        groups.expired.push(ban);
      }
    }

    // Sort function for bans - most recent first
    const sortBans = (a: BanData, b: BanData): number => {
      return b.Time - a.Time;
    };

    // Sort all groups
    groups.active.sort(sortBans);
    groups.expired.sort(sortBans);
    groups.unbanned.sort(sortBans);

    // Get unique servers
    const servers = Array.from(
      new Set(banData.map((ban) => ban.Server).filter(Boolean)),
    );

    return {
      groupedBans: groups,
      servers,
    } as const;
  }, [banData]);
}
