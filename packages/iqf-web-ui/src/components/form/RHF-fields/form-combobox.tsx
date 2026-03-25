"use client";

import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import {
  Combobox,
  type CommonComboboxProps,
  type MultipleComboboxProps,
  type SingleComboboxProps,
} from "../../molecules/combobox";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

type FormCommonComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = Omit<CommonComboboxProps<TValueItem, TOption>, "queryKeyId"> & {
  name: string;
  formItemClassName?: string;
  allowDisplayState?: boolean;
};

export type FormSingleComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = Pick<
  Partial<SingleComboboxProps<TValueItem, TOption>>,
  "onChange" | "multiple"
>;

export type FormMultipleComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = Pick<Partial<MultipleComboboxProps<TValueItem, TOption>>, "onChange"> &
  Pick<MultipleComboboxProps<TValueItem, TOption>, "multiple">;

export type FormComboboxProps<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
> = FormCommonComboboxProps<TValueItem, TOption> &
  (
    | FormMultipleComboboxProps<TValueItem, TOption>
    | FormSingleComboboxProps<TValueItem, TOption>
  );

export function FormCombobox<
  TValueItem = BaseObject,
  TOption extends BaseObject = BaseObject,
>({
  id,
  name,
  formItemClassName,
  allowDisplayState = true,
  message,
  onChange,
  disabled,
  options,

  ...props
}: FormComboboxProps<TValueItem, TOption>) {
  const { control, resetField, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName={cn("w-full overflow-hidden", formItemClassName)}
      render={({ field, fieldState: { error, isDirty } }) => (
        <Combobox
          {...props}
          queryKeyId={name}
          options={options}
          value={field.value ?? null}
          disabled={!editing || disabled}
          onReset={isDirty && editing ? () => resetField(name) : undefined}
          onChange={(
            value: TValueItem | TValueItem[] | null,
            selectedOption,
          ) => {
            field.onChange(value);

            /**
             * Unreal type casting due to not infering `value` type
             * based on `multiple` prop.
             *
             * It's important that `onChange` is called with correct type
             * when using `<FormCombobox onChange={...} />`.
             */
            onChange?.(value as TValueItem & TValueItem[], selectedOption);
          }}
          message={
            allowDisplayState ? createFieldMessage(message, error) : undefined
          }
        />
      )}
    />
  );
}
