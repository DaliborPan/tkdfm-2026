import { type FieldValues } from "react-hook-form";
import { type z } from "zod";

export type FormContextType<TFieldValues extends FieldValues> = {
  editing: boolean;

  formSchema?: z.ZodSchema<TFieldValues>;
  isRequired: (fieldName: string) => boolean;
};
