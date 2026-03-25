import { zodResolver } from "@hookform/resolvers/zod";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";

import { FormProvider } from "../context";
import { type BasicFormProps } from "./types";

export function BasicForm<TFieldValues extends FieldValues>({
  formSchema,
  defaultValues,
  onSubmit,
  children,
  className,
  isEditing = true,
}: BasicFormProps<TFieldValues>) {
  const form = useForm<TFieldValues>({
    resolver: zodResolver(formSchema),

    // TODO(iqf) - check why needed to type cast
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
  });

  if (Object.entries(form.formState.errors).length > 0) {
    console.log("[VALUES]", form.getValues());
    console.log("[ERRORS]", form.formState.errors);
  }

  return (
    <FormProvider {...form} formSchema={formSchema} editing={isEditing}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, form))}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}
