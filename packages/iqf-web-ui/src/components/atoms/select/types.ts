import { type BaseObject } from "../../../evidence/base";
import {
  type ComboboxBaseOptionType,
  type ComboboxTriggerProps,
  type CommonComboboxProps,
  type MultipleComboboxProps,
  type SingleComboboxProps,
} from "../../molecules/combobox";
import { type ComboboxButtonProps } from "../../molecules/combobox/components/combobox-button";

/**
 * @deprecated use `SelectOptionType` instead
 */
export type SelectObject = BaseObject & {
  title: string;

  [key: string]: unknown;
};

/**
 * In most cases, this type is used for specifying options for Select component.
 */
export type SelectOptionType = ComboboxBaseOptionType & {
  title: string;

  [key: string]: unknown;
};

/**
 * Common props for Select component
 */
export type CommonSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = Omit<ComboboxButtonProps, "onChange"> &
  Pick<
    CommonComboboxProps<TValueItem, TOption>,
    | "idMapper"
    | "valueMapper"
    | "optionLabelMapper"
    | "placeholder"
    | "maxHeight"
  > &
  Pick<ComboboxTriggerProps<TValueItem>, "showClearButton" | "onReset"> & {
    /**
     * Options to select from
     */
    options: TOption[];

    /**
     * `enableSearch` allows client-side searching in options. Search
     * is shown when there are more than 7 options (according to
     * hasEnoughOptionsToShowSearchInput function).
     *
     * @default true
     */
    enableSearch?: boolean;
  };

/**
 * Props for Select component that allows selecting single item`
 */
export type SingleSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = SingleComboboxProps<TValueItem, TOption>;

/**
 * Props for Select component that allows selecting multiple items`
 */
export type MultipleSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = MultipleComboboxProps<TValueItem, TOption>;

/**
 * Discriminated union type for Select component
 */
export type SelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = CommonSelectProps<TValueItem, TOption> &
  // Note: multiple must be defined first
  (| MultipleSelectProps<TValueItem, TOption>
    | SingleSelectProps<TValueItem, TOption>
  );
