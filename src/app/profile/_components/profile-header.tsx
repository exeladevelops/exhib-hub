import { memo, useMemo } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type ProfileHeaderProps } from "./types";
import { rankConfigs } from "@/constants";
import { superAdmins } from "@/constants/superAdmins";
import { Server, type RankType } from "@/constants/types";
import { serverThemes } from "@/constants/servers";
import { Groups } from "@/constants/ranks";

type SuperAdminKey = keyof typeof superAdmins;

export const ProfileHeader = memo(function ProfileHeader({
  playerSummary,
  userInfo,
  config,
  primaryGameServer,
  gameInfo,
}: ProfileHeaderProps) {
  const fallbackInitial = useMemo(
    () => playerSummary.personaname[0]?.toUpperCase() ?? "U",
    [playerSummary.personaname],
  );

  const { serverColor, rankColor, GroupIcon } = useMemo(() => {
    if (!userInfo) return { serverColor: config.color, rankColor: config.color, GroupIcon: null };
    
    const serverKey = primaryGameServer === "DarkRP" ? Server.DRP : Server.MBRP;
    const rank = gameInfo[primaryGameServer]?.Rank.toLowerCase() as RankType;
    const superAdmin = superAdmins[userInfo.steamid as SuperAdminKey];
    const serverTheme = serverThemes[serverKey];

    const group = Object.values(Groups).find(g => g.ranks.includes(rankConfigs[rank]));

    return {
      serverColor: serverTheme.primary,
      rankColor:
        superAdmin?.color ??
        rankConfigs[rank]?.colors[serverKey] ??
        config.color,
      GroupIcon: superAdmin?.icon ?? group?.icon ?? null,
    };
  }, [primaryGameServer, gameInfo, config.color, userInfo]);

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <div
              className="h-14 w-1 rounded-full transition-opacity duration-300"
              style={{ backgroundColor: serverColor }}
              aria-hidden="true"
            />
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage
                src={playerSummary.avatarfull}
                alt={playerSummary.personaname}
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
              <AvatarFallback>{fallbackInitial}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle
              className={cn("flex items-center gap-2 font-bold")}
              style={{ color: rankColor }}
            >
              {GroupIcon && <GroupIcon className="text-lg" />}
              {playerSummary.personaname}
              <span className="text-sm text-muted-foreground/25">
                ({playerSummary.steamid32})
              </span>
            </CardTitle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
