import { TextColumnCell } from "@repo/admin-ui/data-table-columns";
import { TypedColumns } from "@repo/admin-ui/data-table";
import { type HelpdeskTicketBrowseType } from "@repo/backend/helpdesk-ticket/schema";

import { helpdeskTicketStatusOptions } from "./options";

const { tableColumn } = new TypedColumns<HelpdeskTicketBrowseType>();

export const useColumns = () => {
  const reporterNameColumn = tableColumn.text({
    id: "reporterName",
    cell: ({ row }) => (
      <TextColumnCell
        value={row.original.reporterName ?? "Neprihlaseny uzivatel"}
      />
    ),
    label: "Jmeno",
    enableFilter: false,
    enableSorting: false,
    minSize: 240,
  });

  const statusColumn = tableColumn.enum({
    name: "status",
    label: "Stav",
    options: helpdeskTicketStatusOptions,
  });

  const createdAtColumn = tableColumn.date({
    name: "createdAt",
    label: "Vytvoreno",
    enableFilter: false,
  });

  const updatedAtColumn = tableColumn.date({
    name: "updatedAt",
    label: "Upraveno",
    enableFilter: false,
  });

  return [
    reporterNameColumn,
    statusColumn,
    createdAtColumn,
    updatedAtColumn,
  ];
};
