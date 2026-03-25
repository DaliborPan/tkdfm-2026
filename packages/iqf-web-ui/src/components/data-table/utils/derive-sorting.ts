import { type SortingState } from "@tanstack/react-table";

import { type BaseObject } from "../../../evidence/base";
import { type ApiSort, type DataTableProps, type EasApiSort } from "../types";

/**
 * Prepare sorting object for /browse API.
 *
 * Deriving from tanstack table sorting state and sortId defined
 * for each column.
 */
export function deriveSorting(
  mappedSortingState: ReturnType<typeof prepareMappedSortingState>,
):
  | {
      sorts: ApiSort[];
      sort?: never;
    }
  | {
      sort: EasApiSort[];
      sorts?: never;
    } {
  return {
    sorts: mappedSortingState.map((sort) => ({
      field: sort.id,
      type: "FIELD",
      asc: !sort.desc,

      nullPrecedence: sort.nullPrecedence,
    })),
  };
}

export type DeriveSortingFn = typeof deriveSorting;

/**
 * Take column definitions (columns) and sorting state (sortingState).
 *
 * Each column has defined `sortId` in meta object, that we need to use
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
