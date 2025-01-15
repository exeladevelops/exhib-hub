import { memo } from "react";
import type { Ban } from "../types";
import { BanCard } from "./ban-card";
import { useBanCardData } from "../hooks/use-ban-data";

interface BanCardMemoProps {
  ban: Ban;
}

export const BanCardMemo = memo(
  function BanCardMemo({ ban }: BanCardMemoProps) {
    const banData = useBanCardData(ban);
    return <BanCard ban={banData} />;
  },
  (prevProps, nextProps) => {
    // Only re-render if the ban data has changed
    return prevProps.ban === nextProps.ban;
  },
); 