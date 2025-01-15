import { User2 } from "lucide-react";
import Image from "next/image";
import type { ProfileHeaderProps } from "../types";

export function ProfileHeader({ playerSummary, isLoading }: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {playerSummary.avatarfull ? (
        <Image
          src={playerSummary.avatarfull}
          alt={`${playerSummary.personaname}'s avatar`}
          className="h-16 w-16 rounded-full"
          width={64}
          height={64}
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <User2 className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold">{playerSummary.personaname}</h2>
        <a
          href={playerSummary.profileurl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Steam Profile
        </a>
      </div>
    </div>
  );
} 