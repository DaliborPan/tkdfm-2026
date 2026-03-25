import { type ComboboxBaseOptionType } from "../../../molecules/combobox";
import {
  SelectField,
  type SelectFieldProps,
  SimpleSelectField,
} from "../../fields/select-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type SelectLayoutFieldProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = SelectFieldProps<TValueItem, TOption> & CommonLayoutFieldProps;

export function SelectLayoutField<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
>({
  name,
  label,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: SelectLayoutFieldProps<TValueItem, TOption>) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <SelectField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}

export type SimpleSelectLayoutFieldProps<
  TValueItem extends string,
  TOption extends ComboboxBaseOptionType,
> = SelectLayoutFieldProps<TValueItem, TOption>;

export function SimpleSelectLayoutField<
  TValueItem extends string,
  TOption extends { id: TValueItem },
>({
  name,
  label,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: SimpleSelectLayoutFieldProps<TValueItem, TOption>) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <SimpleSelectField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
