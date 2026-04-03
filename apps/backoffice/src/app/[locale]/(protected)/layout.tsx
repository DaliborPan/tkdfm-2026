import { type PropsWithChildren, Suspense } from "react";

import { redirect } from "next/navigation";

import { IntlProvider } from "@/components/intl-provider";
import { Providers } from "@/components/providers";
import { AppSidebarProvider } from "@/components/sidebar";
import { getIntl } from "@/intl";

import { getMeOrNull } from "../../../lib/get-me";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const intl = await getIntl();

  return (
    <IntlProvider messages={intl.messages} locale={intl.locale}>
      <Providers>
        <Suspense fallback={null}>
          {getMeOrNull().then((me) => {
            if (!me) {
              redirect("/sign-in");
            }

            return <AppSidebarProvider>{children}</AppSidebarProvider>;
          })}
        </Suspense>
      </Providers>
    </IntlProvider>
  );
}
