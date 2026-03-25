import { type BaseObject } from "../../../evidence/base";
import { RadioGroup, type RadioGroupProps } from "../../molecules/radio-group";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormRadioProps<T extends BaseObject> = Omit<
  RadioGroupProps<T>,
  "value"
>;

/**
 * `FormRadio` can work either with baseSchema.extend({ ... }) or z.string() value.
 */
export function FormRadio<T extends BaseObject>({
  id,
  name,
  message,
  disabled,
  onChange,
  ...props
}: FormRadioProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      render={({ field, fieldState: { error } }) => (
        <RadioGroup<T>
          {...props}
          {...field}
          value={field.value}
          onChange={(value, e) => {
            field.onChange(value);

            onChange?.(value, e);
          }}
          disabled={disabled}
          name={name}
          message={createFieldMessage(message, error)}
        />
      )}
    />
  );
}
