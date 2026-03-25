import { createContext, useContext } from "react";

export type FormTabsStateContext = {
  fields: string[];

  registerField: (field: string) => void;
  unregisterField: (field: string) => void;

  tabErrors: Record<string, number>;
};

export const FormTabsStateContext = createContext<FormTabsStateContext>({
  fields: [],

  registerField: () => null,
  unregisterField: () => null,

  tabErrors: {},
});

export const useFormTabsStateContext = () => {
  return useContext(FormTabsStateContext);
};
