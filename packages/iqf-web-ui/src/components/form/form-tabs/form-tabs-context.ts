import { createContext, useContext } from "react";

import { type FormTabsContextType } from "./types";

export const FormTabsContext = createContext<FormTabsContextType | null>(null);

export function useFormTabsContext() {
  const context = useContext(FormTabsContext);

  if (!context) {
    throw new Error(
      "useFormTabsContext must be used within a FormTabsProvider",
    );
  }

  return context;
}
