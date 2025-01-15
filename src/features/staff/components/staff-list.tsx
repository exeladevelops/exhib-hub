import { StaffCard } from "./staff-card";
import { StaffError } from "./staff-error";
import { StaffSkeleton } from "./staff-skeleton";
import type { StaffListProps } from "../types";

export function StaffList({ data, isLoading, error }: StaffListProps) {
  if (isLoading) {
    return <StaffSkeleton />;
  }

  if (error || !data) {
    return <StaffError error={error} />;
  }

  const findSummary = (steamid: string) => {
    return data.summaries.find(summary => summary.steamid === steamid);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.staff.map((member) => (
        <StaffCard
          key={member.SteamID}
          member={member}
          summary={findSummary(member.SteamID)}
        />
      ))}
    </div>
  );
} 