"use client";

import { type CommonSelectProps, Select } from "../../atoms/select";
import { type ComboboxBaseOptionType } from "../../molecules/combobox";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";
import {
  type FormMultipleComboboxProps,
  type FormSingleComboboxProps,
} from "./form-combobox";

type FormCommonSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = Omit<CommonSelectProps<TValueItem, TOption>, "options"> & {
  name: string;
  allowDisplayState?: boolean;
} & (
    | {
        useOptions: () => TOption[];
        options?: never;
      }
    | {
        options: TOption[];
        useOptions?: never;
      }
  );

type FormSingleSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = FormSingleComboboxProps<TValueItem, TOption>;

type FormMultipleSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = FormMultipleComboboxProps<TValueItem, TOption>;

export type FormSelectProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = FormCommonSelectProps<TValueItem, TOption> &
  (
    | FormMultipleSelectProps<TValueItem, TOption>
    | FormSingleSelectProps<TValueItem, TOption>
  );

export function FormSelect<TValueItem, TOption extends ComboboxBaseOptionType>({
  id,
  name,
  message,
  disabled,
  useOptions,
  onChange,
  options,
  allowDisplayState = true,
  ...props
}: FormSelectProps<TValueItem, TOption>) {
  const { control, resetField, editing } = useFormContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const _options = options ?? useOptions();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName="w-full overflow-hidden"
      render={({ field, fieldState: { error, isDirty } }) => (
        <Select
          {...props}
          options={_options}
          value={field.value ?? null}
          disabled={disabled ? true : !editing}
          message={
            allowDisplayState ? createFieldMessage(message, error) : undefined
          }
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
             * when using `<FormSelect onChange={...} />`.
             */
            onChange?.(value as TValueItem & TValueItem[], selectedOption);
          }}
        />
      )}
    />
  );
}
