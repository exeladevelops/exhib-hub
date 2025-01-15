"use client";

import { memo, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "./stat-card";
import { ServerCard } from "./server-card";
import { useStats } from "./hooks/useStats";
import type { HomeData, Server } from "./types";
import { Error } from "@/components/shared/feedback/error";
import { useHomeQuery } from "@/hooks/useExhibQueries";

import { HiOutlineStatusOnline, HiOutlineClock } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { FaDiscord, FaSteam } from "react-icons/fa";

const StatsLoading = memo(function StatsLoading() {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
        {/* Server Stats Skeletons */}
        <Skeleton className="h-[104px] lg:col-span-2" />
        <Skeleton className="h-[104px] lg:col-span-2" />
        <Skeleton className="h-[104px] lg:col-span-2" />
        {/* Socials Skeletons */}
        <Skeleton className="h-[104px] sm:col-span-1 lg:col-span-3" />
        <Skeleton className="h-[104px] sm:col-span-1 lg:col-span-3" />
      </div>
      {/* Servers Skeletons */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <Skeleton className="h-[160px]" />
        <Skeleton className="h-[160px]" />
      </div>
    </>
  );
});

const StatsError = memo(function StatsError() {
  return <Error message="Unable to load statistics" />;
});

const NoStats = memo(function NoStats() {
  return <div className="w-full py-8 text-center">No stats available</div>;
});

const ServerList = memo(function ServerList({
  servers,
  className,
}: {
  servers: Server[];
  className?: string;
}) {
  return (
    <div className={className}>
      {servers.map((server, index) => (
        <ServerCard
          key={server.ip}
          server={server}
          priority={index < 2}
          className={servers.length === 1 ? "sm:col-span-2" : undefined}
        />
      ))}
    </div>
  );
});

const StatsContent = memo(function StatsContent({ data }: { data: HomeData }) {
  const { filterServers, stats, socialStats } = useStats(data);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 pb-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
        {/* Server Stats */}
        <StatCard
          title="Online Players"
          value={`${stats.totalOnlinePlayers}/${stats.maxOnlinePlayers}`}
          icon={<HiOutlineStatusOnline aria-hidden="true" />}
          className="lg:col-span-2"
        />
        <StatCard
          title="Total Players"
          value={socialStats.totalPlayers.toLocaleString()}
          icon={<BsPeopleFill aria-hidden="true" />}
          className="lg:col-span-2"
        />
        <StatCard
          title="Total Time Played"
          value={`${Math.floor(Number(socialStats.totalTimePlayed) / 3600).toLocaleString()} Hours`}
          icon={<HiOutlineClock aria-hidden="true" />}
          className="lg:col-span-2"
        />
        {/* Socials */}
        <StatCard
          title="Join our Discord"
          value="7,000 Members"
          icon={<FaDiscord aria-hidden="true" />}
          className="sm:col-span-1 lg:col-span-3"
          href="https://discord.gg/Wvg4bC95Sc"
        />
        <StatCard
          title="Join our Steam Group"
          value={`${socialStats.steamGroupUserCount.toLocaleString()} Members`}
          icon={<FaSteam aria-hidden="true" />}
          className="sm:col-span-1 lg:col-span-3"
          href="https://steamcommunity.com/groups/Exhibitionrpp"
        />
      </div>

      {/* Servers */}
      <Suspense
        fallback={
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <Skeleton className="h-[160px]" />
            <Skeleton className="h-[160px]" />
          </div>
        }
      >
        <ServerList
          servers={filterServers}
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
        />
      </Suspense>
    </>
  );
});

export function Stats() {
  const { data, isLoading, error } = useHomeQuery();

  if (isLoading) return <StatsLoading />;
  if (error) return <StatsError />;
  if (!data) return <NoStats />;

  return <StatsContent data={data} />;
}
