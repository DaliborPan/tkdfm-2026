import { TypedColumns } from "@repo/admin-ui/data-table";
import { type GroupBrowseType } from "@repo/backend/group/schema";

const { tableColumn } = new TypedColumns<GroupBrowseType>();

export const useColumns = () => {
  const nameColumn = tableColumn.text({
    name: "name",
    label: "Název",
  });

  const shortcutColumn = tableColumn.text({
    name: "shortcut",
    label: "Zkratka",
  });

  const studentsCountColumn = tableColumn.number({
    name: "studentsCount",
    label: "Počet studentů",
    enableFilter: false,
    enableSorting: false,
  });

  return [nameColumn, shortcutColumn, studentsCountColumn];
};
