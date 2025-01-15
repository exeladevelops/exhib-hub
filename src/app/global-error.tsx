'use client';

import { Error as ErrorComponent } from "@/components/shared/feedback/error";

export default function GlobalError({
  error,
  _reset,
}: {
  error: Error & { digest?: string }
  _reset: () => void
}) {
  return (
    <html>
      <body>
        <ErrorComponent
          message="Something went wrong"
          description={error.message}
          variant="fullscreen"
        />
      </body>
    </html>
  );
} 