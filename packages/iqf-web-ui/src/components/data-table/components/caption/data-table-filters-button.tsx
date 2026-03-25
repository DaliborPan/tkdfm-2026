import { Filter } from "lucide-react";
import { useIntl } from "react-intl";

import { cn } from "../../../../utils/cn";
import { useDataTableContext, useDataTableFiltersContext } from "../../context";
import { DataTableCaptionButton } from "./data-table-caption-button";

export function DataTableFiltersButton() {
  const intl = useIntl();

  const table = useDataTableContext();

  const { showFilters, setShowFilters } = useDataTableFiltersContext();

  return (
    <DataTableCaptionButton
      iconLeft={{ Icon: Filter, className: "size-4" }}
      className={cn("w-auto bg-primary-50", showFilters && "bg-primary-100")}
      tooltip={intl.formatMessage({
        id: "data-table.filters",
        defaultMessage: "Filtry",
      })}
      onClick={() => setShowFilters(!showFilters)}
    >
      <span
        className={cn(
          "ml-1.5 rounded-full border border-primary-100 bg-primary-100 px-2 py-0.5 text-xs",
          showFilters && "border-primary-200",
        )}
      >
        {table.getState().columnFilters.length}
      </span>
    </DataTableCaptionButton>
  );
}
