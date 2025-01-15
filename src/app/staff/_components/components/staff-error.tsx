import { memo } from "react";
import { Error } from "@/components/shared/feedback/error";

export const StaffError = memo(function StaffError() {
  return (
    <Error
      message="Unable to load staff list"
      variant="fullscreen"
    />
  );
});
