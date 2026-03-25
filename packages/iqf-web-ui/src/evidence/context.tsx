import { createContext, useContext } from "react";

import { type BaseObject } from "./base";
import { type EvidenceConf, type EvidenceProps } from "./types";

export type EvidenceContextType<TTableData extends BaseObject = BaseObject> =
  Required<EvidenceConf> &
    Pick<Required<EvidenceProps<TTableData>>, "readOnly" | "tableRef"> &
    Required<EvidenceProps<TTableData>["conf"]>;

export const EvidenceContext = createContext<EvidenceContextType<any> | null>(
  null,
);

export function useEvidenceContext<
  TTableData extends BaseObject = BaseObject,
>() {
  const context = useContext(EvidenceContext);

  if (!context) {
    throw new Error(
      "useEvidenceContext must be used within a EvidenceProvider",
    );
  }

  return context as EvidenceContextType<TTableData>;
}
