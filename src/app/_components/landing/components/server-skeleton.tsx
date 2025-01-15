import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServerCardSkeleton() {
  return (
    <Card className="group w-full overflow-hidden transition-all duration-300">
      <CardHeader className="relative h-[300px] p-0">
        <div className="absolute inset-0 bg-muted/50">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 w-full space-y-3 p-6">
          <Skeleton className="h-8 w-[500px] text-2xl" /> {/* Server name */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" /> {/* Icon */}
            <Skeleton className="h-5 w-[220px]" /> {/* Player count */}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
