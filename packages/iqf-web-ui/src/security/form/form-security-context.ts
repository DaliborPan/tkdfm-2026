import { createContext, useContext } from "react";

import { type SecurityContextType } from "../security-context";

/**
 * Specialized security context used for login form authentication.
 */
export type FormSecurityContext = SecurityContextType & {
  /**
   * Performs the login api call.
   */
  loginCallback: (username: string, password: string) => Promise<void>;
};

export const FormSecurityContext = createContext<FormSecurityContext | null>(
  null,
);

export function useFormSecurityContext() {
  const context = useContext(FormSecurityContext);

  if (!context) {
    throw new Error(
      "useFormSecurityContext must be used within a FormSecurityProvider",
    );
  }

  return context;
}
