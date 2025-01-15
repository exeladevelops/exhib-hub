import { Users, Clock, Users2 } from "lucide-react";
import { StatCard } from "./stat-card";
import { ServerCard } from "./server-card";
import { useHomeQuery } from "@/hooks";

export function Stats() {
  const { data, isLoading } = useHomeQuery();

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCard
              key={i}
              title="Loading..."
              value="..."
              isLoading={true}
            />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <ServerCard key={i} server={{
              hostname: "",
              map: "",
              players: 0,
              maxPlayers: 0,
              ip: ""
            }} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Online Players"
          value={data.totalOnlinePlayers}
          description={`Peak today: ${data.maxOnlinePlayers}`}
          icon={<Users className="h-5 w-5" />}
          trend={{
            value: Math.round((data.totalOnlinePlayers / data.maxOnlinePlayers) * 100),
            label: "of peak",
            direction: "neutral"
          }}
        />
        <StatCard
          title="Total Players"
          value={data.totalPlayers.toLocaleString()}
          icon={<Users2 className="h-5 w-5" />}
        />
        <StatCard
          title="Total Playtime"
          value={data.totalTimePlayed}
          icon={<Clock className="h-5 w-5" />}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.servers.map((server) => (
          <ServerCard key={server.ip} server={server} />
        ))}
      </div>
    </div>
  );
} 