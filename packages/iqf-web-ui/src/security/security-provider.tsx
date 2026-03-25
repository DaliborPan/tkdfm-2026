import { type PropsWithChildren } from "react";

import { SecurityContext, type SecurityContextType } from "./security-context";

export function SecurityProvider({
  children,
  value,
}: PropsWithChildren<{ value: SecurityContextType }>) {
  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}
