import { memo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  message: string;
  description?: string;
  className?: string;
  variant?: "default" | "card" | "fullscreen";
  action?: React.ReactNode;
}

export const Error = memo(function Error({
  message,
  description,
  className = "",
  variant = "default",
  action,
}: ErrorProps) {
  if (variant === "fullscreen") {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">{message}</h2>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card
        className={cn(
          "w-full border-destructive/20 bg-destructive/5",
          className
        )}
      >
        <CardContent className="flex items-start gap-3 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="text-sm font-medium text-foreground">{message}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4",
        className,
      )}
    >
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
      <div>
        <h3 className="text-sm font-medium text-foreground">{message}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
});
