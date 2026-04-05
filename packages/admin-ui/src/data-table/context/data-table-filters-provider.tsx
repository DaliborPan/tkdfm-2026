import { type PropsWithChildren, useState } from "react";

import { DataTableFiltersContext } from "./data-table-filters-context";

export function DataTableFiltersProvider({
  children,
  defaultShowFilters = false,
}: PropsWithChildren<{
  defaultShowFilters?: boolean;
}>) {
  const [showFilters, setShowFilters] = useState(defaultShowFilters);

  return (
    <DataTableFiltersContext.Provider value={{ showFilters, setShowFilters }}>
      {children}
    </DataTableFiltersContext.Provider>
  );
}
