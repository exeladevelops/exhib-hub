export interface BanData {
  id: number;
  SteamID: string;
  Name: string;
  ASteamID: string;
  AName: string;
  Time: number;
  Length: number;
  Reason: string;
  UnbanReason: string | null;
  Server: string;
  SteamID64: string;
  ASteamID64: string;
  date: string;
  userProfile: {
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    name: string;
    profileUrl: string;
  };
  adminProfile: {
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    name: string;
    profileUrl: string;
  };
  isUnbanned: boolean;
  isBanActive: boolean;
  prettyTimeLeft: string;
}

export interface GroupedBans {
  active: BanData[];
  expired: BanData[];
  unbanned: BanData[];
}
