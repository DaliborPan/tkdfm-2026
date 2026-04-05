"server-only";

import { cache } from "react";

import { createIntl } from "@formatjs/intl";
import { type Locale, type Messages } from "iqf-web-ui/locale";
import { serverGetIqfMessages } from "iqf-web-ui/locale/server-get-iqf-messages";

import i18nConfig from "./i18n";

const getMessages = async (locale: Locale): Promise<Messages> => {
  "use cache";

  const iqfMessages = await serverGetIqfMessages(locale);
  const appMessages = (await import(`./${locale}.json`)).default;

  return {
    ...iqfMessages,
    ...appMessages,
  };
};

/**
 * This function does not cause errors:
 * - "Uncached data was accessed outside of <Suspense>."
 *
 * It can be used outside of <Suspense>. It's probably because of
 * "locale" is a root parameter and getMessages is 1) cached 2) uses
 * "import()", which is "cacheable". Not sure though.
 */
export const getIntl = cache(async () => {
  // const locale =
  //   ((await rootParamLocale()) as Locale | undefined) ??
  //   (i18nConfig.defaultLocale as Locale);
  const locale = i18nConfig.defaultLocale as Locale;

  const messages = await getMessages(locale);

  return createIntl({
    locale,
    messages,
    onError: () => void 0,
  });
});
