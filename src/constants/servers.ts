import { Server } from "./types";

export const serverThemes = {
  [Server.MBRP]: {
    primary: "#7e22ce",
    secondary: "#6b21a8",
  },
  [Server.DRP]: {
    primary: "#1d4ed8",
    secondary: "#1e40af",
  },
} as const;

export type ServerTheme = typeof serverThemes;
export type ServerType = keyof ServerTheme;
