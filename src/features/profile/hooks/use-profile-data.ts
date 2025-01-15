import { useProfileQuery } from "@/hooks/useExhibQueries";
import type { ProfileData } from "../types";
import { useMemo } from "react";

export function useProfileData(steamID64: string) {
  const { data, isLoading, error } = useProfileQuery(steamID64);

  const profileData = useMemo(() => {
    if (!data?.gameInfo) return null;

    return {
      playerSummary: {
        steamid: data.playerSummary.steamid,
        personaname: data.playerSummary.personaname,
        avatarfull: data.playerSummary.avatarfull,
        profileurl: data.playerSummary.profileurl,
      },
      primaryGameServer: data.primaryGameServer,
      gameInfo: data.gameInfo,
    } satisfies ProfileData;
  }, [data]);

  return {
    profileData,
    isLoading,
    error,
  };
} 