import {
  Client,
  type StompConfig,
  type StompHeaders,
  type StompSubscription,
  type messageCallbackType,
} from "@stomp/stompjs";

type StompSessionSubscription = {
  destination: string;
  callback: messageCallbackType;
  headers: StompHeaders;
  subscription?: StompSubscription;
};

const subscriptionRequests: Map<
  string,
  [
    StompSessionSubscription,
    ((subscription: StompSubscription) => void) | undefined,
  ]
> = new Map();

export type WebSocketClientConfig = StompConfig & {
  /**
   * Either provide the full URL or just the brokerURL, such as "/api/eportal-bo/stomp"
   */
  fullUrl?: string;
};

export class WebSocketClient {
  /**
   * The STOMP client.
   */
  private client: Client;

  constructor(config: WebSocketClientConfig) {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const fullUrl =
      config.fullUrl ||
      `${protocol}//${window.location.hostname}:${window.location.port}${config.brokerURL}`;

    this.client = new Client({
      ...config,
      brokerURL: fullUrl,
      // debug: console.log,
      splitLargeFrames: true,
      onConnect: (frame) => {
        if (config.onConnect) config.onConnect(frame);

        subscriptionRequests.forEach(([value, onSubscription]) => {
          value.subscription = this.client.subscribe(
            value.destination,
            value.callback,
            value.headers,
          );

          if (onSubscription) {
            onSubscription(value.subscription);
          }
        });
      },
    });
  }

  /**
   * Subscribes to a topic.
   * @param destination The topic to subscribe to.
   * @param callback The callback to call when a message is received.
   * @param headers The headers to send with the subscription request.
   */
  subscribe(
    destination: string,
    callback: messageCallbackType,
    headers: StompHeaders = {},
    onSubscription?: (subscription: StompSubscription) => void,
  ) {
    const subscriptionId = Math.random().toString(36).substr(2, 9);
    const subscriptionRequest: StompSessionSubscription = {
      destination,
      callback,
      headers,
    };

    subscriptionRequests.set(subscriptionId, [
      subscriptionRequest,
      onSubscription,
    ]);

    if (this.client.connected) {
      subscriptionRequest.subscription = this.client.subscribe(
        destination,
        callback,
        headers,
      );

      if (onSubscription) {
        onSubscription(subscriptionRequest.subscription);
      }
    }

    return () => {
      const subscription = subscriptionRequests.get(subscriptionId);

      if (subscription && subscription[0].subscription) {
        subscription[0].subscription.unsubscribe();
      }

      subscriptionRequests.delete(subscriptionId);
    };
  }

  /**
   * Sends a message to a topic.
   * @param destination The topic to send the message to.
   * @param body The message to send.
   * @param headers The headers to send with the message.
   */
  send(destination: string, body: string, headers: StompHeaders = {}) {
    this.client.publish({ destination, body, headers });
  }

  activate() {
    this.client.activate();
  }

  deactivate() {
    this.client.deactivate();
  }
}
