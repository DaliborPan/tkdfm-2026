import type { BetterAuthClientPlugin } from "better-auth/client";

export const trainerNationalIdClientPlugin = () => {
  return {
    id: "trainer-national-id",
    getActions: ($fetch) => {
      return {
        signInNationalId: async (data: { nationalId: string }) => {
          return $fetch<{ token: string; user: { id: string } }>(
            "/trainer-national-id/sign-in",
            {
              method: "POST",
              body: data,
            },
          );
        },
      };
    },
  } satisfies BetterAuthClientPlugin;
};
