import { RotateCcw, X } from "lucide-react";

import { Button } from "iqf-web-ui/button";

import { useDataTableContext, useDataTableFiltersContext } from "../context";
import { DataTableFilterFields } from "./data-table-filter-fields";

export function DataTableFilters() {
  const table = useDataTableContext();

  const { showFilters, setShowFilters } = useDataTableFiltersContext();

  return !showFilters ? null : (
    <div className="px-4 pb-4 pt-2">
      <div className="mb-1 flex items-center">
        <span className="text-xl font-medium">Nastavení filtrů</span>

        <div className="ml-4 grow">
          <Button
            variant="base"
            iconLeft={{ Icon: RotateCcw }}
            onClick={() => table.resetColumnFilters()}
          >
            Výchozí hodnoty
          </Button>
        </div>

        <Button
          iconRight={{ Icon: X, className: "size-4" }}
          variant="base"
          onClick={() => setShowFilters(false)}
          tooltip="Zavřít filtry"
          className="size-9 min-h-0"
        />
      </div>

      <div className="@3xl/table:grid-cols-4 grid grid-cols-2 gap-3">
        <DataTableFilterFields />
      </div>
    </div>
  );
}
