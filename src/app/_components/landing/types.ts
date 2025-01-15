import { z } from "zod";

export const serverSchema = z.object({
  ip: z.string(),
  hostname: z.string(),
  map: z.string(),
  players: z.number().int().min(0),
  maxPlayers: z.number().int().min(0),
});

export const homeDataSchema = z.object({
  servers: z.array(serverSchema),
  totalPlayers: z.number().int().min(0),
  totalTimePlayed: z.string(),
  steamGroupUserCount: z.number().int().min(0),
  totalOnlinePlayers: z.number().int().min(0),
  maxOnlinePlayers: z.number().int().min(0),
});

export const statsSchema = z.object({
  totalOnlinePlayers: z.number().int().min(0),
  maxOnlinePlayers: z.number().int().min(0),
});

export type Server = z.infer<typeof serverSchema>;
export type HomeData = z.infer<typeof homeDataSchema>;
export type Stats = z.infer<typeof statsSchema>;

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
