import { type PropsWithChildren } from "react";

import { cn } from "iqf-web-ui/cn";

import { DataTableFiltersProvider } from "../../context";
import { DataTableFilters } from "../data-table-filters";

export function DataTableCaptionLayout({
  children,
  className,
  defaultShowFilters = false,
}: PropsWithChildren<{
  defaultShowFilters?: boolean;
  className?: string;
}>) {
  return (
    <DataTableFiltersProvider defaultShowFilters={defaultShowFilters}>
      <div
        className={cn(
          "sticky left-0 top-0 z-40 flex items-center border-b bg-white px-4",
          className,
        )}
      >
        {children}
      </div>

      <DataTableFilters />
    </DataTableFiltersProvider>
  );
}
