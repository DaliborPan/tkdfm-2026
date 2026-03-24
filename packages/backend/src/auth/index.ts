import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { prisma } from "../client";
import { trainerNationalIdPlugin } from "./trainer-national-id-plugin";

const authBaseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000";

const authSecret =
  process.env.BETTER_AUTH_SECRET ??
  process.env.AUTH_SECRET ??
  "tkdfm-local-dev-secret-012345678901234567890123456789";

export const auth = betterAuth({
  appName: "TKDFM",
  baseURL: authBaseURL,
  secret: authSecret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    modelName: "User",
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "TRAINER",
        input: false,
      },
      trainerId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },
  disabledPaths: ["/sign-in/email", "/sign-up/email"],
  plugins: [trainerNationalIdPlugin()],
});
