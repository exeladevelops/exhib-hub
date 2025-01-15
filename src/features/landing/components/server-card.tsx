import { Users } from "lucide-react";
import type { ServerCardProps } from "../types";

export function ServerCard({ server, isLoading }: ServerCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border p-4">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="mt-2 space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">{server.hostname}</h3>
      <div className="mt-2 space-y-1 text-sm text-gray-500">
        <p>Map: {server.map}</p>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>
            {server.players}/{server.maxPlayers} players
          </span>
        </div>
      </div>
    </div>
  );
} 