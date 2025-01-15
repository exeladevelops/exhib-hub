import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import type { StatCardProps } from "../types";

export function StatCard({ title, value, description, icon, trend, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-5 w-5 rounded bg-gray-200" />
        </div>
        <div className="mt-2">
          <div className="h-8 w-1/2 rounded bg-gray-200" />
          <div className="mt-1 h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  const TrendIcon = trend?.direction === "up" ? ArrowUp :
    trend?.direction === "down" ? ArrowDown : ArrowRight;

  const trendColor = trend?.direction === "up" ? "text-green-600" :
    trend?.direction === "down" ? "text-red-600" : "text-gray-600";

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold">{value}</p>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        {trend && (
          <div className={`mt-2 flex items-center gap-1 text-sm ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span>{trend.value}%</span>
            <span className="text-gray-500">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
} 