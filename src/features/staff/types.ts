export interface StaffMember {
  SteamID: string;
  Name: string;
  Rank: string;
  SRank: string | null;
  Time: number;
  LastTime: number;
  Server: string;
  Sits: number;
  LastConnect: number;
  LastDisconnect: number;
  SteamID64: string;
}

export interface StaffSummary {
  steamid: string;
  avatarfull: string;
}

export interface StaffData {
  staff: StaffMember[];
  summaries: StaffSummary[];
}

export interface StaffCardProps {
  member: StaffMember;
  summary?: StaffSummary;
  isLoading?: boolean;
}

export interface StaffListProps {
  data?: StaffData;
  isLoading?: boolean;
  error?: Error;
}

export interface StaffErrorProps {
  error?: Error;
} 