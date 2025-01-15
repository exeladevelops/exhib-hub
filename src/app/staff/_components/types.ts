import { z } from "zod";

export const staffMemberSchema = z.object({
  SteamID64: z.string(),
  SteamID: z.string(),
  Name: z.string(),
  Rank: z.string(),
  Server: z.string(),
  avatarfull: z.string().optional().default(""),
  SRank: z.string().nullable().default(null),
  Time: z.number(),
  LastTime: z.number(),
  Sits: z.number().default(0),
  LastConnect: z.number().default(0),
  LastDisconnect: z.number().default(0),
  Playtime: z.number().optional().default(0),
  LastSeen: z.string().optional().default(""),
});

export const staffSummarySchema = z.object({
  steamid: z.string(),
  avatarfull: z.string(),
});

export const staffApiResponseSchema = z.object({
  staff: z.array(staffMemberSchema),
  summaries: z.array(staffSummarySchema),
});

export type StaffMember = z.infer<typeof staffMemberSchema>;
export type StaffSummary = z.infer<typeof staffSummarySchema>;
export type StaffApiResponse = z.infer<typeof staffApiResponseSchema>;
export type StaffGroup = StaffMember[];
export type GroupedStaff = Record<string, StaffGroup>;

export interface StaffCardProps {
  staff: StaffMember;
}

export interface StaffSectionProps {
  title: string;
  staff: StaffGroup;
}

export interface StaffContentProps {
  staff: GroupedStaff;
}
