import { type PropsWithChildren } from "react";
import { useIntl } from "react-intl";

import { Message } from "../components/atoms/message";
import { useSettingsContext } from "../settings/context";
import { useMeContext } from "./me";
import { useSecurityContext } from "./security-context";

/**
 *  Localstorage key, where user is coming from before redirected to login screen of IDP (Keycloak)
 */
export const AUTH_REDIRECT_URL_KEY = "redirectUrl";

/**
 * Default implementation of `AuthGuard`, which is tested in combination with `OpenIDProvider`.
 * If you need different/simplier implementation, you can create your own.
 */
export function AuthGuard({ children }: PropsWithChildren) {
  const intl = useIntl();

  const {
    router: { pathname },
  } = useSettingsContext();

  const {
    query: { data: meQueryData, isSuccess, isFetched, isError },
  } = useMeContext();

  const { login } = useSecurityContext();

  /**
   * `me` data has not start fetching yet.
   *
   * Fetching of `me` data is triggered by OpenIDProvider once its client is initialized.
   * Initialization is asynchronous without await possibility.
   *
   * Specifically, when user is redirect back from IDP (keycloak) after successful login,
   * OpenIDProvider is initialized asynchronously and only after that `me` data is fetched.
   */
  if (!isFetched) {
    return null;
  }

  /**
   * Unknown error happened while getting `me` data.
   */
  if (isError) {
    return (
      // TODO: Error screen
      <div className="container my-10">
        <Message variant="error">
          {intl.formatMessage({
            id: "error.loading-me",
            defaultMessage:
              "Nastala chyba při načítání dat o uživateli. Zkuste prosím znovu načíst stránku. Pokud problém přetrvává, kontaktujte podporu.",
          })}
        </Message>
      </div>
    );
  }

  /**
   * `me` has been successfully fetched and is null,
   * save current URL to local storage and redirect to login.
   */
  if (isSuccess && meQueryData === null) {
    localStorage.setItem(AUTH_REDIRECT_URL_KEY, pathname);

    login();
    return null;
  }

  return children;
}
