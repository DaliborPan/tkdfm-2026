import { type ColumnDef } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { type FieldPath } from "react-hook-form";

import { type BaseObject } from "../../../evidence/base";
import { type IconProps } from "../../atoms/icon/types";
import { type SelectOptionType } from "../../atoms/select/types";
import { type CreateAutocompleteOptionsResult } from "../../molecules/autocomplete/types";
import { type CreateComboboxOptionsResult } from "../../molecules/combobox";
import {
  type BaseColumnMeta,
  type ColumnMetaExport,
  type FilterOperation,
  type NullPrecedenceType,
} from "../types";

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
     * If provided, this will be used as the sortId, that goes
     * to the API.
     *
     * @default the same as `name`
     */
    id?: string;

    /**
     * Null precedence for the column, that goes to the API.
     */
    nullPrecedence?: NullPrecedenceType;
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

export type TextColumnFilterOperation = "IN_LIKE" | "IN_CONTAINS" | "IN_EQ";
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

  export?: Partial<ColumnMetaExport>;
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

  export?: Partial<ColumnMetaExport>;
};

type EnumSpecificOptions = {
  options: SelectOptionType[];

  export?: Partial<ColumnMetaExport>;
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
  options?: SelectOptionType[];

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

  export?: Partial<ColumnMetaExport>;
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

  export?: Partial<ColumnMetaExport>;
};

type ComboboxSpecificOptions<TOption extends BaseObject> = {
  options: CreateComboboxOptionsResult<TOption>;

  optionLabelMapper?: (value: TOption) => string;

  export?: Partial<ColumnMetaExport>;
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
  "name" | "id" | "cell" | "actions"
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
type WithTypeAndExport<TOptions, TType extends string> = WithType<
  TOptions,
  TType
> & {
  export?: Pick<
    ColumnMetaExport,
    "cellComponentName" | "valueMapperData" | "valueMapperName"
  >;
};

export type CreateBaseColumnParams<
  T extends BaseObject,
  TComboboxOption extends BaseObject = BaseObject,
> = Omit<CommonTableColumnOptions<T>, "name" | "cell" | "id"> & {
  name?: string;
  cell?: ColumnDef<T, any>["cell"];
  id?: string;
} & (
    | WithTypeAndExport<
        TextSpecificOptions & Partial<CustomSpecificOptions>,
        "TEXT"
      >
    | WithTypeAndExport<
        NumberSpecificOptions & Partial<CustomSpecificOptions>,
        "NUMBER"
      >
    | WithTypeAndExport<
        EnumSpecificOptions & Partial<CustomSpecificOptions>,
        "ENUM"
      >
    | WithTypeAndExport<
        BooleanSpecificOptions<T> & Partial<CustomSpecificOptions>,
        "ENUM"
      >

    /**
     * For actions column, `actions` are rendered in the cell, not as
     * as in other columns.
     */
    | WithType<Omit<ActionsSpecificOptions<T>, "actions">, "ACTIONS">
    | WithType<CustomSpecificOptions, "CUSTOM">
    | WithTypeAndExport<
        DateTimeSpecificOptions & Partial<CustomSpecificOptions>,
        "DATE_TIME"
      >
    | WithTypeAndExport<
        InstantSpecificOptions & Partial<CustomSpecificOptions>,
        "INSTANT"
      >
    | WithTypeAndExport<
        DateSpecificOptions & Partial<CustomSpecificOptions>,
        "DATE"
      >
    | WithTypeAndExport<
        TimeSpecificOptions & Partial<CustomSpecificOptions>,
        "TIME"
      >
    | WithTypeAndExport<
        AutocompleteSpecificOptions<TComboboxOption> &
          Partial<CustomSpecificOptions>,
        "AUTOCOMPLETE"
      >
    | WithTypeAndExport<
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
