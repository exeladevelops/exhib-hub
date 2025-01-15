export function StaffSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border p-4">
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
        ))}
      </div>
    </div>
  );
} 