import { Error } from "@/components/shared/feedback/error";
import type { StaffErrorProps } from "../types";

export function StaffError({ error }: StaffErrorProps) {
  return (
    <Error
      message="Error Loading Staff"
      description={error?.message ?? "Failed to load staff data. Please try again later."}
      variant="card"
    />
  );
} 