import { type Virtualizer } from "@tanstack/react-virtual";
import { type ComponentPropsWithoutRef } from "react";

import { type BaseObject } from "../../../evidence/base";
import { type CreateComboboxOptionsResult } from "./combobox-options/types";
import { type ComboboxButtonProps } from "./components/combobox-button";

export type CommonComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = Omit<ComboboxButtonProps, "onChange"> &
  Pick<ComboboxTriggerProps<TValueItem>, "onReset"> & {
    /**
     * Source of autocomplete options.
     * Includes fetcher that is used in infinite query,
     * and options such as pageSize.
     */
    options: CreateComboboxOptionsResult<TOption>;

    /**
     * `queryKeyId` of combobox used as part of queryKey
     */
    queryKeyId: string;

    /**
     * Maps option to `value` type. You should provide `valueMapper`
     * in case you want to store different combobox value than option.
     *
     * @default (option) => option as unknown as TValueItem
     */
    valueMapper?: (option: TOption) => TValueItem;

    /**
     * Maps valueItem to displayed string.
     */
    valueLabelMapper?: (valueItem: TValueItem) => string;

    /**
     * Maps option to displayed string
     *
     * @default defaultOptionLabelMapper
     * - if `TOption` extends `SelectOptionType`, then it returns `option.title`.
     * - Otherwise, it returns `option.id`.
     */
    optionLabelMapper?: (option: TOption) => string;

    /**
     * Maps valueItem to item's id.
     *
     * @default defaultIdMapper
     * - if `TValueItem` extends `BaseObject`, then it returns `valueItem.id`.
     * - Otherwise, it returns `valueItem` as string.
     */
    idMapper?: (valueItem: TValueItem) => string;

    /**
     * `maxHeight` of opened combobox list
     *
     * @default 225
     */
    maxHeight?: number;

    /**
     * `placeholder` of combobox input
     */
    placeholder?: string;

    /**
     * Minimum query length to start fetching options
     *
     * @default 0
     */
    minQueryLength?: number;
  };

/**
 * Props for Combobox component that allows selecting single item
 */
export type SingleComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = {
  /**
   * Callback called when value changes
   *
   * @param valueItem - valueMapper(option) or null
   * @param selectedOption - selected option (or undefined, if removing value)
   */
  onChange: (valueItem: TValueItem | null, selectedOption?: TOption) => void;

  /**
   * Value of combobox
   */
  value: TValueItem | null;

  /**
   * `multiple` allows selecting multiple items
   */
  multiple?: false;
};

/**
 * Props for Combobox component that allows selecting multiple items
 */
export type MultipleComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = {
  /**
   * Callback called when value changes
   *
   * @param valueItem - valueMapper(option) or null
   * @param selectedOption - selected option (or undefined, if removing value)
   */
  onChange: (value: TValueItem[] | null, selectedOption?: TOption) => void;

  /**
   * Value of combobox
   */
  value: TValueItem[] | null;

  /**
   * `multiple` allows selecting multiple items
   */
  multiple: true;
};

/**
 * Discriminated union type for Combobox component
 */
export type ComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = CommonComboboxProps<TValueItem, TOption> &
  // Note: multiple must be defined first
  (| MultipleComboboxProps<TValueItem, TOption>
    | SingleComboboxProps<TValueItem, TOption>
  );

/* ---------------------------- Combobox Content ---------------------------- */

/**
 * Individual option in ComboboxContent is identified by `id` and
 * can be optionally marked as `disabled`.
 */
export type ComboboxBaseOptionType = BaseObject & {
  disabled?: boolean;
};

export type ComboboxContentProps<
  TValueItem = BaseObject,
  TOption extends ComboboxBaseOptionType = ComboboxBaseOptionType,
> = Pick<
  CommonComboboxProps<TValueItem, TOption>,
  "maxHeight" | "optionLabelMapper" | "idMapper"
> & {
  /**
   * Options displayed in combobox list
   */
  options: TOption[];

  /**
   * Callback called when option is selected
   */
  onSelectOption: (option: TOption) => void;

  /**
   * Virtulaizer class from Tanstack Virtual
   */
  rowVirtualizer?: Virtualizer<HTMLDivElement, Element>;

  /**
   * If `true`, displays loading message
   *
   * @default false
   */
  isFetching?: boolean;

  /**
   * Callback called on input change
   */
  onInput?: ComponentPropsWithoutRef<"input">["onInput"];

  /**
   * `placeholder` of combobox input
   */
  placeholder?: string;

  /**
   * Enables search in combobox list
   *
   * @default true
   */
  enableSearch?: boolean;

  /**
   * If defined, display minQueryLength message
   */
  minQueryLength?: number;
} & (
    | {
        multiple?: false;
        value: TValueItem | null;
      }
    | {
        multiple: true;
        value: TValueItem[] | null;
      }
  );

/* ---------------------------- Combobox Trigger ---------------------------- */

export type ComboboxTriggerProps<TValueItem = BaseObject> =
  ComboboxButtonProps & {
    /**
     * Maps `valueItem` to displayed string in combobox trigger
     */
    valueLabelMapper: (valueItem: TValueItem | null) => string | null;

    /**
     * Maps `valueItem` to its `id`
     */
    idMapper?: (valueItem: TValueItem) => string;

    /**
     * placeholder of combobox input
     */
    placeholder?: string;

    /**
     * If provided, a reset button inside a trigger will be rendered. This callback
     * is called when the reset button is clicked.
     */
    onReset?: () => void;

    /**
     * If true, show clear button
     *
     * @default true
     */
    showClearButton?: boolean;
  } & (
      | {
          multiple?: false;
          value: TValueItem | null;
          onRemoveValue: () => void;
          onRemoveValueItem?: never;
        }
      | {
          multiple: true;
          value: TValueItem[] | null;
          onRemoveValueItem: (item: TValueItem) => void;
          onRemoveValue?: never;
        }
    );
