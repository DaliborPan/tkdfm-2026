import { type ReactNode } from "react";

import {
  FormCheckboxGroup,
  type FormCheckboxGroupProps,
} from "../../../../form/RHF-fields/form-checkbox-group";
import { useFormContext } from "../../../../form/context/form-context";
import { LayoutGroupItem } from "../../layout-group-item";

export type FormCheckboxGroupFieldProps = {
  label: ReactNode;
  name: string;
  readOnly?: boolean;
  layoutClassName?: string;
  items: FormCheckboxGroupProps["items"];
  onChange?: FormCheckboxGroupProps["onChange"];
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormCheckboxGroupField({
  label,
  name,
  items,
  onChange,
  readOnly = false,
  layoutClassName = "",
}: FormCheckboxGroupFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label} className={layoutClassName}>
      <FormCheckboxGroup
        className="h-8 items-center"
        id={name}
        name={name}
        items={items}
        size="s"
        disabled={!editing || readOnly}
        onChange={onChange}
      />
    </LayoutGroupItem>
  );
}
