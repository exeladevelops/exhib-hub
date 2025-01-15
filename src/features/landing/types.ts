export interface Server {
  ip: string;
  hostname: string;
  map: string;
  players: number;
  maxPlayers: number;
}

export interface StatsData {
  totalOnlinePlayers: number;
  maxOnlinePlayers: number;
  totalPlayers: number;
  totalTimePlayed: string;
  steamGroupUserCount: number;
  servers: Server[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down" | "neutral";
  };
}

export interface ServerCardProps {
  server: Server;
  isLoading?: boolean;
} 