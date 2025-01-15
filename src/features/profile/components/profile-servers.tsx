import { Server } from "lucide-react";
import type { ProfileServersProps } from "../types";

export function ProfileServers({ servers, isLoading }: ProfileServersProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-gray-400" />
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg border bg-gray-50" />
          ))}
        </div>
      </div>
    );
  }

  if (!servers.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Server className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-medium">Active Servers</h3>
      </div>
      <div className="space-y-2">
        {servers.map((server, index) => (
          <div
            key={index}
            className="rounded-lg border bg-gray-50 p-3 text-sm"
          >
            {server}
          </div>
        ))}
      </div>
    </div>
  );
} 