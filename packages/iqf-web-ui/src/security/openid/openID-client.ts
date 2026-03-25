import * as oauth from "oauth4webapi";

const OAUTH_CODE_VERIFIER = "oauthCodeVerifier";

export type OpenIDResponse = {
  accessToken: string;
  refreshToken: string | null;
  idToken: string;
  expiresAt: number | null;
};

export type OpenIDClientOptions = {
  /**
   * URL of the OpenID Connect issuer.
   * Used to discover the OpenID Connect endpoints.
   */
  issuer: string;

  /**
   * Client ID of the application.
   */
  clientId: string;

  /**
   * Some applications might need to define clientSecret when making
   * redirects to IDP.
   */
  clientSecret?: string;

  /**
   * Custom path the IDP redirects to after login (handled by OauthSecurityClient).
   */
  redirectPath: string;

  /**
   * Custom path the IDP redirects to after logout (handled by OauthSecurityClient).
   */
  logoutRedirectPath: string;

  /**
   * How long before the access token expires should the client request a new one.
   */
  timeReserveMs: number;

  /**
   * Custom key for storing auth data in local storage.
   *
   * @default "auth"
   */
  localstorageAuthKey?: string;
};

type OpenIDClientPrivateOptions = OpenIDClientOptions & {
  localstorageMeKey: string;

  onReady?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onAccessTokenChange?: (token: string | null) => void;
};

/**
 * Specialized OAuth 2.0 client for OpenID Connect.
 */
export class OpenIDClient {
  private options: OpenIDClientPrivateOptions &
    Pick<Required<OpenIDClientPrivateOptions>, "localstorageAuthKey">;

  private as: oauth.AuthorizationServer | null;

  private auth: OpenIDResponse | null;

  constructor(options: OpenIDClientPrivateOptions) {
    this.as = null;
    this.options = {
      ...options,
      localstorageAuthKey: options.localstorageAuthKey ?? "auth",
    };

    this.auth = localStorage.getItem(this.options.localstorageAuthKey)
      ? JSON.parse(localStorage.getItem(this.options.localstorageAuthKey)!)
      : null;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getToken = this.getToken.bind(this);

    this.init();
  }

  private async init() {
    try {
      if (this.isLoginRedirect()) {
        await this.handleLoginRedirect();
      }

      if (this.isLogoutRedirect()) {
        this.handleLogoutRedirect();
      }
    } finally {
      this.handleReady();
    }
  }

  public getAuth() {
    return this.auth;
  }

  public getToken() {
    return this.auth?.accessToken ?? null;
  }

  /**
   * Login function to be used by login button. It redirects user
   * to Keycloak (IDP) login page with proper parameters.
   */
  public async login() {
    const as = await this.initAs();
    const client = this.initClient();

    const codeVerifier = oauth.generateRandomCodeVerifier();
    const codeChallenge = await oauth.calculatePKCECodeChallenge(codeVerifier);
    const codeChallengeMethod = "S256";

    sessionStorage.setItem(OAUTH_CODE_VERIFIER, codeVerifier);

    const redirectUrl = window.location.origin + this.options.redirectPath;
    // redirect user to as.authorization_endpoint
    const authorizationUrl = new URL(as.authorization_endpoint!);
    authorizationUrl.searchParams.set("client_id", client.client_id);
    if (this.options.clientSecret) {
      authorizationUrl.searchParams.set(
        "client_secret",
        this.options.clientSecret,
      );
    }
    authorizationUrl.searchParams.set("code_challenge", codeChallenge);
    authorizationUrl.searchParams.set(
      "code_challenge_method",
      codeChallengeMethod,
    );
    authorizationUrl.searchParams.set("redirect_uri", redirectUrl);
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("scope", "openid");

    window.location.href = authorizationUrl.toString();
  }

  /**
   * Logout function to be used by logout button. It redirects user
   * to Keycloak (IDP) logout page with proper parameters.
   */
  public async logout() {
    if (this.auth !== null) {
      const as = await this.initAs();

      localStorage.removeItem(this.options.localstorageAuthKey);
      localStorage.removeItem(this.options.localstorageMeKey);

      const redirectUrl =
        window.location.origin + this.options.logoutRedirectPath;
      // redirect user to as.authorization_endpoint
      const logoutUrl = new URL(as.end_session_endpoint!);
      logoutUrl.searchParams.set("id_token_hint", this.auth.idToken);
      logoutUrl.searchParams.set("client_id", this.options.clientId);
      if (this.options.clientSecret) {
        logoutUrl.searchParams.set("client_secret", this.options.clientSecret);
      }
      logoutUrl.searchParams.set("post_logout_redirect_uri", redirectUrl);

      window.location.href = logoutUrl.toString();
    }
  }

  /**
   * Checks the current URL is equal to the login redirect path from Keycloak (IDP).
   */
  private isLoginRedirect() {
    return window.location.pathname === this.options.redirectPath;
  }

  /**
   * Checks the current URL is equal to the logout redirect path from Keycloak (IDP).
   */
  private isLogoutRedirect() {
    return window.location.pathname === this.options.logoutRedirectPath;
  }

  /**
   * Handles situation when user is redirected back from the Keycloak (IDP) after
   * successfull login.
   */
  private async handleLoginRedirect() {
    const as = await this.initAs();
    const client = this.initClient();

    const currentUrl = new URL(window.location.href);
    const parameters = oauth.validateAuthResponse(
      as,
      client,
      currentUrl,
      oauth.expectNoState,
    );
    if (oauth.isOAuth2Error(parameters)) {
      console.log("error", parameters);
      throw new Error(); // Handle OAuth 2.0 redirect error
    }

    const redirectUrl = window.location.origin + this.options.redirectPath;

    const codeVerifier = sessionStorage.getItem(OAUTH_CODE_VERIFIER);
    if (codeVerifier === null) {
      throw new Error("No code verifier found");
    } else {
      sessionStorage.removeItem(OAUTH_CODE_VERIFIER);
    }

    const response = await oauth.authorizationCodeGrantRequest(
      as,
      client,
      parameters,
      redirectUrl,
      codeVerifier,
    );

    let challenges: oauth.WWWAuthenticateChallenge[] | undefined;
    if ((challenges = oauth.parseWwwAuthenticateChallenges(response))) {
      for (const challenge of challenges) {
        console.log("challenge", challenge);
      }
      console.error("response", response);
      throw new Error(); // Handle www-authenticate challenges as needed
    }

    const result = await oauth.processAuthorizationCodeOpenIDResponse(
      as,
      client,
      response,
    );
    if (oauth.isOAuth2Error(result)) {
      console.log("error", result);
      throw new Error(); // Handle OAuth 2.0 response body error
    }

    this.auth = {
      accessToken: result.access_token,
      refreshToken: result.refresh_token ?? null,
      idToken: result.id_token,
      expiresAt:
        result.expires_in !== undefined
          ? Date.now() + result.expires_in * 1000
          : null,
    };

    localStorage.setItem(
      this.options.localstorageAuthKey,
      JSON.stringify(this.auth),
    );

    this.options.onLogin?.();
  }

  private handleLogoutRedirect() {
    this.auth = null;
    localStorage.removeItem(this.options.localstorageAuthKey);

    this.options.onLogout?.();
  }

  private handleReady() {
    if (this.auth !== null) {
      this.scheduleRefreshToken();
    }

    this.options.onAccessTokenChange?.(this.auth?.accessToken ?? null);
    this.options.onReady?.();
  }

  public async refreshToken() {
    if (this.auth !== null && this.auth.refreshToken !== null) {
      const as = await this.initAs();
      const client = this.initClient();

      const response = await oauth.refreshTokenGrantRequest(
        as,
        client,
        this.auth.refreshToken,
      );

      let challenges: oauth.WWWAuthenticateChallenge[] | undefined;
      if ((challenges = oauth.parseWwwAuthenticateChallenges(response))) {
        for (const challenge of challenges) {
          console.log("challenge", challenge);
        }
        console.error("response", response);
        throw new Error(); // Handle www-authenticate challenges as needed
      }

      const result = await oauth.processRefreshTokenResponse(
        as,
        client,
        response,
      );
      if (oauth.isOAuth2Error(result)) {
        console.log("error", result);
        throw new Error(); // Handle OAuth 2.0 response body error
      }

      this.auth = {
        ...this.auth,
        accessToken: result.access_token,
        refreshToken: result.refresh_token ?? null,
        expiresAt:
          result.expires_in !== undefined
            ? Date.now() + result.expires_in * 1000
            : null,
      };

      localStorage.setItem(
        this.options.localstorageAuthKey,
        JSON.stringify(this.auth),
      );

      if (this.options.onAccessTokenChange) {
        this.options.onAccessTokenChange(this.auth?.accessToken ?? null);
      }

      this.scheduleRefreshToken();

      return true;
    }
  }

  private scheduleRefreshToken() {
    if (this.auth !== null && this.auth.expiresAt !== null) {
      const timeout =
        this.auth.expiresAt - Date.now() - this.options.timeReserveMs;

      if (timeout <= 0) {
        this.logout();
      }

      setTimeout(() => {
        this.refreshToken();
      }, timeout);
    }
  }

  private async initAs() {
    if (this.as !== null) {
      return this.as;
    }

    const issuerUrl = new URL(this.options.issuer);

    const response = await oauth.discoveryRequest(issuerUrl);
    this.as = await oauth.processDiscoveryResponse(issuerUrl, response);

    return this.as;
  }

  private initClient() {
    const client: oauth.Client = {
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      token_endpoint_auth_method: this.options.clientSecret
        ? "client_secret_basic"
        : "none",
    };

    return client;
  }
}
