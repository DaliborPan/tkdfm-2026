import { createContext } from "react";

import { type WebSocketClient } from "./web-socket-client";

export const WebSocketContext = createContext<{
  client: WebSocketClient | undefined;
  setConnectHeaders: (headers: Record<string, string>) => void;
}>({
  client: undefined,

  /**
   * Intentionally empty function, since it is used in `OpenIDProvider`, which
   * might leave inside WebSocketProvider or not.
   */
  setConnectHeaders: () => void 0,
});
