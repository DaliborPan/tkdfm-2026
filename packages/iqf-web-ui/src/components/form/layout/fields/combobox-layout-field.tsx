import { type BaseObject } from "../../../../evidence/base";
import {
  ComboboxField,
  type ComboboxFieldProps,
} from "../../fields/combobox-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type ComboboxLayoutFieldProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = ComboboxFieldProps<TValueItem, TOption> & CommonLayoutFieldProps;

export function ComboboxLayoutField<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
>({
  label,
  name,
  layoutClassName = "",
  labelClassName = "",
  tooltip,
  ...props
}: ComboboxLayoutFieldProps<TValueItem, TOption>) {
  return (
    <LayoutGroupFieldItem
      name={name}
      label={label}
      required={props.required}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <ComboboxField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
