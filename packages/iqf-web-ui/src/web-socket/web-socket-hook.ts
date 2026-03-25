import {
  type IMessage,
  type StompHeaders,
  type StompSubscription,
  type messageCallbackType,
} from "@stomp/stompjs";
import { type DependencyList, useContext, useEffect, useRef } from "react";

import { WebSocketContext } from "./web-socket-context";

export type { IMessage };

export function useWebSocketClient() {
  const { client } = useContext(WebSocketContext);

  return client;
}

export function useWebSocketSubscription(
  {
    destinations,
    onMessage,
    onSubscription,
    headers = {},
  }: {
    destinations: string | string[];
    onMessage: messageCallbackType;
    onSubscription?: (subscription: StompSubscription) => void;
    headers?: StompHeaders;
  },
  deps: DependencyList = [],
) {
  const { client } = useContext(WebSocketContext);
  const callbackRef = useRef<messageCallbackType>(onMessage);
  const _destinations = Array.isArray(destinations)
    ? destinations
    : [destinations];

  callbackRef.current = onMessage;

  useEffect(() => {
    if (!client) {
      return;
    }

    const cleanUpFunctions: (() => void)[] = [];

    _destinations.forEach((dest) => {
      cleanUpFunctions.push(
        client.subscribe(dest, callbackRef.current, headers, onSubscription),
      );
    });

    return () => {
      cleanUpFunctions.forEach((_cleanUpFunction) => {
        _cleanUpFunction();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(_destinations).toString(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(headers).toString(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);
}
