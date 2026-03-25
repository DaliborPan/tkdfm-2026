import * as Sentry from "@sentry/react";
import { type PropsWithChildren, type ReactNode } from "react";

import { CONTEXT_APP, TAG_FEATURE } from "./const";
import { SentryErrorPage } from "./sentry-error-page";
import { type SentryErrorBoundaryDataType } from "./types";

export function SentryErrorBoundary({
  children,
  feature,

  contexts,
  actions,
}: PropsWithChildren<SentryErrorBoundaryDataType & { actions?: ReactNode }>) {
  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope) => {
        scope.setTag(TAG_FEATURE, feature);
        scope.setContext(CONTEXT_APP, contexts ?? {});
      }}
      fallback={(props) => <SentryErrorPage {...props} actions={actions} />}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
