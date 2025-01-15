export interface Ban {
  SteamID: string;
  AdminName: string;
  AdminSteamID: string;
  Reason: string;
  UnbanReason: string | null;
  Length: number;
  Time: number;  // Ban start time in Unix timestamp
  TimeUnbanned: number | null;
  ServerID: string;
  Active: boolean;
}

export interface BanFilter {
  active?: boolean;
  serverId?: string;
  search?: string;
} 