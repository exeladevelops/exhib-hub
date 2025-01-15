import { memo } from "react";
import type { ProfileContentProps } from "../types";
import { ProfileError } from "./profile-error";
import { ProfileHeader } from "./profile-header";
import { ProfileStats } from "./profile-stats";
import { ProfileServers } from "./profile-servers";
import { ProfileSkeleton } from "./profile-skeleton";
import { useProfileData } from "../hooks/use-profile-data";

export const ProfileContent = memo(function ProfileContent({
  steamID64,
}: ProfileContentProps) {
  const { profileData, isLoading, error } = useProfileData(steamID64);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profileData) {
    return <ProfileError error={error instanceof Error ? error : new Error(error?.message)} />;
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        playerSummary={profileData.playerSummary}
      />
      <ProfileStats
        gameInfo={Object.values(profileData.gameInfo)}
      />
      <ProfileServers servers={[profileData.primaryGameServer]} />
    </div>
  );
}); 