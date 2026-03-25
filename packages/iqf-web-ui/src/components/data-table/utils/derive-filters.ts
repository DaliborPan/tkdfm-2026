import { type ColumnFilter } from "@tanstack/react-table";

import { type BaseObject } from "../../../evidence/base";
import { type UseDataTableStateResult } from "../hooks/data-table-state";
import {
  type ApiFilter,
  type CreateGlobalFilterProps,
  type DataTableProps,
} from "../types";

const defaultCreateGlobalFilter = ({
  filterId,
  filterValue,
  ignoreAccent,
  ignoreCase,
}: CreateGlobalFilterProps): ApiFilter => {
  return {
    field: filterId,
    value: filterValue,
    operation: "LIKE",

    ignoreAccent,
    ignoreCase,
  };
};

export function deriveFilters<TTableData extends BaseObject, TValue>({
  state: { columnFilters, globalFilter },
  preFilters,
  columns,
}: Pick<DataTableProps<TTableData, TValue>, "preFilters" | "columns"> & {
  state: UseDataTableStateResult<TTableData>["state"];
}): {
  enabled: boolean;
  filters: ApiFilter[];
} {
  const filters: ApiFilter[] = [...(preFilters ?? [])];

  const getMeta = (id: string) => {
    return columns.find((col) => col.id === id)?.meta;
  };

  const createFilter = (filter: ColumnFilter) => {
    const meta = getMeta(filter.id);

    if (!meta?.createFilter) {
      return;
    }

    filters.push(
      meta.createFilter({
        filterId: filter.id,
        filterValue: filter.value as any[],
      }),
    );
  };

  if (globalFilter) {
    const globalFilterColumns = columns.filter(
      (column) => column.enableGlobalFilter,
    );

    // by default, every DataTable has a global filter that filters by id
    const globalFilters: ApiFilter[] = [
      {
        field: "id",
        operation: "EQ",
        value: globalFilter,
      },
    ];

    globalFilterColumns.forEach((col) => {
      const meta = getMeta(col.id ?? "");

      if (!col.id || !meta) {
        return;
      }

      const filterId = col.id;
      const filterValue = globalFilter;
      const ignoreAccent = true;
      const ignoreCase = true;

      const createGlobalFilter =
        meta.createGlobalFilter ?? defaultCreateGlobalFilter;

      globalFilters.push(
        createGlobalFilter({
          filterId,
          filterValue,
          ignoreAccent,
          ignoreCase,
        }),
      );
    });

    filters.push({
      operation: "OR",
      filters: globalFilters,
    });
  }

  const disabled = columns.some(
    ({ id: columnId, meta }) =>
      meta?.required &&
      !columnFilters.some(({ id }: ColumnFilter) => id === columnId),
  );

  columnFilters.forEach(createFilter);

  return { enabled: !disabled, filters };
}
