"use client";

import { rankConfigs } from "@/constants";
import { superAdmins } from "@/constants/superAdmins";
import { type RankType, Server } from "@/constants/types";
import { type ProfileContentProps, type GameInfo } from "./types";
import { ProfileError } from "./profile-error";
import { ProfileHeader } from "./profile-header";
import { ProfileStats } from "./profile-stats";
import { ProfileServers } from "./profile-servers";
import { ProfileSkeleton } from "./profile-skeleton";
import { useMemo, memo } from "react";
import { useProfileQuery } from "@/hooks/useExhibQueries";

export const ProfileContent = memo(function ProfileContent({
  steamID64,
}: ProfileContentProps) {
  const calculateTotalPlaytime = useMemo(
    () => (gameInfo: GameInfo) => {
      type GameInfoValue = {
        Name: string;
        Rank: string;
        LastTime: number;
        Time: number;
        TimeJoined: number;
        rpname: string;
        wallet: number;
      };
      
      return Object.values(gameInfo).reduce<number>(
        (acc, info) => acc + (info as GameInfoValue).Time,
        0
      );
    },
    [],
  );

  const getRankConfig = useMemo(
    () => (steamID64: string, title?: string | null, server?: string) => {
      const rankKey = title?.toLowerCase() as RankType | undefined;
      const isSuperAdmin = steamID64 in superAdmins;
      const superAdminConfig = isSuperAdmin
        ? superAdmins[steamID64 as keyof typeof superAdmins]
        : null;
      const rankConfig = rankKey ? rankConfigs[rankKey] : null;
      const serverKey = server === "DarkRP" ? Server.DRP : Server.MBRP;

      return {
        color:
          superAdminConfig?.color ??
          (rankConfig && server ? rankConfig.colors[serverKey] : "#64748b"),
        displayName:
          superAdminConfig?.displayRank ??
          rankConfig?.displayName ??
          title ??
          "User",
        icon: superAdminConfig?.icon ? <superAdminConfig.icon /> : null,
      };
    },
    [],
  );

  const { data, error, isLoading } = useProfileQuery(steamID64);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error instanceof Error) {
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message)
      : "An unknown error occurred";
    return <ProfileError message={`Error loading profile: ${errorMessage}`} />;
  }

  if (!data) {
    return <ProfileError message="No profile data found" />;
  }

  const totalPlaytime = calculateTotalPlaytime(data.gameInfo);
  const rankConfig = getRankConfig(
    steamID64,
    data.userInfo?.title,
    data.primaryGameServer
  );

  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader
        playerSummary={data.playerSummary}
        userInfo={data.userInfo}
        config={rankConfig}
        primaryGameServer={data.primaryGameServer}
        gameInfo={data.gameInfo}
      />
      <ProfileStats
        totalTimePlayedHours={Math.floor(totalPlaytime / 3600)}
        primaryGameServer={data.primaryGameServer}
        profileUrl={data.playerSummary.profileurl}
      />
      <ProfileServers gameInfo={data.gameInfo} />
    </div>
  );
});
