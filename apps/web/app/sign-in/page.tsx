"use client";

import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [nationalId, setNationalId] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsPending(true);

    try {
      const response = await authClient.signInNationalId({
        nationalId,
      });

      if (response.error) {
        setError(response.error.message ?? "Prihlaseni se nezdarilo.");
        return;
      }

      if (!response.data) {
        setError("Prihlaseni se nezdarilo.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Prihlaseni se nezdarilo.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Prihlaseni trenera
        </h1>

        <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">
          Zadej rodne cislo. Pokud odpovida existujicimu trenerovi, vytvori se
          session a budes prihlasen.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="grid gap-2 text-sm font-medium text-slate-900">
            Rodne cislo
            <input
              autoComplete="off"
              disabled={isPending}
              inputMode="numeric"
              name="nationalId"
              onChange={(event) => setNationalId(event.target.value)}
              placeholder="napr. 010101/1234"
              value={nationalId}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </label>

          {error ? (
            <p className="text-sm leading-6 text-red-700">{error}</p>
          ) : null}

          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-progress disabled:bg-slate-500"
          >
            {isPending ? "Prihlasuji..." : "Prihlasit"}
          </button>
        </form>
      </div>
    </main>
  );
}
