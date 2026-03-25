import { type PropsWithChildren, createContext, useContext } from "react";

export type DropdownMenuVariant = "default" | "primary";

export const DropdownMenuContext = createContext<{
  variant: DropdownMenuVariant;
}>(undefined as never);

export const useDropdownMenuContext = () => useContext(DropdownMenuContext);

export function DropdownMenuContextProvider({
  variant,
  children,
}: PropsWithChildren<{
  variant: DropdownMenuVariant;
}>) {
  return (
    <DropdownMenuContext.Provider value={{ variant }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenuContextProvider` instead
 */
export const DropdownContextProvider = DropdownMenuContextProvider;
