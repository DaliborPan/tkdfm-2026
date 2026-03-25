import { type PropsWithChildren } from "react";

import { FormTabsContext } from "./form-tabs-context";
import { type FormTabsContextType } from "./types";

export function FormTabsProvider({
  children,
  ...value
}: PropsWithChildren<FormTabsContextType>) {
  return (
    <FormTabsContext.Provider value={value}>
      {children}
    </FormTabsContext.Provider>
  );
}
