import { memo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  variant?: "default" | "card" | "list";
  count?: number;
  className?: string;
  itemClassName?: string;
}

export const Loading = memo(function Loading({
  variant = "default",
  count = 3,
  className,
  itemClassName,
}: LoadingProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === "card") {
    return (
      <div className={cn("grid gap-4 sm:gap-6", className)}>
        {items.map((i) => (
          <div
            key={i}
            className={cn("rounded-xl border bg-card p-6", itemClassName)}
          >
            <Skeleton className="mb-4 h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-3", className)}>
        {items.map((i) => (
          <div
            key={i}
            className={cn("flex items-center space-x-4", itemClassName)}
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {items.map((i) => (
        <Skeleton key={i} className={cn("h-4 w-full", itemClassName)} />
      ))}
    </div>
  );
});
