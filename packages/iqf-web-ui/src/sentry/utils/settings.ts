import * as Sentry from "@sentry/react";

export function sentrySetTag(name: string, value: string) {
  Sentry.setTag(name, value);
}
