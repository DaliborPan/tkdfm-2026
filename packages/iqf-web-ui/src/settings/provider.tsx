import { type ComponentPropsWithRef, type PropsWithChildren } from "react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";

import { SettingsContext } from "./context";
import { usePreferenceSource } from "./preferences/preferences-source";

type SettingsProviderProps = Pick<
  SettingsContext,
  "components" | "form" | "pdfViewer" | "table"
> & {
  enableSyncPreferences?: boolean;
  preferencesUrl?: string;

  /**
   * If using Vite, this prop is not needed.
   */
  router?: Partial<SettingsContext["router"]>;
  zod?: Partial<SettingsContext["zod"]>;
};

function Link({
  href,
  ref,
  ...props
}: PropsWithChildren<
  Omit<ComponentPropsWithRef<typeof ReactRouterLink>, "to"> & {
    href: string;
  }
>) {
  return <ReactRouterLink {...props} to={href} ref={ref} />;
}

export function SettingsProvider({
  children,
  enableSyncPreferences = true,
  preferencesUrl,
  ...props
}: React.PropsWithChildren<SettingsProviderProps>) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = props.router?.navigate ?? useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = props.router?.pathname ?? useLocation().pathname;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = props.router?.searchParams ?? useSearchParams()[0];

  const preferences = usePreferenceSource(
    enableSyncPreferences,
    preferencesUrl,
  );

  return (
    <SettingsContext
      value={{
        ...props,

        router: {
          navigate: (href) => {
            if (href) {
              navigate(href);
            }
          },
          pathname,
          searchParams,
          useParams,
          Link,

          ...(props.router ?? {}),
        },
        zod: {
          enableQueryLogging: true,

          ...(props.zod ?? {}),
        },
        form: {
          ...(props.form ?? {}),
          fields: {
            enableReset: false,
            ...(props.form?.fields ?? {}),
          },
        },
        preferences,
      }}
    >
      {(!enableSyncPreferences || preferences.loaded) && children}
    </SettingsContext>
  );
}
