import { memo } from "react";

export const NoStats = memo(function NoStats() {
  return (
    <div
      className="w-full py-8 text-center text-muted-foreground"
      role="status"
    >
      No stats available
    </div>
  );
});
