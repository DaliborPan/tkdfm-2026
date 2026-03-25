import { type ReactNode } from "react";

import { SentryErrorDevPage } from "./components/sentry-error-dev-page";
import { SentryErrorUserPage } from "./components/sentry-error-user-page";
import { useSentryContext } from "./sentry-context";

export function SentryErrorPage({
  error,
  componentStack,
  resetError,
  eventId,
  actions,
}: {
  error: unknown;
  componentStack?: string | null;
  resetError: () => void;
  eventId?: string | null;
  actions?: ReactNode;
}) {
  const ctx = useSentryContext();

  if (!ctx) {
    throw error;
  }

  if (ctx.mode === "Development") {
    return (
      <SentryErrorDevPage
        error={error}
        componentStack={componentStack}
        resetError={resetError}
      />
    );
  }

  return <SentryErrorUserPage eventId={eventId} actions={actions} />;
}
