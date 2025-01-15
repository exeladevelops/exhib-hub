import { ProfileSkeleton } from "./_components/profile-skeleton";

export default function ProfileLoading() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <ProfileSkeleton />
    </main>
  );
}
