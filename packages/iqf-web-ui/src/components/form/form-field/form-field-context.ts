import { createContext, useContext } from "react";

import { type FormFieldContextType } from "./types";

export const FormFieldContext = createContext<FormFieldContextType | null>(
  null,
);

export function useFormFieldContext() {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error(
      "useFormFieldContext must be used within a FormFieldContext",
    );
  }

  return context;
}
