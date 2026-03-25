import { createContext, useContext } from "react";

export type SecurityContextType = {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const SecurityContext = createContext<SecurityContextType | null>(null);

export function useSecurityContext() {
  const context = useContext(SecurityContext);

  if (!context) {
    throw new Error(
      "useSecurityContext must be used within a SecurityProvider",
    );
  }

  return context;
}
