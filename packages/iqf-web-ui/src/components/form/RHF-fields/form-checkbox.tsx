"use client";

import { type BaseObject, baseSchema } from "../../../evidence/base";
import { Checkbox, type CheckboxProps } from "../../atoms/checkbox";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

type CheckboxValueType = string | number | BaseObject;

export type FormCheckboxProps<TValue extends CheckboxValueType = string> = Omit<
  CheckboxProps,
  "checked" | "value"
> & {
  name: string;
  formItemClassName?: string;

  /**
   * If you set `value`, you should pass `name`, that has type
   * `TValue[]`. If user clicks on the checkbox, the `value` is
   * set or removed from the array.
   */
  value?: TValue;

  /**
   * If you set `value`, this function determines id of the value.
   * It's helpful if you use `TValue extendsBaseObject`.
   *
   * @default (value) => value
   */
  idMapper?: (value: TValue) => string;
};

export function FormCheckbox<TValue extends CheckboxValueType = string>({
  id,
  name,
  disabled,
  message,
  onChange,
  formItemClassName,

  value,
  idMapper = (value) => {
    const parsed = baseSchema.safeParse(value);

    if (parsed.success) {
      return parsed.data.id;
    }

    return value as string;
  },
  ...props
}: FormCheckboxProps<TValue>) {
  const { control, editing } = useFormContext();

  const equals = (a: TValue, b: TValue) => idMapper(a) === idMapper(b);

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName={formItemClassName}
      render={({ field, fieldState: { error } }) => {
        const isValueProvided = value !== undefined;

        const isChecked = isValueProvided
          ? (Array.isArray(field.value) ? field.value : []).some((v: TValue) =>
              equals(v, value),
            )
          : !!field.value;

        return (
          <Checkbox
            {...props}
            disabled={!editing || disabled}
            checked={isChecked}
            onChange={(checked) => {
              if (isValueProvided) {
                field.onChange([
                  ...(Array.isArray(field.value) ? field.value : []).filter(
                    (v: TValue) => !equals(v, value),
                  ),
                  ...(checked ? [value] : []),
                ]);
              } else {
                field.onChange(checked);
              }

              onChange?.(checked);
            }}
            message={createFieldMessage(message, error)}
          />
        );
      }}
    />
  );
}
