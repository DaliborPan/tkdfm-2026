"use client";

import { useEffect } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";

import { useFormTabsContentContext } from "../form-tabs/form-tabs-content-context";
import { useFormTabsStateContext } from "../form-tabs/form-tabs-state-context";
import { FormControl } from "./form-control";
import { FormFieldContext, useFormFieldContext } from "./form-field-context";
import { FormItem } from "./form-item";
import { useFormItemContext } from "./form-item-context";
import { type FormItemContextType } from "./types";

/**
 * `createFormItemId` is used to create `id`, that is passed to `<Input />`, `<Select />` etc., when
 * used within `<FormField />`. This `id` is used to connect the input with the label.
 *
 * When label is rendered externally, this function can be used to create the same `id` as
 * `<FormField />` would pass to `<Input />` ...
 */
export function createFormItemId(id: string) {
  return `${id}-form-item`;
}

export const useFormField = () => {
  const fieldContext = useFormFieldContext();
  const { id } = useFormItemContext();
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id,
    name: fieldContext.name,
    formItemId: createFormItemId(id),
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> &
  Partial<FormItemContextType> & {
    formItemClassName?: string;
  };

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  formItemClassName,
  render,
  ...props
}: FormFieldProps<TFieldValues, TName>) {
  const { name: tabName } = useFormTabsContentContext();
  const { registerField, unregisterField } = useFormTabsStateContext();

  useEffect(() => {
    if (tabName) {
      registerField(`${tabName}###${props.name}`);

      return () => {
        unregisterField(`${tabName}###${props.name}`);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.name, tabName]);

  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller
        {...props}
        render={(field) => (
          <FormItem id={id} className={formItemClassName}>
            <FormControl>{render(field)}</FormControl>
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  );
}
