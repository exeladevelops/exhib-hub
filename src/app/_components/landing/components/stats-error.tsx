import { memo } from "react";
import { Error } from "@/components/shared/feedback/error";

export const StatsError = memo(function StatsError() {
  return (
    <Error
      message="Unable to load statistics"
      variant="fullscreen"
    />
  );
});
