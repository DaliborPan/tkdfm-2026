import debounce from "lodash/debounce";
import { Search } from "lucide-react";

import { cn } from "iqf-web-ui/cn";
import { Input } from "iqf-web-ui/input";

import { useDataTableContext } from "../../context";
import { DataTableCaptionLayout } from "./data-table-caption-layout";
import { DataTableCaptionTitle } from "./data-table-caption-title";
import { DataTableColumnOptions } from "./data-table-column-options";
import { DataTableDefaultToolbar } from "./data-table-default-toolbar";
import { DataTableFiltersButton } from "./data-table-filters-button";
import { DataTableSettings } from "./data-table-settings";

type DataTableCaptionProps = {
  title?: React.ReactNode;
  defaultShowFilters: boolean;

  toolbar?: React.ReactNode;
  tabs?: React.ReactNode;
};

function SearchInput() {
  const { tableCaption, ...table } = useDataTableContext();

  return (
    <div className="w-96">
      <Input
        placeholder="Hledat"
        defaultValue={table.getState().globalFilter}
        onChange={debounce((e) => {
          table.setGlobalFilter(e.target.value);
          table.resetPageIndex();
        }, 800)}
        iconRight={{ Icon: Search }}
      />
    </div>
  );
}

export function DataTableCaption({
  defaultShowFilters,

  title,
  toolbar,
  tabs,
}: DataTableCaptionProps) {
  const { tableCaption } = useDataTableContext();

  return (
    <DataTableCaptionLayout
      defaultShowFilters={defaultShowFilters}
      className={cn(!!tabs && "flex-col items-start", tableCaption.className)}
    >
      <div
        className={cn("flex w-full grow gap-x-8 py-3", !!tabs && "border-b")}
      >
        <DataTableCaptionTitle title={title} />

        <div className="grow">{tableCaption.showSearch && <SearchInput />}</div>

        {toolbar ?? <DataTableDefaultToolbar showNew={tableCaption.showNew} />}
      </div>

      {!tabs && <div className="bg-primary-700 mx-4 h-4 w-px" />}

      <div className={cn("flex items-center", !!tabs && "w-full")}>
        <div className="grow">{tabs}</div>

        <div className={cn("flex items-center gap-x-1", !!tabs && "py-2.5")}>
          {tableCaption.showFilters && <DataTableFiltersButton />}
          {tableCaption.showColumns && <DataTableColumnOptions />}
          {tableCaption.showSettings && <DataTableSettings />}
        </div>
      </div>
    </DataTableCaptionLayout>
  );
}
