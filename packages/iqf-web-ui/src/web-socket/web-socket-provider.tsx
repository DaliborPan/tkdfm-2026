import { type PropsWithChildren, useEffect, useState } from "react";

import {
  WebSocketClient,
  type WebSocketClientConfig,
} from "./web-socket-client";
import { WebSocketContext } from "./web-socket-context";

type WebSocketProviderProps = WebSocketClientConfig & {
  requiredAuthorization?: boolean;
  setConnectHeaders: (headers: Record<string, string>) => void;
};

export function WebSocketProvider({
  requiredAuthorization,
  setConnectHeaders,
  fullUrl,
  children,
  ...config
}: PropsWithChildren<WebSocketProviderProps>) {
  const [client, setClient] = useState<WebSocketClient | undefined>(undefined);

  useEffect(() => {
    const _client = new WebSocketClient({
      ...config,
      fullUrl,
    });

    setClient(_client);

    if (requiredAuthorization && !config.connectHeaders?.Authorization) {
      return;
    }

    _client.activate();

    return () => {
      _client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(config)]);

  return (
    <WebSocketContext.Provider value={{ client, setConnectHeaders }}>
      {!!client && children}
    </WebSocketContext.Provider>
  );
}
