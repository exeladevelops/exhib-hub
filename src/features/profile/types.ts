export interface GameInfo {
  Name: string;
  Rank: string;
  LastTime: number;
  Time: number;
  TimeJoined: number;
  rpname: string;
  wallet: number;
}

export interface PlayerSummary {
  steamid: string;
  avatarfull: string;
  personaname: string;
  profileurl: string;
}

export interface ProfileData {
  playerSummary: PlayerSummary;
  primaryGameServer: string;
  gameInfo: Record<string, GameInfo>;
}

export interface ProfileContentProps {
  steamID64: string;
}

export interface ProfileHeaderProps {
  playerSummary: PlayerSummary;
  isLoading?: boolean;
}

export interface ProfileStatsProps {
  gameInfo: GameInfo[];
  isLoading?: boolean;
}

export interface ProfileServersProps {
  servers: string[];
  isLoading?: boolean;
}

export interface GameCardProps {
  game: GameInfo;
  isLoading?: boolean;
}

export interface ProfileErrorProps {
  error?: Error;
} 