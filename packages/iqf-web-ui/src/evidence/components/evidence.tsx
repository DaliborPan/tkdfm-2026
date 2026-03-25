import { useRef } from "react";

import { type TableHandle } from "../../components/data-table/types";
import { TAG_EVIDENCE } from "../../sentry/const";
import { sentrySetTag } from "../../sentry/utils/settings";
import { type BaseObject } from "../base";
import { EvidenceContext } from "../context";
import { type EvidenceProps } from "../types";
import { EvidenceDetail } from "./detail";
import { EvidenceLayout } from "./layout";
import { EvidenceTable } from "./table";

function Evidence<TTableData extends BaseObject>({
  conf: { version = 1, ...conf },
  table,
  detail,
  defaultDetailSize,
  readOnly = false,
  ...props
}: EvidenceProps<TTableData>) {
  const tableRef = useRef<TableHandle<TTableData> | null>(null);

  sentrySetTag(TAG_EVIDENCE, conf.url);

  return (
    <EvidenceContext
      value={{
        ...conf,
        version,
        readOnly,
        tableRef: props.tableRef ?? tableRef,
      }}
    >
      <EvidenceLayout
        table={table}
        detail={detail}
        defaultDetailSize={defaultDetailSize}
      />
    </EvidenceContext>
  );
}

Evidence.Table = EvidenceTable;
Evidence.Detail = EvidenceDetail;

export { Evidence };
