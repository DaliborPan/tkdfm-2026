import { type UseQueryResult } from "@tanstack/react-query";
import {
  type ColumnFiltersState,
  type InitialTableState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  type Table as _TanstackTable,
} from "@tanstack/react-table";
import { type AriaAttributes, type PropsWithChildren } from "react";
import { type z } from "zod";

import { type BaseObject } from "../../evidence/base";
import { type ApiFetchFn, type IqfAxiosError } from "../../utils/api-fetch";
import { type IconProps } from "../atoms/icon";
import { type SelectOptionType } from "../atoms/select";
import { type CreateAutocompleteOptionsResult } from "../molecules/autocomplete";
import { type CreateComboboxOptionsResult } from "../molecules/combobox";
import {
  type SubmitDateInputProps,
  type SubmitInputProps,
} from "../molecules/submit-input";
import { type IqfColumnDef } from "./columns/types";
import { type UseDataTableStateResult } from "./hooks/data-table-state";

export type FilterComponentProps = {
  label?: string;
  Icon?: IconProps["Icon"];
  id?: string;

  // Select
  options?: SelectOptionType[];

  // Autocomplete
  autocompleteOptions?: CreateAutocompleteOptionsResult<BaseObject>;
  labelMapper?: (value: any) => string;

  // Combobox
  comboboxOptions?: CreateComboboxOptionsResult<BaseObject>;

  // Select & Combobox
  optionLabelMapper?: (option: any) => string;

  // Date
  dateType?: SubmitDateInputProps["type"];

  // Text
  textType?: SubmitInputProps["type"];
};

export type CreateFilterProps<TValue = any> = {
  filterId: string;
  filterValue: TValue[];

  ignoreAccent?: boolean;
  ignoreCase?: boolean;
};

export type CreateGlobalFilterProps<TValue = any> = Omit<
  CreateFilterProps<TValue>,
  "filterValue"
> & {
  filterValue: string;
};

export type ColumnMetaExport = {
  name: string;

  /**
   * Unique key for the column.
   */
  datakey: string;

  /**
   * Key used for displaying the value in the cell.
   *
   * Value will be passed as `value` to *ColumnMapper on BE as well.
   *
   * @default datakey
   */
  displaykey?: string;

  cellComponentName:
    | "TextCell"
    | "BooleanCell"
    | "DateCell"
    | "DateTimeCell"
    | "TimeCell"
    | "ShortTimeCell"
    | "NumberCell";

  valueMapperName?: string;
  valueMapperData?: any;
};

/**
 * ColumnMeta defined in each application in custom.d.ts
 */
export type BaseColumnMeta<TValue = any> = {
  /**
   * Table header label.
   */
  label?: string;

  /**
   * Mapper for value displayed in the cell table.
   */
  cellLabelMapper?: (value: TValue) => string;

  /**
   * TODO: Docs
   */
  className?: string;

  /**
   * Filter operation used for the column.
   */
  filterOperation?: FilterOperation;

  /**
   * Filter component used for the column.
   */
  FilterComponent?: React.ComponentType<FilterComponentProps>;

  /**
   * Props passed to the filter component.
   */
  filterComponentProps?: FilterComponentProps;

  /**
   * Function that creates a filter object passed
   * to the API.
   */
  createFilter?: (props: CreateFilterProps<TValue>) => ApiFilter;

  /**
   * Function that creates a global filter object passed
   * to the API.
   */
  createGlobalFilter?: (props: CreateGlobalFilterProps<TValue>) => ApiFilter;

  /**
   * Disable useQuery if column is not filtered
   *
   * @default false
   */
  required?: boolean;

  sort: {
    /**
     * If provided, this will be used as the sortId, that goes
     * to the API.
     *
     * @default name ?? id
     */
    id: string;

    nullPrecedence?: NullPrecedenceType;
  };

  type:
    | "TEXT"
    | "NUMBER"
    | "ENUM"
    | "ACTIONS"
    | "CUSTOM"
    | "DATE_TIME"
    | "INSTANT"
    | "DATE"
    | "TIME"
    | "AUTOCOMPLETE"
    | "COMBOBOX";

  export?: ColumnMetaExport;

  enableActions?: boolean;

  actions?: React.ReactNode;
};

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
   * Table's title
   */
  title?: React.ReactNode;

  /**
   * Custom defined queryKey
   */
  queryKey?: string[];

  /**
   * Evidence version.
   *
   * @todo To be discussed.
   */
  version: number;

  /**
   * Base API for fetching evidence data. Suffix is added using `apiSuffix`.
   */
  api: string;

  /**
   * Suffix for the API. Default is `/browse`
   */
  apiSuffix?: string;

  /**
   * Zod schema for table data
   */
  schema?: z.ZodSchema<TTableData>;

  /**
   * URL where data table is rendered. Used for navigation
   */
  url: string;

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
     * Custom toolbar component for specifying custom
     * actions for the table
     */
    toolbar?: React.ReactNode;

    /**
     * @default true
     */
    showNew?: boolean;

    /**
     * @default false
     */
    showSearch?: boolean;

    /**
     * @default true
     */
    showColumns?: boolean;

    /**
     * @default true
     */
    showRefetch?: boolean;

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
   * Actions for context menu
   */
  contextMenuActions?:
    | React.ReactNode
    | ((data: TTableData) => React.ReactNode);

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
  TableComponent?: TableComponentType<TTableData>;

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
}>;

export type TableComponentType<TTableData extends BaseObject = BaseObject> =
  React.ComponentType<{
    dataTableCaption: React.ReactNode;
    dataTableFooter: React.ReactNode;
    dataTableContextMenuActions?: DataTableProps<TTableData>["contextMenuActions"];
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

export type NullPrecedenceType = "NULLS_FIRST" | "NULLS_LAST" | "DEFAULT";

export type ApiSort = {
  field: string;
  type: "FIELD" | "GEO_DISTANCE" | "SCRIPT" | "SCORE";
  asc: boolean;

  nullPrecedence?: NullPrecedenceType;
};

export type EasApiSort = Omit<ApiSort, "asc"> & {
  order: "ASC" | "DESC";
};

/* ------------------------------- Pagination ------------------------------- */

export type ApiPagination = {
  size: number;
  offset: number;
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
  | MapApiFilter;

/* ------------------------------- Data source ------------------------------ */

export type DataSourceSortOptions =
  | {
      /**
       * IQ BE like
       */
      sorts: ApiSort[];
    }
  | {
      /**
       * EAS BE like
       */
      sort: EasApiSort[];
    };

/**
 * Type of options sending to `/browse` API
 */
export type DataSourceOptions = ApiPagination &
  DataSourceSortOptions & {
    filters: ApiFilter[];
  };

/**
 * @deprecated use `BrowseDataResponse` instead
 */
export type ListDataResponse<TData extends BaseObject> = {
  items: TData[];
  totalCount: number;
};

/**
 * Response of `/browse` API
 */
export type BrowseDataResponse<TData extends BaseObject> =
  ListDataResponse<TData>;

/* ------------------------------ On row click ------------------------------ */

export type OnRowClickFn<TTableData extends BaseObject> = (
  row: TTableData,
  event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
) => void;
