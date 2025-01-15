import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BanCardSkeleton() {
  return (
    <Card className="group relative w-full min-w-[340px] overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-[180px]" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <div className="text-muted-foreground/50">•</div>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
        <div className="relative rounded-md bg-muted p-3">
          <div className="absolute inset-y-0 left-0 w-1 rounded-l-md bg-muted-foreground/20" />
          <Skeleton className="ml-3 h-4 w-[90%]" />
        </div>
      </CardContent>
    </Card>
  );
}
