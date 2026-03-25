import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { z } from "zod";

import { trainerService } from "../trainer";
import { normalizeNationalId } from "../trainer/national-id";

const signInWithNationalIdBodySchema = z.object({
  nationalId: z.string(),
});

export const trainerNationalIdPlugin = () => {
  return {
    id: "trainer-national-id",
    endpoints: {
      signInTrainerNationalId: createAuthEndpoint(
        "/trainer-national-id/sign-in",
        {
          method: "POST",
          body: signInWithNationalIdBodySchema,
        },
        async (ctx) => {
          const normalizedNationalId = normalizeNationalId(ctx.body.nationalId);

          if (!normalizedNationalId) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: "Rodne cislo je povinne.",
            });
          }

          const trainer =
            await trainerService.findByNationalId(normalizedNationalId);

          if (!trainer) {
            throw new APIError("UNAUTHORIZED", {
              message: "Prihlaseni se nezdarilo.",
            });
          }

          const currentUser = (await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                field: "trainerId",
                value: trainer.id,
              },
            ],
          })) as {
            id: string;
          } | null;

          const user = currentUser
            ? await ctx.context.internalAdapter.updateUser(currentUser.id, {
                email: trainer.email,
                emailVerified: true,
                name: trainer.name,
                role: "TRAINER",
                trainerId: trainer.id,
              })
            : await ctx.context.internalAdapter.createUser({
                email: trainer.email,
                emailVerified: true,
                name: trainer.name,
                role: "TRAINER",
                trainerId: trainer.id,
              });

          const session = await ctx.context.internalAdapter.createSession(
            user.id,
          );

          if (!session) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Nepodarilo se vytvorit session.",
            });
          }

          await setSessionCookie(ctx, {
            session,
            user,
          });

          return ctx.json({
            token: session.token,
            user: {
              email: user.email,
              id: user.id,
              name: user.name,
              role: user.role,
              trainerId: user.trainerId,
            },
          });
        },
      ),
    },
  } satisfies BetterAuthPlugin;
};
