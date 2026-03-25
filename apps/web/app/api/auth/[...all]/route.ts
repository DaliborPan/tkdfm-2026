import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@repo/backend/auth";

export const { GET, POST } = toNextJsHandler(auth);
