import { type ReactNode } from "react";

import { FormInput } from "../../../../form/RHF-fields/form-input";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { UserValue } from "../value/user-value";

export type FormUserFieldProps = {
  label: ReactNode;
  name: string;
  readOnly?: boolean;
  multiple?: boolean;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormUserField({
  label,
  name,
  readOnly = false,
  multiple = false,
}: FormUserFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label}>
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => <UserValue value={value} multiple={multiple} />}
        </FormValue>
      ) : (
        <FormInput id={name} name={name} />
      )}
    </LayoutGroupItem>
  );
}
