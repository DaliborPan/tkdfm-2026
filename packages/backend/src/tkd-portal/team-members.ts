import { teamMembersEndpoint } from "./const";
import { teamMembersSchema } from "./schema";

export const getTeamMembers = async (accessToken: string) => {
  // TODO(d) - error handling
  const response = await fetch(teamMembersEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const json = await response.json();

  return teamMembersSchema.parse(json);
};
