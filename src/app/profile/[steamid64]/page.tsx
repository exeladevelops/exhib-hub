import { type Metadata } from "next";
import { Suspense } from "react";
import { ProfileContent } from "../_components/profile-content";

export const metadata: Metadata = {
  title: "ExhibitionRP Profile",
  description: "View a player's profile.",
};

interface ProfilePageProps {
  params: Promise<{
    steamid64: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { steamid64 } = await params;

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex w-full flex-col gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileContent steamID64={steamid64} />
        </Suspense>
      </div>
    </main>
  );
}
