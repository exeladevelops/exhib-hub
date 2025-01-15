export interface Server {
  ip: string;
  hostname: string;
  map: string;
  players: number;
  maxPlayers: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
  href?: string;
}

export interface ServerCardProps extends Server {
  className?: string;
}

export interface Stats {
  totalOnlinePlayers: number;
  maxOnlinePlayers: number;
}

export interface HomeData {
  servers: Server[];
  totalPlayers: number;
  totalTimePlayed: string;
  steamGroupUserCount: number;
  totalOnlinePlayers: number;
  maxOnlinePlayers: number;
}

export interface StaffMember {
  SteamID64: string;
  SteamID: string;
  Name: string;
  Rank: string;
  SRank: string;
  Server: string;
  Time: number;
  LastTime: number;
  avatarfull?: string;
  Playtime?: number;
  LastSeen?: string;
}

export interface StaffApiResponse {
  staff: StaffMember[];
  summaries: Array<{
    steamid: string;
    avatarfull: string;
  }>;
}

export interface ErrorComponentProps {
  message?: string;
  description?: string;
}
