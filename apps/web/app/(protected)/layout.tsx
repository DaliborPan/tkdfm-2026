import { getMeOrNull } from "../../lib/get-me";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { Suspense } from "react";

async function ProtectedLayoutAsync({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMeOrNull();

  if (!me) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={children}>
      <ProtectedLayoutAsync>{children}</ProtectedLayoutAsync>
    </Suspense>
  );
}
