"use client";

import { memo } from "react";
import type { RouterOutputs } from "@/trpc/shared";
import { BanCardMemo } from "./ban-card-memo";

type BanData = RouterOutputs["exhib"]["getBans"]["bans"][number];

interface BanListProps {
  bans: BanData[];
}

export const BanList = memo(function BanList({ bans }: BanListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bans.map((ban) => (
        <BanCardMemo 
          key={`${ban.id}-${ban.SteamID64}-${ban.Time}`} 
          ban={ban} 
        />
      ))}
    </div>
  );
});
