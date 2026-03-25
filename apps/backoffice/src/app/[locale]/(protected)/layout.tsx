import { type PropsWithChildren, Suspense } from "react";

import { redirect } from "next/navigation";

import { Providers } from "@/components/providers";
import { getIntl } from "@/intl";

import { getMeOrNull } from "../../../lib/get-me";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const intl = await getIntl();

  return (
    <Providers messages={intl.messages} locale={intl.locale}>
      <Suspense fallback={null}>
        {getMeOrNull().then((me) => {
          if (!me) {
            redirect("/sign-in");
          }

          return <>{children}</>;
        })}
      </Suspense>
    </Providers>
  );
}
