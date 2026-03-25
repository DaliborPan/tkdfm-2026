import {
  FormDateInput,
  type FormDateInputProps,
} from "../../../../form/RHF-fields/form-date-input";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { DateValue } from "../value/date-value";

export type FormDateFieldProps = FormDateInputProps & {
  readOnly?: boolean;
  layoutClassName?: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormDateField({
  label,
  name,
  type,
  readOnly = false,
  layoutClassName = "",
  ...props
}: FormDateFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem id={name} label={label} className={layoutClassName}>
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => (
            <DateValue
              value={value}
              type={type === "instant" ? "datetime-local" : type}
            />
          )}
        </FormValue>
      ) : (
        <FormDateInput {...props} id={name} name={name} type={type} size="s" />
      )}
    </LayoutGroupItem>
  );
}
