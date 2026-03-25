import { headers } from "next/headers";

import { auth } from "@repo/backend/auth";

export const getMeOrNull = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
};

export const getMe = async () => {
  const user = await getMeOrNull();

  if (!user) {
    throw new Error("Authenticated user is required.");
  }

  return user;
};
