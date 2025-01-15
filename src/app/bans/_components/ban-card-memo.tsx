import { memo } from "react";
import type { RouterOutputs } from "@/trpc/shared";
import { BanCard } from "./ban-card";
import { useBanCardData } from "./hooks/useBanData";

type BanData = RouterOutputs["exhib"]["getBans"]["bans"][number];

interface BanCardMemoProps {
  ban: BanData;
  timeKey?: number;
}

export const BanCardMemo = memo(
  function BanCardMemo({ ban, timeKey }: BanCardMemoProps) {
    const banData = useBanCardData(ban);
    return <BanCard ban={banData} timeKey={timeKey} />;
  },
  (prevProps, nextProps) => {
    if (prevProps.timeKey !== nextProps.timeKey && prevProps.ban.isBanActive) {
      return false;
    }
    return prevProps.ban === nextProps.ban;
  },
);
