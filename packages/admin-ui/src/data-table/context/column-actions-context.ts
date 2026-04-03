import { createContext, useContext } from "react";

import { type ColumnActionsContextType } from "./types";

export const ColumnActionsContext = createContext<ColumnActionsContextType<
  any,
  any
> | null>(null);

export function useColumnActionsContext<TData, TValue>() {
  const context = useContext(ColumnActionsContext);

  if (!context) {
    throw new Error(
      "useColumnActionsContext must be used within a ColumnActionsProvider",
    );
  }

  return context as ColumnActionsContextType<TData, TValue>;
}
