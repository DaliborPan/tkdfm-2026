import axios from "axios";

export type FormSecurityClientOptions = {
  initCallback?: () => Promise<void>;

  loginUrl?: string;
  loginCallback?: (username: string, password: string) => Promise<void>;

  logoutUrl?: string;
  logoutCallback?: () => Promise<void>;

  usernameParameter?: string;
  passwordParameter?: string;
};

export class FormSecurityClient {
  constructor({
    initCallback,
    loginUrl,
    loginCallback,
    logoutUrl,
    logoutCallback,
    usernameParameter = "username",
    passwordParameter = "password",
  }: FormSecurityClientOptions) {
    if (loginCallback !== undefined) {
      this.loginCallback = loginCallback;
    } else if (loginUrl !== undefined) {
      this.loginCallback = async (username: string, password: string) => {
        const data = new FormData();
        data.append(usernameParameter, username);
        data.append(passwordParameter, password);

        await axios.post(loginUrl, data);
      };
    } else {
      throw new Error("loginCallback or loginUrl is required");
    }

    if (logoutCallback !== undefined) {
      this.logoutCallback = logoutCallback;
    } else if (logoutUrl !== undefined) {
      this.logoutCallback = async () => {
        try {
          await axios.post(logoutUrl);
        } catch (e) {
          console.log("logout error", e);
        }
      };
    } else {
      throw new Error("logoutCallback or logoutUrl is required");
    }

    if (initCallback !== undefined) {
      initCallback();
    }
  }

  public loginCallback: (username: string, password: string) => Promise<void>;

  public logoutCallback: () => Promise<void>;
}
