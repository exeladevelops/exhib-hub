import { Error as ErrorComponent } from "@/components/shared/feedback/error";
import { type ProfileError, profileErrorSchema } from "./types";

const ERROR_MESSAGES = {
  404: "Profile not found",
  500: "Server error",
  default: "Unable to load profile",
} as const;

export function ProfileError({ message, code }: ProfileError) {
  const parsedError = profileErrorSchema.parse({ message, code });
  const title = parsedError.code
    ? (ERROR_MESSAGES[parsedError.code as keyof typeof ERROR_MESSAGES] ??
        ERROR_MESSAGES.default)
    : ERROR_MESSAGES.default;

  return <ErrorComponent message={title} description={parsedError.message} variant="fullscreen" />;
}
