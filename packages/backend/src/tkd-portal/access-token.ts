import { z } from "zod";

import { tokenEndpoint } from "./const";

const clientId = process.env.TKD_PORTAL_CLIENT_ID ?? "";
const clientSecret = process.env.TKD_PORTAL_CLIENT_SECRET ?? "";

export const getAccessToken = async () => {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "personal_data",
    }),
  });

  const json = await response.json();
  const tokenData = z.object({ access_token: z.string() }).safeParse(json);

  if (!response.ok || !tokenData.success) {
    throw new Error("Nepodařilo se získat access token do portálu svazu.");
  }

  return tokenData.data.access_token;
};
