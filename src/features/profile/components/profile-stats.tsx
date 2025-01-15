import { Clock, Wallet, Gamepad2 } from "lucide-react";
import type { ProfileStatsProps } from "../types";

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) return "< 1 hour";
  return `${hours} ${hours === 1 ? "hour" : "hours"}`;
}

export function ProfileStats({ gameInfo, isLoading }: ProfileStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-5 w-5 rounded bg-gray-200" />
            </div>
            <div className="mt-2">
              <div className="h-8 w-1/2 rounded bg-gray-200" />
              <div className="mt-1 h-4 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalPlaytime = gameInfo.reduce((total, game) => total + game.Time, 0);
  const totalWallet = gameInfo.reduce((total, game) => total + game.wallet, 0);
  const activeGames = gameInfo.filter(game => game.LastTime > Date.now() / 1000 - 30 * 24 * 60 * 60);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Playtime</p>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-2 text-2xl font-semibold">{formatTime(totalPlaytime)}</p>
      </div>
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Active Games</p>
          <Gamepad2 className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-2 text-2xl font-semibold">{activeGames.length}</p>
      </div>
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Wallet</p>
          <Wallet className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-2 text-2xl font-semibold">${totalWallet.toLocaleString()}</p>
      </div>
    </div>
  );
} 