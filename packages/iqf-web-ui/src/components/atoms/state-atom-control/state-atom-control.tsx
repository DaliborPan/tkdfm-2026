import { type PropsWithChildren, createContext, useContext } from "react";

import { type StateAtomControlContextType } from "./types";

const StateAtomControlContext =
  createContext<StateAtomControlContextType | null>(null);

export const useStateAtomControlContext = () => {
  const context = useContext(StateAtomControlContext);

  if (!context) {
    throw new Error(
      "useStateAtomControlContext should be used within <StateAtomControlProvider />",
    );
  }

  return context;
};

/**
 * Atoms, that are used as form fields, can have different states.
 *
 * This provider is used to provide the state to the atom parts - label, message
 * and component itself
 */
export function StateAtomControlProvider({
  state = "default",
  children,
}: PropsWithChildren<Partial<Pick<StateAtomControlContextType, "state">>>) {
  return (
    <StateAtomControlContext.Provider
      value={{
        state,
        invalid: state === "error",
        success: state === "success",
      }}
    >
      {children}
    </StateAtomControlContext.Provider>
  );
}
