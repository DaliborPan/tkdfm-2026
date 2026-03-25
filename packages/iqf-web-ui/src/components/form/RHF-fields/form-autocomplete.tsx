"use client";

import { type BaseObject } from "../../../evidence/base";
import {
  Autocomplete,
  type AutocompleteProps,
} from "../../molecules/autocomplete";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormAutocompleteProps<ItemType extends BaseObject> = Omit<
  AutocompleteProps<ItemType>,
  "onChange" | "queryKeyId" | "options"
> & {
  name: string;
  allowDisplayState?: boolean;
  onChange?: AutocompleteProps<ItemType>["onChange"];
  options: AutocompleteProps<ItemType>["options"];
};

/**
 * @deprecated use `FormCombobox` instead
 */
export function FormAutocomplete<ItemType extends BaseObject>({
  id,
  name,
  allowDisplayState = true,
  message,
  onChange,
  options,
  ...props
}: FormAutocompleteProps<ItemType>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName="w-full"
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...props}
          queryKeyId={name}
          options={options}
          value={field.value}
          onChange={(value) => {
            field.onChange(value);

            onChange?.(value);
          }}
          message={
            allowDisplayState ? createFieldMessage(message, error) : undefined
          }
        />
      )}
    />
  );
}
