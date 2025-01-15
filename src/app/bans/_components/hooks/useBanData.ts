import { useMemo } from "react";
import type { RouterOutputs } from "@/trpc/shared";

type BanData = RouterOutputs["exhib"]["getBans"]["bans"][number];
export type BanFilter = "banned" | "unbanned" | "expired";
export type BanStatus = BanFilter | "all";

// Memoize default avatar URL
const DEFAULT_AVATAR =
  "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg";

export function useBanCardData(ban: BanData) {
  return useMemo(() => {
    const userProfile = {
      name: ban.userProfile?.name ?? ban.Name ?? "Unknown",
      avatarmedium: ban.userProfile?.avatarmedium ?? DEFAULT_AVATAR,
    };

    const adminAvatar = ban.adminProfile?.console
      ? DEFAULT_AVATAR
      : (ban.adminProfile?.avatarmedium ?? DEFAULT_AVATAR);

    const status = ban.isUnbanned
      ? ("unbanned" as const)
      : !ban.isBanActive
        ? ("expired" as const)
        : ("banned" as const);

    return {
      steamid64: ban.SteamID64,
      SteamID: ban.SteamID,
      name: userProfile.name,
      reason: ban.Reason,
      admin: ban.AName,
      adminSteamID64: ban.ASteamID64,
      timeLeft: ban.prettyTimeLeft ?? "Permanent",
      length: String(ban.Length),
      server: ban.Server,
      userAvatar: userProfile.avatarmedium,
      adminAvatar,
      status,
      date: ban.date,
      unbanReason: ban.UnbanReason,
      Time: ban.Time,
      Length: ban.Length,
    };
  }, [ban]);
}

export function useSearchParams(
  search: string,
  filter: BanStatus,
  page: number,
) {
  return useMemo(
    () => ({
      search: search || undefined,
      filter: filter === "all" ? undefined : filter,
      page,
    }),
    [search, filter, page],
  );
}
