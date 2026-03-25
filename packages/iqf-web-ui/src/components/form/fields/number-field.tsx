import { FormInput, type FormInputProps } from "../RHF-fields/form-input";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { NumberValue } from "../values/number-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type NumberFieldProps = FormInputProps &
  CommonFieldProps<number> & {
    multiline?: false;
  };

export function NumberField({
  name,
  valueClassName = "",
  readOnly = false,
  renderValue,
  ...props
}: NumberFieldProps) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn<number> = (value) => (
    <NumberValue value={value} className={valueClassName} />
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
    <FormInput {...props} id={name} name={name} type="number" />
  );
}
