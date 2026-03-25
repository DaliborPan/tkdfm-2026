import { type ReactNode, createContext, useContext } from "react";

import { type TabsTriggerProps } from "../../molecules/tabs";

export type FormTabTriggerConf = TabsTriggerProps & {
  label: ReactNode;
};

export type FormTabsContextType = {
  tabGroupId: string;
  triggers: FormTabTriggerConf[];
  value: string;
  onValueChange: (value: string) => void;
};

export const FormTabsContext = createContext<FormTabsContextType | null>(null);

export const FormTabsProvider = FormTabsContext.Provider;

export function useFormTabsContext() {
  const context = useContext(FormTabsContext);

  if (!context) {
    throw new Error(
      "useFormTabsContext must be used within a FormTabsProvider",
    );
  }

  return context;
}
