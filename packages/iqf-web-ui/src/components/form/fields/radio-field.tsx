import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import { FormRadio, type FormRadioProps } from "../RHF-fields/form-radio";
import { useFormContext } from "../context/form-context";

export type RadioFieldProps<T extends BaseObject> = FormRadioProps<T> & {
  readOnly?: boolean;
};

export function RadioField<T extends BaseObject>({
  label,
  name,
  readOnly = false,
  className,
  ...props
}: RadioFieldProps<T>) {
  const { editing } = useFormContext();

  return (
    <FormRadio
      {...props}
      className={cn("h-8 items-center", className)}
      id={name}
      name={name}
      disabled={!editing || readOnly}
    />
  );
}
