import {
  type ColumnDef,
  type FilterFn,
  type SortingFn,
} from "@tanstack/react-table";
import { type ReactNode } from "react";
import { type FieldPath } from "react-hook-form";

import { type CreateAutocompleteOptionsResult } from "iqf-web-ui/autocomplete";
import { type BaseObject } from "iqf-web-ui/base";
import { type CreateComboboxOptionsResult } from "iqf-web-ui/combobox";
import { type IconProps } from "iqf-web-ui/icon";
import { type SelectObject } from "iqf-web-ui/select";

import { type BaseColumnMeta, type FilterOperation } from "../types";

export type RangeValue = { from: string | null; to: string | null };

export type IqfColumnDef<TData extends BaseObject, TValue = any> = ColumnDef<
  TData,
  TValue
>;

type CommonTableColumnOptions<T extends BaseObject> = {
  /**
   * Enforced during column resizing
   *
   * @default 175
   */
  minSize?: number;

  /**
   * Enforced during column resizing
   */
  maxSize?: number;

  /**
   * Starting column size
   */
  size?: number;

  /**
   * Icon used in the filter component.
   *
   * @default undefined - no icon.
   */
  Icon?: IconProps["Icon"];

  /**
   * label of the column.
   */
  label: string;

  /**
   * If provided, this will be used as the filterId, that goes
   * to the API.
   *
   * @default the same as `name`
   */
  filterId?: string;

  sort?: {
    /**
     * If provided, this will be used as the sort id that goes to the API.
     *
     * @default the same as `name`
     */
    id?: string;

    nullPrecedence?: "NULLS_FIRST" | "NULLS_LAST" | "DEFAULT";
  };

  /**
   * Filter operation; default is assigned to each type.
   */
  filterOperation?: FilterOperation;

  /**
   * If provided, it will be used instead of the default `createFilter`; default is assigned to each type and filter operation.
   */
  createFilter?: BaseColumnMeta["createFilter"];

  /**
   * If provided, it will be used instead of the default `FilterComponent`; default is assigned to each type and filter operation.
   */
  FilterComponent?: BaseColumnMeta["FilterComponent"];

  /**
   * Enable this column to be filterable.
   *
   * @default true
   */
  enableFilter?: boolean;

  /**
   * Enable this column to be hidden.
   *
   * @default true
   */
  enableHiding?: boolean;

  /**
   * Enable this column to be sortable.
   *
   * @default true
   */
  enableSorting?: boolean;

  /**
   * Enable this column to be resizable.
   *
   * @default true
   */
  enableResizing?: boolean;

  /**
   * Enable this column to have actions.
   *
   * @default false
   */
  enableActions?: boolean;

  /**
   * Custom actions for column.
   *
   * @default undefined
   */
  actions?: ReactNode;

  /**
   * Disable useQuery if column is not filtered
   *
   * @default false
   */
  required?: boolean;

  /**
   * Classname applied to the column cell.
   */
  className?: string;
} & (
  | {
      /**
       * Path to field, that will be displayed in the table.
       *
       * For `enum`, name must be the path to `id`.
       *
       * @default same as `id`
       */
      name: FieldPath<T>;

      cell?: undefined;
      id?: undefined;
    }
  | {
      /**
       * Custom cell component.
       */
      cell: ColumnDef<T, any>["cell"];

      /**
       * `id` is required when custom `cell` is provided.
       */
      id: string;

      name?: undefined;
    }
);

/* -------------------------- Filter operation type ------------------------- */

export type TextColumnFilterOperation = "IN_LIKE";
export type NumberColumnFilterOperation = "IN_EQ";
export type EnumColumnFilterOperation = "IN";
export type ActionsColumnFilterOperation = never;
export type DateTimeColumnFilterOperation = "IN_RANGE" | "LTE" | "GTE" | "EQ";
export type InstantColumnFilterOperation = DateTimeColumnFilterOperation;
export type DateColumnFilterOperation = DateTimeColumnFilterOperation;
export type TimeColumnFilterOperation = DateTimeColumnFilterOperation;

/**
 * - IN_EQ for boolean attributes.
 * - IS_NULL - `true` applies `IS_NULL`.
 * - NOT_NULL - `true` applies `NOT_NULL`.
 */
export type BooleanColumnFilterOperation = "IN_EQ" | "IS_NULL" | "NOT_NULL";
export type AutocompleteColumnFilterOperation = "IN";
export type ComboboxColumnFilterOperation = "IN";
export type CustomColumnFilterOperation = FilterOperation;

/* ------------------------------ Type specific ----------------------------- */

type TextSpecificOptions = {
  /**
   * IN_CONTAINS for EAS backend. IN_LIKE for IQF backend.
   *
   * @default "IN_LIKE"
   */
  filterOperation?: TextColumnFilterOperation;

  /**
   * @default false
   */
  enableGlobalFilter?: boolean;

  /**
   * Allowing to pass `createGlobalFilter` function via `tableColumn.text`.
   */
  createGlobalFilter?: CustomSpecificOptions["createGlobalFilter"];

  /**
   * Allowing to pass `filterFn` for custom client-side filtering.
   */
  filterFn?: FilterFn<any>;
};

type NumberSpecificOptions = {
  /**
   * @default false
   */
  enableGlobalFilter?: boolean;

  /**
   * Allowing to pass `createGlobalFilter` function via `tableColumn.number`.
   */
  createGlobalFilter?: CustomSpecificOptions["createGlobalFilter"];
};

type EnumSpecificOptions = {
  options: SelectObject[];

  /**
   * Allowing to pass `filterFn` for custom client-side filtering.
   */
  filterFn?: FilterFn<any>;
};

type ActionsSpecificOptions<T extends BaseObject> = {
  actions: (rowData: T) => React.ReactNode;
};

type DateTimeSpecificOptions = {
  filterOperation?: DateTimeColumnFilterOperation;

  cellLabelMapper?: (value: string) => string;

  /**
   * - `RangeValue` for filterOperation: IN_RANGE
   * - `string` for filterOperation: LTE, GTE, EQ
   */
  filterLabelMapper?: (value: RangeValue | string) => string;
};

type InstantSpecificOptions = DateTimeSpecificOptions;

type DateSpecificOptions = DateTimeSpecificOptions;

type TimeSpecificOptions = DateTimeSpecificOptions;

type BooleanSpecificOptions<T extends BaseObject> = {
  filterOperation?: BooleanColumnFilterOperation;

  /**
   * You can specify your own options.
   *
   * @default [{ id: "true", title: intl("Yes") }, { id: "false", title: intl("No") }]
   */
  options?: SelectObject[];

  /**
   * `cellMapper` is used for mapping true/false displayValue
   * in the cell. `params.text` is option.title for the current
   * value (true/false).
   */
  cellMapper?: (params: { value: boolean; text: string }) => React.ReactNode;

  /**
   * `valueMapper` is required with IS_NULL/NOT_NULL filterOperation.
   * It is used to decide the boolean value based on
   * the row data. `value` is then passed to `cellMapper`.
   */
  valueMapper?: (row: T) => boolean;

  /**
   * Allowing to pass `filterFn` for custom client-side filtering.
   */
  filterFn?: FilterFn<any>;
};

/**
 * @deprecated
 */
type AutocompleteSpecificOptions<TAutocompleteType extends BaseObject> = {
  options: CreateAutocompleteOptionsResult<TAutocompleteType>;

  /**
   * Default mapper is `value => value.title` defined in filter-autocomplete-field.tsx
   */
  filterLabelMapper?: (value: TAutocompleteType) => string;
};

type ComboboxSpecificOptions<TOption extends BaseObject> = {
  options: CreateComboboxOptionsResult<TOption>;

  optionLabelMapper?: (value: TOption) => string;

  /**
   * Allowing to pass `filterFn` for custom client-side filtering.
   */
  filterFn?: FilterFn<any>;
};

type CustomSpecificOptions = {
  createFilter: BaseColumnMeta["createFilter"];
  createGlobalFilter?: BaseColumnMeta["createGlobalFilter"];
  FilterComponent: BaseColumnMeta["FilterComponent"];
};

/* ------------------------------ Exported ----------------------------- */

type OmitFilterOperation<Type> = {
  [Property in keyof Type as Exclude<
    Property,
    "filterOperation"
  >]: Type[Property];
};

export type TextTableColumnOptions<T extends BaseObject> =
  CommonTableColumnOptions<T> & TextSpecificOptions;

export type NumberTableColumnOptions<T extends BaseObject> =
  OmitFilterOperation<CommonTableColumnOptions<T>> & NumberSpecificOptions;

export type EnumTableColumnOptions<T extends BaseObject> = OmitFilterOperation<
  CommonTableColumnOptions<T>
> &
  EnumSpecificOptions;

export type ActionsTableColumnOptions<T extends BaseObject> = Omit<
  OmitFilterOperation<CommonTableColumnOptions<T>>,
  "name" | "cell" | "actions"
> &
  ActionsSpecificOptions<T>;

export type DateTimeTableColumnOptions<T extends BaseObject> =
  CommonTableColumnOptions<T> & DateTimeSpecificOptions;

export type InstantTableColumnOptions<T extends BaseObject> =
  CommonTableColumnOptions<T> & InstantSpecificOptions;

export type DateTableColumnOptions<T extends BaseObject> =
  CommonTableColumnOptions<T> & DateSpecificOptions;

export type TimeTableColumnOptions<T extends BaseObject> =
  CommonTableColumnOptions<T> & TimeSpecificOptions;

export type BooleanTableColumnOptions<T extends BaseObject> = Omit<
  OmitFilterOperation<CommonTableColumnOptions<T>>,
  "cell"
> &
  BooleanSpecificOptions<T>;

/**
 * @deprecated
 */
export type AutocompleteTableColumnOptions<
  T extends BaseObject,
  TAutocompleteType extends BaseObject,
> = OmitFilterOperation<CommonTableColumnOptions<T>> &
  AutocompleteSpecificOptions<TAutocompleteType>;

export type ComboboxTableColumnOptions<
  T extends BaseObject,
  TOption extends BaseObject,
> = OmitFilterOperation<CommonTableColumnOptions<T>> &
  ComboboxSpecificOptions<TOption>;

type WithType<TOptions, TType extends string> = TOptions & { type: TType };

export type CreateBaseColumnParams<
  T extends BaseObject,
  TComboboxOption extends BaseObject = BaseObject,
> = Omit<CommonTableColumnOptions<T>, "name" | "cell" | "id"> & {
  name?: string;
  cell?: ColumnDef<T, any>["cell"];
  id?: string;

  sortingFn?: SortingFn<T>;
  filterFn?: FilterFn<T>;
} & (
    | WithType<TextSpecificOptions & Partial<CustomSpecificOptions>, "TEXT">
    | WithType<NumberSpecificOptions & Partial<CustomSpecificOptions>, "NUMBER">
    | WithType<EnumSpecificOptions & Partial<CustomSpecificOptions>, "ENUM">
    | WithType<
        BooleanSpecificOptions<T> & Partial<CustomSpecificOptions>,
        "ENUM"
      >

    /**
     * For actions column, `actions` are rendered in the cell, not as
     * as in other columns.
     */
    | WithType<Omit<ActionsSpecificOptions<T>, "actions">, "ACTIONS">
    | WithType<CustomSpecificOptions, "CUSTOM">
    | WithType<
        DateTimeSpecificOptions & Partial<CustomSpecificOptions>,
        "DATE_TIME"
      >
    | WithType<
        InstantSpecificOptions & Partial<CustomSpecificOptions>,
        "INSTANT"
      >
    | WithType<DateSpecificOptions & Partial<CustomSpecificOptions>, "DATE">
    | WithType<TimeSpecificOptions & Partial<CustomSpecificOptions>, "TIME">
    | WithType<
        AutocompleteSpecificOptions<TComboboxOption> &
          Partial<CustomSpecificOptions>,
        "AUTOCOMPLETE"
      >
    | WithType<
        ComboboxSpecificOptions<TComboboxOption> &
          Partial<CustomSpecificOptions>,
        "COMBOBOX"
      >
  );

/* -------------------------- Filter component map -------------------------- */

export type FilterComponentMap<TColumnFilterOperation extends string> = Record<
  TColumnFilterOperation,
  {
    createFilter: BaseColumnMeta["createFilter"];
    createGlobalFilter?: BaseColumnMeta["createGlobalFilter"];
    FilterComponent: BaseColumnMeta["FilterComponent"];
  }
>;
