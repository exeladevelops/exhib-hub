import { logger } from "./logger";

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleAPIError(error: unknown) {
  const errorDetails = error instanceof Error 
    ? { message: error.message, stack: error.stack } 
    : { message: String(error) };
    
  logger.error("API Error occurred", errorDetails);

  if (error instanceof APIError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
      }),
      {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (error instanceof Error) {
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(
    JSON.stringify({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
}
