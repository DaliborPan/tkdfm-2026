import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { useIntl } from "react-intl";

import { cn } from "../../../../utils/cn";
import { Input } from "../../../atoms/input";
import { useDataTableContext } from "../../context";
import { DataTableCaptionDivider } from "./data-table-caption-divider";
import {
  DataTableCaptionBottomRowLayout,
  DataTableCaptionLayout,
  DataTableCaptionSettingsLayout,
  DataTableCaptionTopRowLayout,
} from "./data-table-caption-layout";
import { DataTableCaptionTitle } from "./data-table-caption-title";
import { DataTableColumnOptions } from "./data-table-column-options";
import { DataTableDefaultToolbar } from "./data-table-default-toolbar";
import { DataTableFiltersButton } from "./data-table-filters-button";
import { DataTableRefetchButton } from "./data-table-refetch-button";

type DataTableCaptionProps = {
  title?: React.ReactNode;
  defaultShowFilters: boolean;

  toolbar?: React.ReactNode;
  tabs?: React.ReactNode;
};

function SearchInput() {
  const intl = useIntl();
  const { tableCaption, ...table } = useDataTableContext();

  return (
    <div className="min-w-40 max-w-96">
      <Input
        placeholder={intl.formatMessage({
          id: "data-table.search",
          defaultMessage: "Hledat",
        })}
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

/**
 * Two-row caption
 */
export function DataTableComplexCaption({
  defaultShowFilters,

  title,
  toolbar,
  tabs,
}: DataTableCaptionProps & {
  tabs: NonNullable<DataTableCaptionProps["tabs"]>;
}) {
  const { tableCaption } = useDataTableContext();

  return (
    <DataTableCaptionLayout
      defaultShowFilters={defaultShowFilters}
      className={cn("flex-col items-start", tableCaption.className)}
    >
      <DataTableCaptionTopRowLayout className="border-b">
        <div className="flex grow items-center gap-x-8">
          <DataTableCaptionTitle title={title} />

          {tableCaption.showSearch && (
            <div className="grow">
              <SearchInput />
            </div>
          )}
        </div>

        {toolbar !== undefined ? (
          toolbar
        ) : (
          <DataTableDefaultToolbar showNew={tableCaption.showNew} />
        )}
      </DataTableCaptionTopRowLayout>

      <DataTableCaptionBottomRowLayout className="w-full gap-x-8">
        <div className="grow">{tabs}</div>

        <DataTableCaptionSettingsLayout className="py-2.5">
          {tableCaption.showFilters && <DataTableFiltersButton />}
          {tableCaption.showColumns && <DataTableColumnOptions />}
          {tableCaption.showRefetch && <DataTableRefetchButton />}
        </DataTableCaptionSettingsLayout>
      </DataTableCaptionBottomRowLayout>
    </DataTableCaptionLayout>
  );
}

/**
 * One-row caption
 */
export function DataTableSimpleCaption({
  defaultShowFilters,

  title,
  toolbar,
}: Omit<DataTableCaptionProps, "tabs">) {
  const { tableCaption } = useDataTableContext();

  return (
    <DataTableCaptionLayout
      defaultShowFilters={defaultShowFilters}
      className={cn("gap-x-8", tableCaption.className)}
    >
      <DataTableCaptionTopRowLayout>
        <div className="flex grow items-center gap-x-8">
          <DataTableCaptionTitle title={title} />

          {tableCaption.showSearch && (
            <div className="grow">
              <SearchInput />
            </div>
          )}
        </div>

        <div className="flex items-center">
          {toolbar !== undefined ? (
            toolbar
          ) : (
            <>
              <DataTableDefaultToolbar showNew={tableCaption.showNew} />
              {tableCaption.showNew && <DataTableCaptionDivider />}
            </>
          )}

          {/* Options group: only render the wrapper if at least one button is visible */}
          {(tableCaption.showFilters ||
            tableCaption.showColumns ||
            tableCaption.showRefetch) && (
            <DataTableCaptionSettingsLayout>
              {tableCaption.showFilters && <DataTableFiltersButton />}
              {tableCaption.showColumns && <DataTableColumnOptions />}
              {tableCaption.showRefetch && <DataTableRefetchButton />}
            </DataTableCaptionSettingsLayout>
          )}
        </div>
      </DataTableCaptionTopRowLayout>
    </DataTableCaptionLayout>
  );
}

export function DataTableCaption(props: DataTableCaptionProps) {
  return props.tabs ? (
    <DataTableComplexCaption {...props} tabs={props.tabs} />
  ) : (
    <DataTableSimpleCaption {...props} />
  );
}
