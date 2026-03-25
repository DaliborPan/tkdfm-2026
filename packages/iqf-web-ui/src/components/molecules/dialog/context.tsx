import { type PropsWithChildren, createContext, useContext } from "react";

import { type DialogContentContextType, type DialogSize } from "./types";

export const DialogContentContext =
  createContext<DialogContentContextType | null>(null);

export function useDialogContentContext() {
  const context = useContext(DialogContentContext);

  if (!context) {
    throw new Error(
      "DialogContentContext is used outside of DialogContentProvider",
    );
  }

  return context;
}

export function DialogContentContextProvider({
  size = "m",
  children,
}: PropsWithChildren<{ size?: DialogSize }>) {
  return (
    <DialogContentContext.Provider value={{ size }}>
      {children}
    </DialogContentContext.Provider>
  );
}
