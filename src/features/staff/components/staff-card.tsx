import { Clock, User2 } from "lucide-react";
import Image from "next/image";
import type { StaffCardProps } from "../types";

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) return "< 1 hour";
  return `${hours} ${hours === 1 ? "hour" : "hours"}`;
}

function formatLastSeen(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function StaffCard({ member, summary, isLoading }: StaffCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border p-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="h-5 w-1/3 rounded bg-gray-200" />
            <div className="mt-2 space-y-2">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-4">
        {summary?.avatarfull ? (
          <Image
            src={summary.avatarfull}
            alt={`${member.Name}'s avatar`}
            className="h-12 w-12 rounded-full"
            width={48}
            height={48}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <User2 className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div>
          <h3 className="font-medium">{member.Name}</h3>
          <div className="mt-1 space-y-1 text-sm text-gray-500">
            <p>Rank: {member.Rank}</p>
            {member.SRank && <p>Special Rank: {member.SRank}</p>}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Time: {formatTime(member.Time)}</span>
            </div>
            <p>Last Seen: {formatLastSeen(member.LastTime)}</p>
            <p>Server: {member.Server}</p>
            <p>Sits: {member.Sits}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 