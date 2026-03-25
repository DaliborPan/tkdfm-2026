import { createContext, useContext } from "react";

import { type FormTabsStateContextType } from "./types";

export const FormTabsStateContext =
  createContext<FormTabsStateContextType | null>(null);

export function useFormTabsStateContext() {
  const context = useContext(FormTabsStateContext);

  if (!context) {
    throw new Error(
      "useFormTabsStateContext must be used within a FormTabsStateContext",
    );
  }

  return context;
}
