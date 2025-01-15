import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreLoading() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <Card className="w-full max-w-2xl">
        <div className="space-y-4 p-6">
          <Skeleton className="mx-auto h-8 w-64" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex justify-center pt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </Card>
    </main>
  );
}
