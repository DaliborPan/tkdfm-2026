import { useRouteError } from "react-router";

/**
 * A component designed to be used as an errorElement in react-router routes.
 * It catches the routing error and re-throws it so it can be captured by the
 * nearest error boundary (e.g., Sentry's ErrorBoundary).
 */
export function SentryErrorBubbler() {
  const error = useRouteError();

  if (error) {
    throw error;
  }

  return null;
}
