import * as Sentry from "@sentry/react";

import { CONTEXT_APP, TAG_FEATURE } from "../const";
import { type SentryErrorBoundaryDataType } from "../types";

export function sentyCaptureException({
  error,
  feature,
  contexts,
}: {
  error: unknown;
} & SentryErrorBoundaryDataType) {
  Sentry.captureException(error, {
    tags: {
      [TAG_FEATURE]: feature,
    },
    contexts: { [CONTEXT_APP]: contexts },
  });
}
