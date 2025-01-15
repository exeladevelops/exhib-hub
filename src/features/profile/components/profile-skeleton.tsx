export function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-48 rounded bg-gray-200" />
          <div className="h-3 w-32 rounded bg-gray-200" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="mt-2 h-6 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Servers Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-gray-200" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg border bg-gray-50" />
        ))}
      </div>
    </div>
  );
} 