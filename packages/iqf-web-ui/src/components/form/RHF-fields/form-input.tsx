"use client";

import { type ComponentProps, type RefObject } from "react";

import { type OmitDiscriminatedUnion } from "../../../types";
import { Input } from "../../atoms/input";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormInputProps = OmitDiscriminatedUnion<
  ComponentProps<typeof Input>,
  "onChange"
> & {
  name: string;
  formItemClassName?: string;
  onChange?: (value: string | number) => void;
};

export function FormInput({
  id,
  name,
  formItemClassName,
  onChange,
  disabled,
  message,
  allowDisplayState = true,
  ...props
}: FormInputProps) {
  const { control, resetField, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName={formItemClassName}
      render={({ field, fieldState: { error, isDirty } }) => {
        return (
          <Input
            {...props}
            {...field}
            ref={
              props.ref as RefObject<
                (HTMLInputElement & HTMLTextAreaElement) | null
              >
            }
            allowDisplayState={allowDisplayState}
            disabled={!editing || disabled}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              let value: string | number = e.currentTarget.value;
              if (!props.multiline && props.type === "number") {
                value = +e.currentTarget.value;
                e.currentTarget.value = value.toString();
              }

              field.onChange(value === "" ? null : value);

              onChange?.(value);
            }}
            onReset={isDirty && editing ? () => resetField(name) : undefined}
            message={
              allowDisplayState ? createFieldMessage(message, error) : undefined
            }
            value={field.value ?? ""}
          />
        );
      }}
    />
  );
}

FormInput.displayName = "FormInput";
