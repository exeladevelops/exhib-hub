import { z } from "zod";

export enum Server {
  DRP = "DarkRP",
  MBRP = "MBRP",
}

export type ServerType = keyof typeof Server;

export const staffRankSchema = z.enum([
  "superadmin",
  "manager",
  "developer",
  "senioradmin",
  "headadmin",
  "admin",
  "seniormod",
  "moderator",
  "trialmod",
]);

export const donatorRankSchema = z.enum([
  "legend",
  "exhibitionist",
  "vipplus",
  "vip",
]);

export const rankTypeSchema = z.union([staffRankSchema, donatorRankSchema]);

export const serverTypeSchema = z.nativeEnum(Server);

export type StaffRank = z.infer<typeof staffRankSchema>;
export type DonatorRank = z.infer<typeof donatorRankSchema>;
export type RankType = z.infer<typeof rankTypeSchema>;
