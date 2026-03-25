import { type PropsWithChildren } from "react";

import { FormTabsContentContext } from "./form-tabs-content-context";
import { type FormTabsContentContextType } from "./types";

export function FormTabsContentContextProvider({
  children,
  name,
}: PropsWithChildren<FormTabsContentContextType>) {
  return (
    <FormTabsContentContext.Provider value={{ name }}>
      {children}
    </FormTabsContentContext.Provider>
  );
}
