import { useBrowseDataQuery } from "@repo/admin-ui/browse-data-query";
import { groupBrowseSchema } from "@repo/backend/group/schema";

import { groupConf } from "../conf";

const useGroupBrowseQuery = () => {
  return useBrowseDataQuery({
    queryKey: [groupConf.api],
    api: groupConf.api,
    schema: groupBrowseSchema,
    options: {
      filters: [],
      sort: [],
      take: 100,
      skip: 0,
    },
  });
};

export const useGroupOptions = () => {
  const query = useGroupBrowseQuery();

  return (query.data?.items ?? []).map((group) => ({
    id: group.id,
    title: group.name,
  }));
};

export const useGroupOptionsWithShortcut = () => {
  const query = useGroupBrowseQuery();

  return (query.data?.items ?? []).map((group) => ({
    id: group.id,
    title: `${group.name} (${group.shortcut})`,
  }));
};
