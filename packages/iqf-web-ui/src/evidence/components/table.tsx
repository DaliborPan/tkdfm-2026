import { DataTable } from "../../components/data-table";
import { type BaseObject } from "../base";
import { useEvidenceContext } from "../context";
import { type EvidenceTableProps } from "../types";

export function EvidenceTable<TTableData extends BaseObject, TValue>({
  tableSchema,
  tableCaption,
  ...dataTableProps
}: EvidenceTableProps<TTableData, TValue>) {
  const { id, version, tableRef, api, url, readOnly } =
    useEvidenceContext<TTableData>();

  return (
    <DataTable
      {...dataTableProps}
      ref={tableRef}
      id={id}
      version={version}
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
