import type z from "zod";
import { fromZodError } from "zod-validation-error";

import { sentyCaptureException } from "../sentry/utils/capture-exception";

export function createDefaultSafePaseErrorHandler({
  method,
  api,
}: {
  /**
   * HTTP method
   */
  method: string;

  /**
   * API endpoint
   */
  api: string;
}) {
  return (error: z.ZodError) => {
    console.log(
      `[QUERY ZOD_ERROR]\n`,
      `${method} ${api}\n\n`,
      fromZodError(error).message,
    );
  };
}

/**
 * Safely parse the data using the provided schema.
 *
 * If parsing fails, `onError` is called and the original data is returned.
 * If parsing succeeds, the data is parsed using `schema.parse()`.
 */
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  {
    onError,
  }: { onError?: ReturnType<typeof createDefaultSafePaseErrorHandler> } = {},
): T {
  const parsedData = schema.safeParse(data);

  if (parsedData.success) {
    return schema.parse(data);
  }

  if (onError) {
    sentyCaptureException({
      error: parsedData.error,
      feature: "zod",
      contexts: { schema, data },
    });
    onError(parsedData.error);
  }

  return data as unknown as T;
}
