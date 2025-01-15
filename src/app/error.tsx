'use client';

import { Error as ErrorComponent } from "@/components/shared/feedback/error";

export default function ErrorPage({
  error,
  _reset,
}: {
  error: Error & { digest?: string }
  _reset: () => void
}) {
  return (
    <ErrorComponent
      message="Something went wrong"
      description={error.message}
      variant="fullscreen"
    />
  );
} 