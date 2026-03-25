import {
  FormCheckbox,
  type FormCheckboxProps,
} from "../RHF-fields/form-checkbox";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { CheckboxValue } from "../values/checkbox-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type CheckboxFieldProps = FormCheckboxProps & CommonFieldProps<boolean>;

export function CheckboxField({
  name,
  size = "s",
  readOnly = false,
  valueClassName = "",
  renderValue,
  ...props
}: CheckboxFieldProps) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn<boolean> = (value) => (
    <CheckboxValue size={size} className={valueClassName} value={value} />
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
    <FormCheckbox {...props} id={name} name={name} size={size} />
  );
}
