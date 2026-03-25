import { type PropsWithChildren, type ReactNode, useMemo } from "react";
import {
  BrowserRouter,
  type BrowserRouterProps,
  useNavigate,
} from "react-router";

import { IqfRouterContext } from "./iqf-router-context";

/**
 * React router wrapper with context for navigation.
 */
export function IqfRouter({
  children,
  ...props
}: PropsWithChildren<BrowserRouterProps>) {
  return (
    <BrowserRouter {...props}>
      <IqfRouterInner>{children}</IqfRouterInner>
    </BrowserRouter>
  );
}

function IqfRouterInner({ children }: { children?: ReactNode | undefined }) {
  const navigate = useNavigate();

  const context = useMemo(
    () => ({
      navigate,
    }),
    [navigate],
  );

  return (
    <IqfRouterContext.Provider value={context}>
      {children}
    </IqfRouterContext.Provider>
  );
}
