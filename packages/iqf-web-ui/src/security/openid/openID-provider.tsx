import axios from "axios";
import { type PropsWithChildren, useContext, useImperativeHandle } from "react";

import { type PropsWithElementRef } from "../../types";
import { useSingleton } from "../../utils/hooks/singleton-hook";
import { WebSocketContext } from "../../web-socket";
import { useMeContext } from "../me";
import { SecurityProvider } from "../security-provider";
import { OpenIDClient, type OpenIDClientOptions } from "./openID-client";

type OpenIDProviderProps = {
  /**
   * OpenID client options, that are specific for each project.
   */
  clientOptions: OpenIDClientOptions;

  /**
   * Callback that is called when user is sent back to FE from IDP (Keycloak)
   * to `clientOptions.redirectPath` and after OpenIDClient to its job
   * to get user data and token.
   *
   * This function usually navigates user to correct redirectUrl (url from where user was
   * redirected to IDP for login).
   */
  onLogin?: () => void;

  /**
   * Callback that is called when user is redirected to `clientOptions.logoutRedirectPath`
   * and after OpenIDClient to its job to logout user.
   *
   * This function usually navigates user to `/` or `/login` page, from where user can login again.
   */
  onLogout?: () => void;
};

export type OpenIDHandle = {
  client: OpenIDClient | undefined;
};

/**
 * OpenID Connect provider, that renders `SecurityProvider`.
 *
 * This provider must have access to `MeContext`.
 */
export function OpenIDProvider({
  children,
  clientOptions,
  onLogin,
  onLogout,
  ref,
}: PropsWithElementRef<PropsWithChildren<OpenIDProviderProps>, OpenIDHandle>) {
  const { setConnectHeaders } = useContext(WebSocketContext);
  const meContext = useMeContext();

  const client = useSingleton(
    () =>
      new OpenIDClient({
        ...clientOptions,
        localstorageMeKey: meContext.localstorageMeKey,
        onLogin,
        onLogout,

        /**
         * Default implementation of `onAccessTokenChange` that sets `Authorization` header
         * for axios and WebSocket.
         */
        onAccessTokenChange: (token) => {
          const authorizationString = token !== null ? `Bearer ${token}` : "";

          axios.defaults.headers.common.Authorization = authorizationString;

          if (authorizationString) {
            setConnectHeaders({ Authorization: authorizationString });
          }
        },
        onReady: meContext.query.refetch,
      }),
    [clientOptions, onLogin, onLogout],
  );

  void useImperativeHandle(ref, () => ({ client }), [client]);

  const clientNotInitializedFn = () => {
    console.error("Client not initialized yet. Calling dummy fn.");
    return Promise.resolve();
  };

  return (
    <SecurityProvider
      value={{
        // isLoggedIn is determined via MeProvider.
        isLoggedIn: "DO_NOT_USE_WITH_OPENID_PROVIDER" as never,

        login: client?.login ?? clientNotInitializedFn,
        logout: client?.logout ?? clientNotInitializedFn,
      }}
    >
      {children}
    </SecurityProvider>
  );
}
