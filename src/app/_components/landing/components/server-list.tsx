import { memo } from "react";
import { ServerCard } from "../server-card";
import type { HomeData } from "../types";

interface ServerListProps {
  servers: HomeData["servers"];
  className?: string;
}

export const ServerList = memo(function ServerList({
  servers,
  className,
}: ServerListProps) {
  if (!servers.length) return null;

  return (
    <div className={className} role="list" aria-label="Game Servers">
      {servers.map((server) => (
        <div key={server.ip} role="listitem" className="h-full">
          <ServerCard
            server={server}
            className={servers.length === 1 ? "col-span-2 h-full" : "h-full"}
          />
        </div>
      ))}
    </div>
  );
});
