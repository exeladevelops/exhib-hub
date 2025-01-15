import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card className="group relative w-full bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[240px] text-sm" /> {/* Title */}
        <Skeleton className="h-4 w-4" /> {/* Icon */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[320px] text-2xl" /> {/* Value */}
      </CardContent>
    </Card>
  );
}
