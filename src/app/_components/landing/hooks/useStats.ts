import { useMemo } from "react";
import type { HomeData, Stats, Server } from "../types";

export function useStats(data: HomeData | undefined) {
  // Memoize filtered servers
  const filterServers = useMemo<Server[]>(() => {
    if (!data?.servers) return [];
    return data.servers.filter(
      (server) =>
        server.maxPlayers > 0 && !server.hostname.toLowerCase().includes("dev"),
    );
  }, [data?.servers]);

  // Memoize server stats calculations
  const serverStats = useMemo<Stats>(() => {
    if (!filterServers.length) {
      return {
        totalOnlinePlayers: 0,
        maxOnlinePlayers: 0,
      };
    }

    return filterServers.reduce<Stats>(
      (acc, server) => ({
        totalOnlinePlayers: acc.totalOnlinePlayers + server.players,
        maxOnlinePlayers: acc.maxOnlinePlayers + server.maxPlayers,
      }),
      { totalOnlinePlayers: 0, maxOnlinePlayers: 0 },
    );
  }, [filterServers]);

  // Memoize social stats
  const socialStats = useMemo(
    () => ({
      steamGroupUserCount: data?.steamGroupUserCount ?? 0,
      totalPlayers: data?.totalPlayers ?? 0,
      totalTimePlayed: data?.totalTimePlayed ?? "0",
    }),
    [data?.steamGroupUserCount, data?.totalPlayers, data?.totalTimePlayed],
  );

  return {
    filterServers,
    stats: serverStats,
    socialStats,
  } as const;
}
