import { Clock, Wallet } from "lucide-react";
import type { GameCardProps } from "../types";

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) return "< 1 hour";
  return `${hours} ${hours === 1 ? "hour" : "hours"}`;
}

function formatLastSeen(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function GameCard({ game, isLoading }: GameCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border p-4">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="mt-2 space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">{game.Name}</h3>
      <div className="mt-2 space-y-1 text-sm text-gray-500">
        <p>Rank: {game.Rank}</p>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Time: {formatTime(game.Time)}</span>
        </div>
        <p>Last Seen: {formatLastSeen(game.LastTime)}</p>
        <p>RP Name: {game.rpname}</p>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span>Wallet: ${game.wallet.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
} 