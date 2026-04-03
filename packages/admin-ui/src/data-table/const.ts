import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

export const DEFAULT_SORTING: SortingState = [];
export const DEFAULT_VISIBILITY: VisibilityState = {};
export const DEFAULT_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: 50,
};
export const DEFAULT_COLUMN_FILTERS: ColumnFiltersState = [];
