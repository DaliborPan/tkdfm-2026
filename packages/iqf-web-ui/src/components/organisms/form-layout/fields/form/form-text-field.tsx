import { type ReactNode } from "react";

import { cn } from "../../../../../utils/cn";
import {
  FormInput,
  type FormInputProps,
} from "../../../../form/RHF-fields/form-input";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { TextValue } from "../value/text-value";

export type FormTextFieldProps = FormInputProps & {
  label?: ReactNode;
  tooltip?: ReactNode;
  viewClassName?: string;
  layoutClassName?: string;
  readOnly?: boolean;
  labelClassName?: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormTextField({
  label,
  tooltip,
  name,
  viewClassName = "",
  layoutClassName = "",
  labelClassName = "",
  size = "s",
  readOnly = false,
  ...formInputProps
}: FormTextFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem
      id={name}
      label={label}
      tooltip={tooltip}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => (
            <TextValue
              value={
                formInputProps.multiline || formInputProps.type !== "password"
                  ? value
                  : "********"
              }
              multiline={formInputProps.multiline}
              className={cn(viewClassName)}
            />
          )}
        </FormValue>
      ) : (
        <FormInput {...formInputProps} id={name} name={name} size={size} />
      )}
    </LayoutGroupItem>
  );
}
