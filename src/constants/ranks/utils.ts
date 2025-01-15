import { Server } from "../types";
import { rankConfigs } from "../ranks";

const serverColors: Record<Server, string> = {
  [Server.DRP]: "bg-blue-500",
  [Server.MBRP]: "bg-green-500",
};

export function getRankColor(rank: string, server: Server): string | undefined {
  const rankKey = rank.toLowerCase() as keyof typeof rankConfigs;
  const rankConfig = rankConfigs[rankKey];
  if (!rankConfig) return undefined;

  return rankConfig.colors[server];
}

export function getServerColor(server: Server): string {
  return serverColors[server];
}
