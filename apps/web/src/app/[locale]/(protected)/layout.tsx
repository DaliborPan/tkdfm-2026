import { Suspense } from "react";

import { redirect } from "next/navigation";

import { getMeOrNull } from "../../../lib/get-me";

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
