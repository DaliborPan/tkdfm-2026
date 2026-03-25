import {
  FormDateInput,
  type FormDateInputProps,
} from "../RHF-fields/form-date-input";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { DateValue } from "../values/date-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type DateFieldProps = FormDateInputProps & CommonFieldProps<string>;

export function DateField({
  name,
  type,
  readOnly = false,
  renderValue,
  ...props
}: DateFieldProps) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn<string> = (value) => (
    <DateValue
      value={value}
      type={type === "instant" ? "datetime-local" : type}
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
    <FormDateInput {...props} id={name} name={name} type={type} />
  );
}
