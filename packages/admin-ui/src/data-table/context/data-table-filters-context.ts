import { createContext, useContext } from "react";

import { type DataTableFiltersContextType } from "./types";

export const DataTableFiltersContext =
  createContext<DataTableFiltersContextType | null>(null);

export function useDataTableFiltersContext() {
  const context = useContext(DataTableFiltersContext);

  if (!context) {
    throw new Error(
      "useDataTableFiltersContext must be used within a DataTableFiltersProvider",
    );
  }

  return context;
}
