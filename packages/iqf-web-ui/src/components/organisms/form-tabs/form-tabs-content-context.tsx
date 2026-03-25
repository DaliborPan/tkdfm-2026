import { type PropsWithChildren, createContext, useContext } from "react";

type FormTabsContentContextType = {
  name: string;
};

const FormTabsContentContext = createContext<FormTabsContentContextType>({
  name: "",
});

export function FormTabsContentContextProvider({
  children,
  ...props
}: PropsWithChildren<FormTabsContentContextType>) {
  return (
    <FormTabsContentContext.Provider value={props}>
      {children}
    </FormTabsContentContext.Provider>
  );
}

export function useFormTabsContentContext() {
  const context = useContext(FormTabsContentContext);

  return context;
}
