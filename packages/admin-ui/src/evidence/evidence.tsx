import { useRef } from "react";

import { type BaseObject } from "iqf-web-ui/base";

import { type TableHandle } from "../data-table";
import { EvidenceProvider } from "./context";
import { EvidenceDetail } from "./detail";
import { EvidenceLayout } from "./layout";
import { EvidenceTable } from "./table";
import { type EvidenceProps } from "./types";

function Evidence<TTableData extends BaseObject>({
  conf,
  table,
  detail,
  defaultDetailSize = 50,
  readOnly = false,
}: Omit<EvidenceProps<TTableData>, "tableRef">) {
  const tableRef = useRef<TableHandle<TTableData>>(null);

  return (
    <EvidenceProvider
      value={{
        ...conf,
        readOnly,

        // Not used
        tableRef: tableRef as never,
      }}
    >
      <EvidenceLayout
        table={table}
        detail={detail}
        defaultDetailSize={defaultDetailSize}
      />
    </EvidenceProvider>
  );
}

Evidence.Table = EvidenceTable;
Evidence.Detail = EvidenceDetail;

export { Evidence };
