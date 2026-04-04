import { cache } from "react";

import { type CurrentUserType } from "@repo/backend/auth/current-user";

import { getMe } from "../get-me";

export const getRequestContext = cache(async () => {
  const me = await getMe();

  const currentUser: CurrentUserType = {
    id: me.id,
    role: me.role ?? null,
    trainerId: me.trainerId ?? null,
  };

  return {
    currentUser,
  };
});
