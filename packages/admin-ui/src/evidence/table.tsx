import { type BaseObject } from "iqf-web-ui/base";

import { DataTable } from "../data-table";
import { useEvidenceContext } from "./context";
import { type EvidenceTableProps } from "./types";

export function EvidenceTable<TTableData extends BaseObject, TValue>({
  tableSchema,
  tableCaption,
  ...dataTableProps
}: EvidenceTableProps<TTableData, TValue>) {
  const { name, api, url, readOnly } = useEvidenceContext();

  return (
    <DataTable
      {...dataTableProps}
      id={name}
      api={api}
      url={url}
      schema={tableSchema}
      tableCaption={{
        ...tableCaption,
        showNew: tableCaption?.showNew ?? !readOnly,
      }}
    />
  );
}
