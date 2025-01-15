import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const StaffSkeleton = memo(function StaffSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading staff list"
      className="flex w-full flex-col gap-8 sm:gap-10"
    >
      {/* Leadership Section */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[1px] flex-1" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          <Skeleton className="h-[104px]" />
          <Skeleton className="h-[104px]" />
        </div>
      </div>

      {/* Management Section */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[1px] flex-1" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          <Skeleton className="h-[104px]" />
          <Skeleton className="h-[104px]" />
          <Skeleton className="h-[104px]" />
        </div>
      </div>

      {/* Moderation Section */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[1px] flex-1" />
        </div>
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Server 1 */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <Skeleton className="h-6 w-24" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              <Skeleton className="h-[104px]" />
              <Skeleton className="h-[104px]" />
              <Skeleton className="h-[104px]" />
              <Skeleton className="h-[104px]" />
            </div>
          </div>
          {/* Server 2 */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <Skeleton className="h-6 w-24" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              <Skeleton className="h-[104px]" />
              <Skeleton className="h-[104px]" />
              <Skeleton className="h-[104px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
