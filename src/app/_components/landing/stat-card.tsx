import { memo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatCardProps } from "./types";
import { cn } from "@/lib/utils";

const StatCardContent = memo(function StatCardContent({
  title,
  value,
  icon,
  href,
  className = "",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        className,
        "group relative bg-card/50 backdrop-blur-sm transition-all duration-300",
        href &&
          "cursor-pointer hover:scale-[1.02] hover:bg-card/70 hover:shadow-md",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        {icon && (
          <div
            className={cn(
              "h-4 w-4 text-muted-foreground transition-colors duration-300",
              href && "group-hover:text-primary",
            )}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold transition-colors duration-300",
            href && "group-hover:text-primary",
          )}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
});

export const StatCard = memo(function StatCard({
  title,
  value,
  icon,
  className = "",
  href,
}: StatCardProps) {
  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <StatCardContent
          title={title}
          value={value}
          icon={icon}
          href={href}
          className={className}
        />
      </Link>
    );
  }

  return (
    <div className={className}>
      <StatCardContent
        title={title}
        value={value}
        icon={icon}
        className={className}
      />
    </div>
  );
});
