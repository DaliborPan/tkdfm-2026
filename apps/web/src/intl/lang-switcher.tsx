"use client";

import { useCurrentLocale } from "next-i18n-router/client";
import { usePathname, useRouter } from "next/navigation";
import { useIntl } from "react-intl";

import { type Locale } from "iqf-web-ui/locale";
import { Select } from "iqf-web-ui/select";

import i18nConfig from "./i18n";

export default function LanguageSwitcher() {
  const intl = useIntl();
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useCurrentLocale(i18nConfig) as Locale;

  const options = [
    {
      title: "CS",
      id: "cs",
    },
    {
      title: "EN",
      id: "en",
    },
  ];

  return (
    <Select
      aria-label={intl.formatMessage({
        id: "language-switcher.aria-label",
        defaultMessage: "Přepínač jazyků",
      })}
      wrapperClassName="md:items-end"
      className="w-20 bg-neutral-950 text-white hover:bg-neutral-900"
      onChange={(value) => {
        if (!value) return;

        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `; expires=${date.toUTCString()}`;
        document.cookie = `NEXT_LOCALE=${value.id};expires=${expires};path=/`;

        if (
          currentLocale === i18nConfig.defaultLocale &&
          !i18nConfig.prefixDefault
        ) {
          router.push(`/${value.id}${currentPathname}`);
        } else {
          router.push(
            currentPathname.replace(`/${currentLocale}`, `/${value.id}`),
          );
        }

        router.refresh();
      }}
      value={options.find((opt) => opt.id === currentLocale)}
      options={options}
      showClearButton={false}
    />
  );
}
