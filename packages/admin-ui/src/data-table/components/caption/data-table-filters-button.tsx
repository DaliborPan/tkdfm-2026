import { Filter } from "lucide-react";

import { cn } from "iqf-web-ui/cn";

import { useDataTableContext, useDataTableFiltersContext } from "../../context";
import { DataTableCaptionButton } from "./data-table-caption-button";

export function DataTableFiltersButton() {
  const table = useDataTableContext();

  const { showFilters, setShowFilters } = useDataTableFiltersContext();

  return (
    <DataTableCaptionButton
      iconLeft={{ Icon: Filter, className: "size-4" }}
      className={cn("bg-primary-50 w-auto", showFilters && "bg-primary-100")}
      tooltip="Filtry"
      onClick={() => setShowFilters(!showFilters)}
    >
      <span
        className={cn(
          "bg-primary-100 border-primary-100 ml-1.5 rounded-full border px-2 py-0.5 text-xs",
          showFilters && "border-primary-200",
        )}
      >
        {table.getState().columnFilters.length}
      </span>
    </DataTableCaptionButton>
  );
}
