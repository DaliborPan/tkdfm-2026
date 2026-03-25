import * as Sentry from "@sentry/react";
import { type PropsWithChildren, createContext, useContext } from "react";

import { SentryErrorBoundary } from "./sentry-error-boundary";

type SentryContextValue = {
  dev: {
    /**
     * Editor will be used to open the source code.
     *
     * @default "vscode"
     */
    editor: "vscode" | "antigravity" | "cursor";

    /**
     * Examples:
     * - WSL on Windows: `""`
     * - Cursor on Mac: `"file/Users/.../apps/web"`
     *
     * @default ""
     */
    rootPath: string;
  };

  config: {
    /**
     * Log in to `https://newsentry.inqool.cz/` and create a new project.
     * Then copy the DSN and paste it here. Ideally put it into the `.env` file.
     */
    dsn: string;
  };

  /**
   * Example:
   * - `process.env.NODE_ENV === "production" ? "Production" : "Development"`
   */
  mode: "Development" | "Production";

  /**
   * @default "Development"
   */
  environment?: string;
};

export const SentryContext = createContext<SentryContextValue | null>(null);

export function useSentryContext() {
  const context = useContext(SentryContext);

  if (!context) {
    console.log("useSentryContext must be used within a SentryProvider");

    return null;
  }

  return context;
}

export function SentryProvider({
  children,
  config,
  dev: { editor = "vscode", rootPath = "" },
  mode,
  environment = "Development",
}: PropsWithChildren<
  Omit<SentryContextValue, "dev"> & { dev: Partial<SentryContextValue["dev"]> }
>) {
  Sentry.init({
    integrations: [Sentry.browserTracingIntegration()],
    environment,
    enabled: mode === "Production" && config.dsn !== "",
    ...config,
  });

  return (
    <SentryContext.Provider
      value={{
        config,
        dev: { editor, rootPath },
        mode,
        environment,
      }}
    >
      <SentryErrorBoundary feature="app" actions={null}>
        {children}
      </SentryErrorBoundary>
    </SentryContext.Provider>
  );
}
