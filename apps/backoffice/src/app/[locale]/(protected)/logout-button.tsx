"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "../../../lib/auth-client";

export const LogoutButton = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);

    try {
      await authClient.signOut();
      router.push("/sign-in");
      router.refresh();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-progress disabled:opacity-60"
      disabled={isPending}
      onClick={handleLogout}
      type="button"
    >
      {isPending ? "Odhlašuji..." : "Logout"}
    </button>
  );
};
