import { type ReactNode } from "react";

import { cn } from "../../../../../utils";
import { Checkbox } from "../../../../atoms/checkbox";
import {
  FormCheckbox,
  type FormCheckboxProps,
} from "../../../../form/RHF-fields/form-checkbox";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";

export type FormCheckboxFieldProps = FormCheckboxProps & {
  label?: ReactNode;
  name: string;
  readOnly?: boolean;
  viewClassName?: string;
  layoutClassName?: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormCheckboxField({
  label,
  name,
  size = "s",
  readOnly = false,
  viewClassName = "",
  layoutClassName = "",
  ...formCheckboxProps
}: FormCheckboxFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label} className={layoutClassName}>
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => (
            <Checkbox
              disabled={true}
              size={size}
              className={cn("h-8 py-[5px]", viewClassName)}
              checked={value}
            />
          )}
        </FormValue>
      ) : (
        <FormCheckbox
          {...formCheckboxProps}
          id={name}
          name={name}
          size={size}
          className={cn("h-8 py-[5px]", viewClassName)}
        />
      )}
    </LayoutGroupItem>
  );
}
