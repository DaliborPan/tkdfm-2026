import { type ReactNode } from "react";

import { FormDecimal } from "../../../../form/RHF-fields/form-decimal";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { DecimalValue } from "../value/decimal-value";

export type FormDecimalFieldProps = {
  label?: ReactNode;
  name: string;
  viewClassName?: string;
  layoutClassName?: string;
  readOnly?: boolean;
  allowNegative?: boolean;
  maxValue?: number;
  minValue?: number;
  decimalScale?: number;
  thousandSeparator?: string | boolean;
  // fixedDecimalDigits?: boolean;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormDecimalField({
  label,
  name,
  viewClassName = "",
  layoutClassName = "",
  readOnly = false,
  ...decimalProps
}: FormDecimalFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label} className={layoutClassName}>
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => (
            <DecimalValue
              value={value}
              className={viewClassName}
              allowNegative={decimalProps.allowNegative}
              decimalScale={decimalProps.decimalScale}
              thousandSeparator={decimalProps.thousandSeparator}
            />
          )}
        </FormValue>
      ) : (
        <FormDecimal id={name} name={name} size="s" {...decimalProps} />
      )}
    </LayoutGroupItem>
  );
}
