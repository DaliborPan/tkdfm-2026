import { FormInput, type FormInputProps } from "../RHF-fields/form-input";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { TextValue } from "../values/text-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type TextFieldProps = FormInputProps & CommonFieldProps<string>;

export function TextField({
  name,
  valueClassName = "",
  readOnly = false,
  renderValue,
  ...props
}: TextFieldProps) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn<string> = (value) => (
    <TextValue
      value={props.multiline || props.type !== "password" ? value : "********"}
      multiline={props.multiline}
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
    <FormInput {...props} id={name} name={name} />
  );
}
