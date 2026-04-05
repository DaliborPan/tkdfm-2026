import { type SortingState } from "@tanstack/react-table";

import { type BaseObject } from "iqf-web-ui/base";

import { type DataTableProps, type EasApiSort } from "../types";

/**
 * Prepare sorting object for /browse API.
 *
 * Deriving from tanstack table sorting state and sort metadata defined
 * for each column.
 */
export function deriveSorting(
  mappedSortingState: { id: string; desc: boolean; nullPrecedence?: string }[],
): EasApiSort[] {
  return mappedSortingState.map((sort) => ({
    field: sort.id,
    order: sort.desc ? "DESC" : "ASC",
    type: "FIELD",
    ...(sort.nullPrecedence && { nullPrecedence: sort.nullPrecedence }),
  }));
}

export type DeriveSortingFn = typeof deriveSorting;

/**
 * Take column definitions (columns) and sorting state (sortingState).
 *
 * Each column has defined `sort` in meta object, that we need to use
 * later for /browse API.
 */
export function prepareMappedSortingState<
  TTableData extends BaseObject,
  TValue,
>({
  sortingState,
  columns,
}: {
  sortingState: SortingState;
  columns: DataTableProps<TTableData, TValue>["columns"];
}) {
  return sortingState
    .map((state) => {
      const sort = columns.find((column) => column.id === state.id)?.meta?.sort;

      if (!sort) return undefined;

      return {
        ...sort,
        desc: state.desc,
      };
    })
    .filter((state) => state !== undefined);
}
