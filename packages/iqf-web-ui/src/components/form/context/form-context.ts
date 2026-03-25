import { createContext, useContext } from "react";
import {
  type FieldValues,
  useFormContext as useReactHookFormContext,
} from "react-hook-form";

import { type FormContextType } from "./types";

export const FormContext = createContext<FormContextType<any> | null>(null);

export function useFormContext<TFieldValues extends FieldValues>() {
  const context = useContext(FormContext);
  const reactHookFormContext = useReactHookFormContext<TFieldValues>();

  if (!context) {
    throw new Error("useFormContext must be used within a FormContext");
  }

  return {
    ...reactHookFormContext,
    ...(context as FormContextType<TFieldValues>),
  };
}
