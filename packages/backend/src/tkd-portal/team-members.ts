import { teamMembersEndpoint } from "./const";
import { teamMembersSchema } from "./schema";

export const getTeamMembers = async (accessToken: string) => {
  const response = await fetch(teamMembersEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const json = await response.json();

  return teamMembersSchema.parse(json);
};
