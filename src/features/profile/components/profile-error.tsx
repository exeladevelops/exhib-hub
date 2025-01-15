import { Error } from "@/components/shared/feedback/error";
import type { ProfileErrorProps } from "../types";

export function ProfileError({ error }: ProfileErrorProps) {
  return (
    <Error
      message="Error Loading Profile"
      description={error?.message ?? "Failed to load profile data. Please try again later."}
      variant="card"
    />
  );
} 