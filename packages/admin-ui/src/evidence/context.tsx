import {
  type PropsWithChildren,
  type RefObject,
  createContext,
  useContext,
} from "react";

import { type TableHandle } from "../data-table";
import { type EvidenceConf, type EvidenceProps } from "./types";

export type EvidenceContext = EvidenceConf &
  Pick<Required<EvidenceProps>, "readOnly"> & {
    tableRef: RefObject<TableHandle<any>>;
  };

const EvidenceContext = createContext<EvidenceContext | null>(null);

export function useEvidenceContext() {
  const context = useContext(EvidenceContext);

  if (!context) {
    throw new Error(
      "useEvidenceContext must be used within a EvidenceProvider",
    );
  }

  return context;
}

export function EvidenceProvider(
  props: PropsWithChildren<{
    value: EvidenceContext;
  }>,
) {
  return <EvidenceContext.Provider {...props} />;
}
