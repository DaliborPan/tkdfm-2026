"use client";

import {
  CheckboxGroup,
  type CheckboxGroupProps,
} from "../../molecules/checkbox-group";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormCheckboxGroupProps = CheckboxGroupProps & {
  name: string;
};

export function FormCheckboxGroup({
  id,
  name,
  message,
  onChange,
  ...props
}: FormCheckboxGroupProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      render={({ field, fieldState: { error } }) => (
        <CheckboxGroup
          {...props}
          value={field.value}
          onChange={(value) => {
            field.onChange(value);

            onChange?.(value);
          }}
          message={createFieldMessage(message, error)}
        />
      )}
    />
  );
}
