import { cn } from "../../../utils/cn";
import {
  FormCheckboxGroup,
  type FormCheckboxGroupProps,
} from "../RHF-fields/form-checkbox-group";
import { useFormContext } from "../context/form-context";

export type CheckboxGroupFieldProps = FormCheckboxGroupProps & {
  readOnly?: boolean;
};

export function CheckboxGroupField({
  name,
  readOnly = false,
  className,
  ...props
}: CheckboxGroupFieldProps) {
  const { editing } = useFormContext();

  // TODO: view?
  return (
    <FormCheckboxGroup
      {...props}
      className={cn("h-8 items-center", className)}
      id={name}
      name={name}
      disabled={!editing || readOnly}
    />
  );
}
