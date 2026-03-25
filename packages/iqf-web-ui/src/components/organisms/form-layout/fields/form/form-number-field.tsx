import { type ReactNode } from "react";

import { FormInput } from "../../../../form/RHF-fields/form-input";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { NumberValue } from "../value/number-value";

export type FormNumberFieldProps = {
  label?: ReactNode;
  name: string;
  viewClassName?: string;
  layoutClassName?: string;
  labelClassName?: string;
  readOnly?: boolean;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormNumberField({
  label,
  name,
  viewClassName = "",
  layoutClassName = "",
  labelClassName = "",
  readOnly = false,
}: FormNumberFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem
      id={name}
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => <NumberValue value={value} className={viewClassName} />}
        </FormValue>
      ) : (
        <FormInput id={name} name={name} type="number" />
      )}
    </LayoutGroupItem>
  );
}
