import { RotateCcw, X } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../atoms/button";
import { useDataTableContext, useDataTableFiltersContext } from "../context";
import { DataTableFilterFields } from "./data-table-filter-fields";

export function DataTableFilters() {
  const intl = useIntl();
  const table = useDataTableContext();

  const { showFilters, setShowFilters } = useDataTableFiltersContext();

  return !showFilters ? null : (
    <div className="px-4 pb-4 pt-2">
      <div className="mb-1 flex items-center">
        <span className="text-xl font-medium">
          {intl.formatMessage({
            id: "data-table.filter-settings",
            defaultMessage: "Nastavení filtrů",
          })}
        </span>

        <div className="ml-4 grow">
          <Button
            variant="base"
            iconLeft={{ Icon: RotateCcw }}
            onClick={() => table.resetColumnFilters()}
          >
            {intl.formatMessage({
              id: "data-table.filter-reset-all",
              defaultMessage: "Výchozí hodnoty",
            })}
          </Button>
        </div>

        <Button
          iconRight={{ Icon: X, className: "size-4" }}
          variant="base"
          onClick={() => setShowFilters(false)}
          tooltip={intl.formatMessage({
            id: "data-table.filter-close",
            defaultMessage: "Zavřít filtry",
          })}
          className="size-9 min-h-0"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 @3xl/table:grid-cols-4">
        <DataTableFilterFields />
      </div>
    </div>
  );
}
