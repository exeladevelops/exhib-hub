import { memo } from "react";
import { StatCardSkeleton } from "./stat-card-skeleton";
import { ServerCardSkeleton } from "./server-skeleton";

export const StatsLoading = memo(function StatsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Server Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Server List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <ServerCardSkeleton />
        <ServerCardSkeleton />
      </div>
    </div>
  );
});
