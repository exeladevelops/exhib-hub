import { memo, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "../stat-card";
import { ServerList } from "./server-list";
import { useStats } from "../hooks/useStats";
import type { HomeData } from "../types";

import { HiOutlineStatusOnline, HiOutlineClock } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { FaDiscord, FaSteam } from "react-icons/fa";

export const StatsContent = memo(function StatsContent({
  data,
}: {
  data: HomeData;
}) {
  const { filterServers, stats } = useStats(data);

  return (
    <div
      role="region"
      aria-label="Server Statistics"
      className="flex flex-col gap-6"
    >
      {/* Server Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <StatCard
          title="Online Players"
          value={`${stats.totalOnlinePlayers}/${stats.maxOnlinePlayers}`}
          icon={<HiOutlineStatusOnline aria-hidden="true" />}
        />
        <StatCard
          title="Total Players"
          value={data.totalPlayers.toLocaleString()}
          icon={<BsPeopleFill aria-hidden="true" />}
        />
        <StatCard
          title="Total Time Played"
          value={`${Math.floor(Number(data.totalTimePlayed) / 3600).toLocaleString()} Hours`}
          icon={<HiOutlineClock aria-hidden="true" />}
        />
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <StatCard
          title="Join our Discord"
          value="7,000 Members"
          icon={<FaDiscord aria-hidden="true" />}
          href="https://discord.gg/Wvg4bC95Sc"
        />
        <StatCard
          title="Join our Steam Group"
          value={`${data.steamGroupUserCount.toLocaleString()} Members`}
          icon={<FaSteam aria-hidden="true" />}
          href="https://steamcommunity.com/groups/Exhibitionrpp"
        />
      </div>

      {/* Server List */}
      <Suspense
        fallback={
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
            role="status"
          >
            <Skeleton className="aspect-video" />
            <Skeleton className="aspect-video" />
          </div>
        }
      >
        <ServerList
          servers={filterServers}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
        />
      </Suspense>
    </div>
  );
});
