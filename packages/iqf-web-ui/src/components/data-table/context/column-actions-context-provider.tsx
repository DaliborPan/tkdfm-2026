import { type PropsWithChildren } from "react";

import { ColumnActionsContext } from "./column-actions-context";
import { type ColumnActionsContextType } from "./types";

export function ColumnActionsProvider<TData, TValue>({
  value,
  children,
}: PropsWithChildren<{
  value: ColumnActionsContextType<TData, TValue>;
}>) {
  return (
    <ColumnActionsContext.Provider value={value}>
      {children}
    </ColumnActionsContext.Provider>
  );
}
