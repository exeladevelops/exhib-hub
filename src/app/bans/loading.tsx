import { BanCardSkeleton } from "./_components/ban-card-skeleton";

export default function BansLoading() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BanCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
