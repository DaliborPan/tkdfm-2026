import { type AriaAttributes, type PropsWithChildren } from "react";

import { type UseQueryResult } from "@tanstack/react-query";
import {
  type ColumnFiltersState,
  type InitialTableState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  type Table as _TanstackTable,
} from "@tanstack/react-table";
import { type ApiFetchFn, type IqfAxiosError } from "iqf-web-ui/api-fetch";
import { type BaseObject } from "iqf-web-ui/base";
import {
  type CreateFilterProps,
  type FilterComponentProps,
  type BaseColumnMeta as IqfBaseColumnMeta,
} from "iqf-web-ui/data-table";
import { type z } from "zod";

import { type IqfColumnDef } from "./columns/types";
import { type UseDataTableStateResult } from "./hooks/data-table-state";

export type { FilterComponentProps, CreateFilterProps };

export type CreateGlobalFilterProps<TValue = any> = Omit<
  CreateFilterProps<TValue>,
  "filterValue"
> & {
  filterValue: string;
};

/**
 * ColumnMeta defined in each application in custom.d.ts
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface BaseColumnMeta<
  TValue = any,
> extends IqfBaseColumnMeta<TValue> {
  /**
   * Function that creates a filter object passed
   * to the API.
   */
  createFilter?: (props: CreateFilterProps<TValue>) => any; // ApiFilter;

  /**
   * Function that creates a global filter object passed
   * to the API.
   */
  createGlobalFilter?: (props: CreateGlobalFilterProps<TValue>) => any; // ApiFilter;
}

export type TableAccessibility<TData extends BaseObject> = {
  tbodyAccessibilityProps?: AriaAttributes;
  deriveTableRowAccessibilityProps?: (row: TData) => AriaAttributes;
};

export type DataTableProps<
  TTableData extends BaseObject = BaseObject,
  TValue = any,
> = PropsWithChildren<{
  /**
   * Table's ID. Used for storing preferences in local storage
   * as part of queryKey
   */
  id: string;

  /**
   * Custom defined queryKey
   */
  queryKey?: string[];

  /**
   * Title of the table
   */
  title?: React.ReactNode;

  /**
   * Base API for fetching evidence data. Suffix `/browse` is added
   */
  api: string;

  /**
   * Zod schema for table data
   */
  schema?: z.ZodSchema<TTableData>;

  /**
   * URL where data table is rendered. Used for navigation
   */
  url?: string;

  /**
   * Columns definition
   */
  columns: IqfColumnDef<TTableData, TValue>[];

  /**
   * When using default caption component, you can
   * modify its appearance using this prop.
   */
  tableCaption?: {
    /**
     * @deprecated use `caption` or `toolbar` instead
     */
    dataTableToolbar?: React.ReactNode;

    /**
     * Custom toolbar component for specifying custom
     * actions for the table
     */
    toolbar?: React.ReactNode;

    /**
     * @default true
     */
    showNew?: boolean;

    /**
     * @default true
     */
    showColumns?: boolean;

    /**
     * @default false
     */
    showSearch?: boolean;

    /**
     * @default true
     */
    showSettings?: boolean;

    /**
     * @default true
     */
    showFilters?: boolean;

    /**
     * Custom class names for the caption layout component
     */
    className?: string;
  };

  /**
   * Predefined filters for the table. It's not possible to disable
   * these filters in the UI. They are fixed.
   */
  preFilters?: ApiFilter[];

  /**
   * Custom fetch function for fetching data. It's handy when you need
   * to fetch data from a different API than the default one, post-process
   * the data, etc.
   */
  fetchData?: ApiFetchFn<BrowseDataResponse<TTableData>>;

  /**
   * Custom onRowClick handler. Default uses `url` to navigate to
   * the `row.id`
   */
  onRowClick?: OnRowClickFn<TTableData>;

  /**
   * @deprecated will be removed
   */
  deriveRowClassName?: (row: TTableData) => string;

  /**
   * Default sorting state.
   *
   * @default []
   */
  defaultSorting?: SortingState;

  /**
   * Default visibility state.
   *
   * @default {}
   */
  defaultVisibility?: VisibilityState;

  /**
   * Default pagination state.
   *
   * @default { pageIndex: 0, pageSize: 50 }
   */
  defaultPagination?: PaginationState;

  /**
   * Default global filter value
   *
   * @default ""
   */
  defaultGlobalFilter?: string;

  /**
   * Default column filters
   *
   * @default []
   */
  defaultColumnFilters?: ColumnFiltersState;

  /**
   * @deprecated use `children` instead
   */
  TableComponent?: TableComponentType;

  /**
   * Custom caption component. If you want to use a custom caption,
   * it is recommended to use `DataTableCaptionLayout`
   */
  caption?: React.ReactNode;

  /**
   * Part of the caption component. It's recommended to use
   * `DataTableCaptionTabs` for tabs.
   */
  tabs?: React.ReactNode;

  /**
   * Custom footer component
   */
  footer?: React.ReactNode;

  /**
   * Accessibility settings for the table
   */
  tableAccessibility?: TableAccessibility<TTableData>;

  /**
   * Determines, whether filtering and pagination will be performed
   * on the server.
   *
   * @default true
   */
  serverSide?: boolean;
}>;

export type TableComponentType = React.ComponentType<{
  dataTableCaption: React.ReactNode;
  dataTableFooter: React.ReactNode;
}>;

export type TableHandle<TTableData extends BaseObject> = {
  table: _TanstackTable<TTableData>;
  tableBodyRef: React.RefObject<HTMLTableSectionElement | null>;
  dataQuery: UseQueryResult<BrowseDataResponse<TTableData>, IqfAxiosError>;
  fetchDataOptions: DataSourceOptions;
  state: UseDataTableStateResult<TTableData>["state"];
  stateHandlers: UseDataTableStateResult<TTableData>["stateHandlers"];
  initialState: InitialTableState;
};

/* ---------------------------------- Sort ---------------------------------- */

export type ApiSort = {
  field: string;
  type: "FIELD" | "GEO_DISTANCE" | "SCRIPT" | "SCORE";
  asc: boolean;
};

export type EasApiSort = Omit<ApiSort, "asc"> & {
  order: "ASC" | "DESC";
};

/* ------------------------------- Pagination ------------------------------- */

export type ApiPagination = {
  skip: number;
  take: number;
};

/* --------------------------------- Filter --------------------------------- */

export type MapApiFilter = {
  operation: "GEO_BOUNDING_BOX";
  field: string;
  srid: number;
  topLeft: {
    x: number;
    y: number;
  };
  bottomRight: {
    x: number;
    y: number;
  };
};

export type FilterOperation =
  | "AND"
  | "EQ"
  | "GT"
  | "GTE"
  | "IS_NULL"
  | "LIKE"
  | "LT"
  | "LTE"
  | "NE"
  | "NOT"
  | "NOT_LIKE"
  | "NOT_NULL"
  | "OR"
  | "IN"

  /**
   * Compatible with IQF (alternative for EAS - IN_CONTAINS)
   *
   * OR operation with LIKE filters
   * Example:
   * {
   *  operation: "OR",
   *  filters: [
   *   { field: "name", value: "Joh", operation: "LIKE" },
   *   { field: "name", value: "Bry", operation: "LIKE" }
   *  ]
   * }
   */
  | "IN_LIKE"

  /**
   * OR operation with EQ filters
   * Example:
   * {
   *  operation: "OR",
   *  filters: [
   *   { field: "name", value: "John", operation: "EQ" },
   *   { field: "name", value: "Bryan", operation: "EQ" }
   *  ]
   * }
   */
  | "IN_EQ"

  /**
   * Compatible with EAS
   *
   * OR operation with CONTAINS filters
   * Example:
   * {
   *  operation: "OR",
   *  filters: [
   *   { field: "name", value: "Joh", operation: "CONTAINS" },
   *   { field: "name", value: "Bry", operation: "CONTAINS" }
   *  ]
   * }
   */
  | "IN_CONTAINS"

  /**
   * Not compatible with EAS
   *
   * AND operation with GTE, LTE filters
   * Example:
   * {
   *  operation: "AND",
   *  filters: [
   *   { field: "createdAt", value: "2024-02-21", operation: "GTE" },
   *   { field: "createdAt", value: "2024-02-28", operation: "LTE" }
   *  ]
   * }
   */
  | "IN_RANGE"

  // Compatible with EAS
  | "CONTAINS"
  | "FTX"
  | "FTXF";

export type ApiFilter =
  | {
      field?: string;
      value?: string | number | boolean;
      values?: string[] | boolean[];
      filter?: ApiFilter;
      operation: FilterOperation;
      filters?: ApiFilter[];
      ignoreAccent?: boolean;
      ignoreCase?: boolean;
    }
  | MapApiFilter
  | {
      column: "TEXT" | "ENUM" | "DATE" | "NOT_NULL";
      name: string;
      value: string[] | boolean[];
    }
  | {
      column: "_OR";
      filters: ApiFilter[];
    };

/* ------------------------------- Data source ------------------------------ */

/**
 * Type of options sending to `/browse` API
 */
export type DataSourceOptions = ApiPagination & {
  filters: ApiFilter[];
  sort: EasApiSort[];
};

/**
 * Response of `/browse` API
 */
export type BrowseDataResponse<TData extends BaseObject> = {
  items: TData[];
  totalCount: number;
};

/* ------------------------------ On row click ------------------------------ */

export type OnRowClickFn<TTableData extends BaseObject> = (
  row: TTableData,
  event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
) => void;
