import { useBrowseDataQuery } from "@repo/admin-ui/browse-data-query";
import { groupRegularTrainingDetailSchema } from "@repo/backend/group-regular-training/schema";

import { groupRegularTrainingConf } from "../conf";

export function useGroupRegularTrainingBrowseQuery(
  groupId: string | undefined,
) {
  return useBrowseDataQuery({
    queryKey: [groupRegularTrainingConf.api],
    api: groupRegularTrainingConf.api,
    schema: groupRegularTrainingDetailSchema,
    options: {
      filters: groupId
        ? [{ column: "TEXT", name: "groupId", value: [groupId] }]
        : [],
      sort: [],
      take: 100,
      skip: 0,
    },
    enabled: !!groupId,
  });
}
