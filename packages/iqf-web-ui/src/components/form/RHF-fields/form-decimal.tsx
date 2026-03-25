"use client";

import { Decimal, type DecimalProps } from "../../atoms/decimal";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormDecimalProps = DecimalProps & {
  name: string;
  allowDisplayState?: boolean;
  formItemClassName?: string;
};

export function FormDecimal({
  id,
  name,
  allowDisplayState = true,
  message,
  formItemClassName,
  disabled,
  onChange,
  ...props
}: FormDecimalProps) {
  const { control, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName={formItemClassName}
      render={({ field, fieldState: { error } }) => (
        <Decimal
          {...props}
          {...field}
          value={field.value ?? ""}
          disabled={!editing || disabled}
          onChange={(value) => {
            field.onChange(value);

            if (typeof value === "string" || typeof value === "number") {
              onChange?.(value);
            }
          }}
          message={
            allowDisplayState ? createFieldMessage(message, error) : undefined
          }
        />
      )}
    />
  );
}
