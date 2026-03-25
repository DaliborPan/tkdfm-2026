import { type PropsWithChildren } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

/**
 * From RHF
 */
type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

export type BasicFormProps<TFieldValues extends FieldValues> =
  PropsWithChildren<{
    formSchema: z.ZodSchema<TFieldValues>;
    defaultValues?: DeepPartial<TFieldValues>;
    onSubmit: (
      values: TFieldValues,
      form: UseFormReturn<TFieldValues>,
    ) => void | Promise<void>;
    className?: string;
    isEditing?: boolean;
  }>;
