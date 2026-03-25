"use client";

import { DateInput, type DateInputProps } from "../../molecules/date-input";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

const constructDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * field.value might be either Date (when using form defaultValues) or string.
 * DateInput works with string values only.
 */
export const getDateFieldValue = (
  value: unknown,
  type: FormDateInputProps["type"],
) => {
  if (value instanceof Date) {
    return constructDateString(value);
  }

  if (typeof value === "undefined" || value === null) {
    return undefined;
  }

  if (typeof value === "string") {
    if (type === "datetime-local") {
      /**
       * Date value from BE has format "2024-02-06T09:35:02.867337Z".
       * We need to pass "2024-02-06T09:35" to DateInput.
       */
      return value.slice(0, 16);
    }

    if (type === "instant") {
      const date = new Date(value);

      return constructDateString(date);
    }

    return value;
  }

  throw new Error("Invalid date value");
};

export type FormDateInputProps = Omit<DateInputProps, "type" | "onChange"> & {
  name: string;

  /**
   * FormDateInput adds `instant` type to DateInputProps["type"].
   *
   * @default - "datetime-local"
   */
  type?: DateInputProps["type"] | "instant";

  /**
   * Maps value from DateInput to string.
   *
   * Primary purpose is to be able to work with `instant` type, which
   * is not known for DateInput.
   *
   * @default - if type === "instant", return `new Date(value).toISOString()`,
   * otherwise returns value
   */
  valueMapper?: (value: string) => string;

  /**
   * @param mappedValue value mapped by valueMapper or null
   */
  onChange?: (mappedValue: string | null) => void;
};

export function FormDateInput({
  id,
  name,
  message,
  allowDisplayState = true,
  type = "datetime-local",
  valueMapper = (value) =>
    type === "instant" ? new Date(value).toISOString() : value,
  disabled,
  onChange,
  ...props
}: FormDateInputProps) {
  const { control, resetField, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      render={({ field, fieldState: { error, isDirty } }) => (
        <DateInput
          {...props}
          {...field}
          allowDisplayState={allowDisplayState}
          onChange={(value) => {
            const mappedValue = value ? valueMapper(value) : null;

            field.onChange(mappedValue);
            onChange?.(mappedValue);
          }}
          onReset={isDirty && editing ? () => resetField(name) : undefined}
          type={type === "instant" ? "datetime-local" : type}
          value={getDateFieldValue(field.value, type) ?? ""}
          disabled={!editing || disabled}
          message={
            allowDisplayState ? createFieldMessage(message, error) : undefined
          }
        />
      )}
    />
  );
}
