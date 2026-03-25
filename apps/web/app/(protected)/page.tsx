import { Suspense } from "react";

import { getMe } from "../../lib/get-me";
import { LogoutButton } from "./logout-button";

export default function IndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

          <Suspense>
            <p className="mt-2 text-sm text-slate-600">
              Prihlasen jako {getMe().then((me) => me.name)} (
              {getMe().then((me) => me.email)})
            </p>
          </Suspense>
        </div>

        <LogoutButton />
      </div>
    </main>
  );
}
