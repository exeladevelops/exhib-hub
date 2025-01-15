import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-primary/5",
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2.5s_infinite_ease-in-out] before:bg-gradient-to-r",
        "before:from-transparent before:via-primary/10 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
