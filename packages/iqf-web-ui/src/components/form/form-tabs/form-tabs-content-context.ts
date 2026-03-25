import { createContext, useContext } from "react";

import { type FormTabsContentContextType } from "./types";

export const FormTabsContentContext = createContext<FormTabsContentContextType>(
  {
    name: "",
  },
);

export function useFormTabsContentContext() {
  const context = useContext(FormTabsContentContext);

  /**
   * Intentionally not throwing since `useFormTabsContentContext` is used withing `FormField`,
   * which does not need to be used within `FormTabsContentContextProvider`
   */
  return context;
}
