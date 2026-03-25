import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import {
  FormCombobox,
  type FormComboboxProps,
} from "../RHF-fields/form-combobox";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { ComboboxValue } from "../values/combobox-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type ComboboxFieldProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = FormComboboxProps<TValueItem, TOption> &
  CommonFieldProps<TValueItem | TValueItem[]>;

export function ComboboxField<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
>({
  name,
  readOnly = false,
  className,
  valueClassName = "",
  renderValue,

  ...props
}: ComboboxFieldProps<TValueItem, TOption>) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn = (value) => (
    <ComboboxValue
      value={value}
      valueLabelMapper={props.valueLabelMapper}
      optionLabelMapper={props.optionLabelMapper}
      multiple={props.multiple}
      className={valueClassName}
    />
  );

  return !editing || readOnly ? (
    <FormValue name={name}>
      {(value) =>
        renderValue
          ? renderValue(value, defaultRenderValue)
          : defaultRenderValue(value)
      }
    </FormValue>
  ) : (
    <FormCombobox
      id={name}
      name={name}
      className={cn("w-full", className)}
      {...props}
    />
  );
}
