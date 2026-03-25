import { createContext, useContext } from "react";

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const TabsContextProvider = TabsContext.Provider;

export function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }

  return context;
}
