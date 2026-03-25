import { createContext, useContext } from "react";

type WildcardContextType = {
  showWildcardButton: boolean;
  widlcardItems: { id: string; label: string }[];
};

export const WildcardContext = createContext<WildcardContextType>({
  showWildcardButton: false,
  widlcardItems: [],
});

export const useWildcardContext = () => useContext(WildcardContext);
