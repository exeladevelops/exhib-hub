import { memo, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { rankConfigs } from "@/constants";
import { superAdmins } from "@/constants/superAdmins";
import { serverThemes } from "@/constants/servers";
import type { RankType, Server } from "@/constants/types";
import type { StaffMember } from "./types";
import { usePrefetchProfile } from "@/components/shared/prefetch";
import React from "react";

type StaffCardProps = StaffMember & {
  avatarfull: string;
  Server: Server;
};

export const StaffCard = memo(function StaffCard({
  SteamID64,
  Name,
  Rank,
  avatarfull,
  Server,
}: StaffCardProps) {
  // Start prefetching profile data on component mount
  usePrefetchProfile(SteamID64);

  const config = useMemo(() => {
    const rankKey = Rank.toLowerCase() as RankType;
    const isSuperAdmin = SteamID64 in superAdmins;
    const superAdminConfig = isSuperAdmin
      ? superAdmins[SteamID64 as keyof typeof superAdmins]
      : null;
    const rankConfig = rankConfigs[rankKey] ?? null;
    const serverTheme = serverThemes[Server];

    return {
      color: superAdminConfig?.color ?? rankConfig?.colors[Server] ?? "#64748b",
      displayName:
        superAdminConfig?.displayRank ?? rankConfig?.displayName ?? Rank,
      icon: superAdminConfig?.icon ?? null,
      serverColor: serverTheme.primary ?? "#64748b",
    };
  }, [SteamID64, Rank, Server]);

  return (
    <Link
      href={`/profile/${SteamID64}`}
      prefetch={true}
      className="block transition-transform duration-200 hover:scale-[1.02]"
      aria-label={`View ${Name}'s profile - ${config.displayName}`}
    >
      <Card className="w-full bg-card/50 backdrop-blur-sm transition-colors duration-200 hover:bg-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <div
                style={{ backgroundColor: config.serverColor }}
                className="h-14 w-1 rounded-full"
                aria-hidden="true"
              />
              <Avatar className="h-14 w-14 rounded-lg">
                <AvatarImage
                  src={avatarfull}
                  alt={`${Name}'s avatar`}
                  loading="lazy"
                  className="object-cover"
                />
                <AvatarFallback>
                  {Name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex min-w-0 flex-col">
              <CardTitle className="flex items-center gap-2 truncate">
                {config.icon && React.createElement(config.icon)}
                <span style={{ color: config.color }} className="truncate">
                  {Name}
                </span>
              </CardTitle>
              <CardDescription className="truncate">
                {config.displayName}
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});
