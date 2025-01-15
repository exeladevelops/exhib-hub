import { useMemo } from "react";
import type { Ban } from "../types";

export function useBanCardData(ban: Ban): Ban {
  return useMemo(() => {
    return {
      ...ban,
      // Add any computed properties here if needed
    };
  }, [ban]);
} 