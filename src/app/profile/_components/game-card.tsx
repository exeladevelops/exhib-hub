import { memo, useMemo } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { RankType } from "@/constants/types";
import { rankConfigs } from "@/constants/ranks";
import { FiClock, FiDollarSign } from "react-icons/fi";

interface GameCardProps {
  serverName: string;
  gameData: {
    Name: string;
    Rank: string;
    LastTime: number;
    Time: number;
    TimeJoined: number;
    rpname: string;
    wallet: number;
  };
}

export const GameCard = memo(function GameCard({
  serverName,
  gameData,
}: GameCardProps) {
  const cardDetails = useMemo(() => {
    const hours = Math.floor(gameData.Time / 3600);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const minutes = Math.floor((gameData.Time % 3600) / 60);

    const rankLower = gameData.Rank.toLowerCase() as RankType;
    const rankConfig = rankConfigs[rankLower];
    const rankColor =
      rankConfig?.colors[serverName as keyof typeof rankConfig.colors] ??
      "#64748b";
    const displayRank =
      (rankConfig?.displayName ?? gameData.Rank ?? "Unknown")
        .charAt(0)
        .toUpperCase() +
      (rankConfig?.displayName ?? gameData.Rank ?? "Unknown").slice(1);

    return {
      rankColor,
      displayRank,
      playtime: `${days} days ${remainingHours} hours ${minutes} minutes`,
    };
  }, [serverName, gameData]);

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm transition-all hover:bg-card/70">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold">{serverName}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <span className="text-foreground/80">{gameData.rpname}</span>
              <span className="text-muted-foreground/50">•</span>
              <span
                style={{ color: cardDetails.rankColor }}
                className="font-semibold"
              >
                {cardDetails.displayRank}
              </span>
            </CardDescription>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-muted/50 p-2">
                <FiClock size={18} className="text-foreground/70" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {cardDetails.playtime}
                </span>
                <span className="text-xs text-muted-foreground">
                  Total Playtime
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-muted/50 p-2">
                <FiDollarSign size={18} className="text-foreground/70" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  ${gameData.wallet.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  Wallet Balance
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
