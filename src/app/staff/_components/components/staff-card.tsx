"use client";

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
import type { StaffCardProps } from "../types";
import { usePrefetchProfile } from "@/components/shared/prefetch";
import React from "react";

export const StaffCard = memo(function StaffCard({ staff }: StaffCardProps) {
  // Start prefetching profile data on component mount
  usePrefetchProfile(staff.SteamID64);

  const config = useMemo(() => {
    const rankKey = staff.Rank.toLowerCase() as RankType;
    const isSuperAdmin = staff.SteamID64 in superAdmins;
    const superAdminConfig = isSuperAdmin
      ? superAdmins[staff.SteamID64 as keyof typeof superAdmins]
      : null;
    const rankConfig = rankConfigs[rankKey] ?? null;
    const serverTheme = serverThemes[staff.Server as Server];

    return {
      color: superAdminConfig?.color ?? rankConfig?.colors[staff.Server as Server] ?? "#64748b",
      displayName:
        superAdminConfig?.displayRank ?? rankConfig?.displayName ?? staff.Rank,
      icon: superAdminConfig?.icon ?? null,
      serverColor: serverTheme.primary ?? "#64748b",
    };
  }, [staff]);

  return (
    <Link
      href={`/profile/${staff.SteamID64}`}
      prefetch={true}
      className="block transition-transform duration-200 hover:scale-[1.02]"
      aria-label={`View ${staff.Name}'s profile - ${config.displayName}`}
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
                  src={staff.avatarfull}
                  alt={`${staff.Name}'s avatar`}
                  loading="lazy"
                  className="object-cover"
                />
                <AvatarFallback>
                  {staff.Name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex min-w-0 flex-col">
              <CardTitle className="flex items-center gap-2 truncate">
                {config.icon && React.createElement(config.icon, { style: { color: config.color } })}
                <span style={{ color: config.color }} className="truncate">
                  {staff.Name}
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
