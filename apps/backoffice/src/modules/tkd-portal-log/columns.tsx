import { TypedColumns } from "@repo/admin-ui/data-table";
import { type TkdPortalLogBrowseType } from "@repo/backend/tkd-portal-log";

import { tkdPortalLogTypeOptions } from "./options";

const { tableColumn } = new TypedColumns<TkdPortalLogBrowseType>();

export const useColumns = () => {
  const firstNameColumn = tableColumn.text({
    name: "firstName",
    label: "Jmeno",
  });

  const lastNameColumn = tableColumn.text({
    name: "lastName",
    label: "Prijmeni",
  });

  const nationalIdColumn = tableColumn.text({
    name: "nationalId",
    label: "Rodne cislo",
  });

  const typeColumn = tableColumn.enum({
    name: "type",
    label: "Typ",
    options: tkdPortalLogTypeOptions,
  });

  const createdAtColumn = tableColumn.date({
    name: "createdAt",
    label: "Vytvoreno",
    enableFilter: false,
  });

  const fieldColumn = tableColumn.text({
    name: "field",
    label: "Sloupec",
    enableFilter: false,
  });

  const oldValueColumn = tableColumn.text({
    name: "oldValue",
    label: "Stara hodnota",
    enableFilter: false,
  });

  const newValueColumn = tableColumn.text({
    name: "newValue",
    label: "Nova hodnota",
    enableFilter: false,
  });

  return [
    firstNameColumn,
    lastNameColumn,
    nationalIdColumn,
    typeColumn,
    createdAtColumn,
    fieldColumn,
    oldValueColumn,
    newValueColumn,
  ];
};
