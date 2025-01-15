import { Skeleton } from "@/components/ui/skeleton";

export function StaffSkeleton() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex w-full flex-col gap-8 sm:gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-48" /> {/* "Our Team" */}
          <Skeleton className="h-6 w-72" /> {/* Description */}
        </div>

        {/* Leadership Section */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-36" /> {/* Section title */}
            <div className="h-[1px] flex-1 bg-muted-foreground/10" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[76px] w-full rounded-xl" />
            ))}
          </div>
        </section>

        {/* Management Section */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-40" />
            <div className="h-[1px] flex-1 bg-muted-foreground/10" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[76px] w-full rounded-xl" />
            ))}
          </div>
        </section>

        {/* Moderation Section */}
        <section className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-40" />
            <div className="h-[1px] flex-1 bg-muted-foreground/10" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[76px] w-full rounded-xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
