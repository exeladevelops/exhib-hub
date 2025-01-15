import { memo, useEffect, useState, useCallback } from "react";
import type { Ban } from "../types";
import { BanService } from "../services/ban-service";

interface BanCardProps {
  ban: Ban;
}

export const BanCard = memo(function BanCard({ ban }: BanCardProps) {
  const [timeLeft, setTimeLeft] = useState(() => 
    BanService.formatTimeLeft(ban.Length, ban.Time)
  );

  const updateTimeLeft = useCallback(() => {
    setTimeLeft(BanService.formatTimeLeft(ban.Length, ban.Time));
  }, [ban.Length, ban.Time]);

  useEffect(() => {
    // Only set up interval for non-permanent, active bans
    if (ban.Length === 0 || !ban.Active) return;

    // Initial update
    updateTimeLeft();

    // Set up interval with dynamic refresh rate
    const refreshRate = BanService.getRefreshInterval(ban.Length, ban.Time);
    const interval = setInterval(updateTimeLeft, refreshRate);

    return () => clearInterval(interval);
  }, [ban.Length, ban.Time, ban.Active, updateTimeLeft]);

  // Update time left when ban data changes
  useEffect(() => {
    updateTimeLeft();
  }, [ban, updateTimeLeft]);

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{ban.SteamID}</h3>
          <p className="text-sm text-gray-500">By: {ban.AdminName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{timeLeft}</p>
          <p className="text-xs text-gray-500">
            {ban.Active ? "Active" : ban.UnbanReason ? "Unbanned" : "Expired"}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm">{ban.Reason}</p>
      {ban.UnbanReason && (
        <p className="mt-1 text-sm text-gray-500">
          Unban reason: {ban.UnbanReason}
        </p>
      )}
    </div>
  );
}); 