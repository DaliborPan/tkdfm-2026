import { TypedColumns } from "@repo/admin-ui/data-table";
import { type TrainingBrowseType } from "@repo/backend/training/schema";

import { useGroupOptions } from "@/modules/group/hooks/api";

const { tableColumn } = new TypedColumns<TrainingBrowseType>();

export const useColumns = () => {
  const groupOptions = useGroupOptions();

  const groupColumn = tableColumn.enum({
    name: "group.id",
    label: "Skupina",
    options: groupOptions,
  });

  const startsAtColumn = tableColumn.datetime({
    name: "startsAt",
    label: "Začíná",
    enableFilter: false,
  });

  const endsAtColumn = tableColumn.datetime({
    name: "endsAt",
    label: "Končí",
    enableFilter: false,
  });

  const cancelledColumn = tableColumn.text({
    name: "cancelled",
    label: "Zrušen",
  });

  return [groupColumn, startsAtColumn, endsAtColumn, cancelledColumn];
};
