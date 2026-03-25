import type { MessageFormatElement } from "react-intl";

import { type Locale } from "./schema";

export type Messages =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

/**
 * Each layout/page in Next.js receives these params when using
 * next-i18next package.
 */
export type LocalePageParams = {
  params: {
    locale: Locale;
  };
};

/**
 * Each layout/page in Next.js receives these params when using
 * next-i18next package. This type should be used only for Page/Layout components.
 */
export type LocalePageParamsPromise = {
  params: Promise<{
    locale: Locale;
  }>;
};
