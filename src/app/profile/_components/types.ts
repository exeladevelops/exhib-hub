import { type RouterOutputs } from "@/trpc/react";
import { z } from "zod";

export type ProfileData = RouterOutputs["exhib"]["profile"];
export type NonNullableProfileData = NonNullable<ProfileData>;

export type PlayerSummary = NonNullableProfileData["playerSummary"];
export type UserInfo = NonNullableProfileData["userInfo"];
export type GameInfo = NonNullableProfileData["gameInfo"];

export const profileConfigSchema = z.object({
  color: z.string(),
  displayName: z.string(),
  icon: z.union([z.custom<React.ReactNode>(), z.null()])
});

export const profileErrorSchema = z.object({
  message: z.string(),
  code: z.number().optional()
});

export const profileContentSchema = z.object({
  steamID64: z.string()
});

export const profileStatsSchema = z.object({
  totalTimePlayedHours: z.number(),
  primaryGameServer: z.custom<NonNullableProfileData["primaryGameServer"]>(),
  profileUrl: z.string().url()
});

export const profileServersSchema = z.object({
  gameInfo: z.custom<GameInfo>()
});

export type ProfileConfig = z.infer<typeof profileConfigSchema>;
export type ProfileError = z.infer<typeof profileErrorSchema>;
export type ProfileContentProps = z.infer<typeof profileContentSchema>;
export type ProfileStatsProps = z.infer<typeof profileStatsSchema>;
export type ProfileServersProps = z.infer<typeof profileServersSchema>;

export const profileHeaderSchema = z.object({
  playerSummary: z.custom<PlayerSummary>(),
  userInfo: z.custom<UserInfo>(),
  config: profileConfigSchema,
  primaryGameServer: z.custom<NonNullableProfileData["primaryGameServer"]>(),
  gameInfo: z.custom<GameInfo>()
});

export type ProfileHeaderProps = z.infer<typeof profileHeaderSchema>;
