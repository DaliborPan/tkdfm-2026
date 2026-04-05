import { type PropsWithChildren } from "react";

import { type BaseObject } from "iqf-web-ui/base";

import { DataTableContext } from "./data-table-context";
import { type DataTableContextType } from "./types";

export function DataTableContextProvider<TTableData extends BaseObject>({
  value,
  children,
}: PropsWithChildren<{
  value: DataTableContextType<TTableData>;
}>) {
  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
}
