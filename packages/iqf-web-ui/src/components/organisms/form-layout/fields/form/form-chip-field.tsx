import { type ReactNode } from "react";

import { FormInput } from "../../../../form/RHF-fields/form-input";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { ChipValue } from "../value/chip-value";

export type FormChipFieldProps = {
  label: ReactNode;
  name: string;
  readOnly?: boolean;
  layoutClassName?: string;
  href?: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormChipField({
  label,
  name,
  href,
  layoutClassName = "",
  readOnly = false,
}: FormChipFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label} className={layoutClassName}>
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => <ChipValue value={value} href={href} />}
        </FormValue>
      ) : (
        <FormInput id={name} name={name} />
      )}
    </LayoutGroupItem>
  );
}
