import { createContext, useContext } from "react";

import { type FormItemContextType } from "./types";

export const FormItemContext = createContext<FormItemContextType | null>(null);

export function useFormItemContext() {
  const context = useContext(FormItemContext);

  if (!context) {
    throw new Error("useFormItemContext must be used within a FormItemContext");
  }

  return context;
}
