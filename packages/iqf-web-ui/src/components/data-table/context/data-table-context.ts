import { createContext, useContext } from "react";

import { type BaseObject } from "../../../evidence/base";
import { type DataTableContextType } from "./types";

export const DataTableContext = createContext<DataTableContextType<any> | null>(
  null,
);

export function useDataTableContext<TTableData extends BaseObject>() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error(
      "useDataTableContext must be used within a DataTableContext",
    );
  }

  return context as DataTableContextType<TTableData>;
}
