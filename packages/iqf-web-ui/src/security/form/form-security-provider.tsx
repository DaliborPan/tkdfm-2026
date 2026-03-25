import { useCallback, useMemo } from "react";

import { useEventCallback } from "../../utils/hooks/event-callback-hook";
import { useMeContext } from "../me";
import {
  FormSecurityClient,
  type FormSecurityClientOptions,
} from "./form-security-client";
import { FormSecurityContext } from "./form-security-context";

type FormSecurityProviderProps = {
  /**
   * Options for the security client.
   */
  clientOptions: FormSecurityClientOptions;

  /**
   * Called when login is initialized.
   */
  onLoginInit?: () => void;

  /**
   * Called when login is successful.
   */
  onLogin?: () => void;

  /**
   * Called when logout is successful.
   */
  onLogout?: () => void;
};

/**
 * Security provider used for base login form authentication.
 *
 * This provider must have access to `MeContext`.
 */
export function FormSecurityProvider({
  children,
  onLoginInit,
  onLogin,
  onLogout,
  clientOptions,
}: React.PropsWithChildren<FormSecurityProviderProps>) {
  const meContext = useMeContext();

  const client = useMemo(
    () => new FormSecurityClient(clientOptions),
    [clientOptions],
  );
  const login = useCallback(async () => {
    onLoginInit?.();
  }, [onLoginInit]);

  const loginCallback = useEventCallback(
    async (username: string, password: string) => {
      await client.loginCallback(username, password);

      await meContext.query.refetch();

      onLogin?.();
    },
  );

  const logout = useEventCallback(async () => {
    await client.logoutCallback();

    await meContext.query.refetch();

    onLogout?.();
  });

  const context: FormSecurityContext = useMemo(
    () => ({
      isLoggedIn: !!meContext.query.data,
      login,
      loginCallback,
      logout,
    }),
    [login, loginCallback, logout, meContext.query.data],
  );

  return (
    <FormSecurityContext.Provider value={context}>
      {children}
    </FormSecurityContext.Provider>
  );
}
