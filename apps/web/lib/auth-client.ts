import { createAuthClient } from "better-auth/react";
import { trainerNationalIdClientPlugin } from "./trainer-national-id-client";

const createClient = () =>
  createAuthClient({
    plugins: [trainerNationalIdClientPlugin()],
  });

export const authClient: ReturnType<typeof createClient> = createClient();
