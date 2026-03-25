import { FormDecimal, type FormDecimalProps } from "../RHF-fields/form-decimal";
import { useFormContext } from "../context/form-context";
import { FormValue } from "../form-value";
import { DecimalValue } from "../values/decimal-value";
import { type CommonFieldProps, type RenderValueFn } from "./types";

export type DecimalFieldProps = FormDecimalProps & CommonFieldProps<number>;

export function DecimalField({
  name,
  valueClassName = "",
  readOnly = false,
  renderValue,
  ...decimalProps
}: DecimalFieldProps) {
  const { editing } = useFormContext();

  const defaultRenderValue: RenderValueFn<number> = (value) => (
    <DecimalValue
      value={value}
      className={valueClassName}
      allowNegative={decimalProps.allowNegative}
      decimalScale={decimalProps.decimalScale}
      thousandSeparator={decimalProps.thousandSeparator}
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
    <FormDecimal {...decimalProps} id={name} name={name} size="s" />
  );
}
