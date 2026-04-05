"use client";

import { type ComponentProps, type PropsWithChildren } from "react";

import { IntlProvider as ReactIntlProvider } from "react-intl";

export function IntlProvider({
  children,
  messages,
  locale,
}: PropsWithChildren<{
  messages: ComponentProps<typeof ReactIntlProvider>["messages"];
  locale: string;
}>) {
  return (
    <ReactIntlProvider
      messages={messages}
      onError={() => void 0}
      locale={locale}
    >
      {children}
    </ReactIntlProvider>
  );
}
