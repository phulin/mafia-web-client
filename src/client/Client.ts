import {
  MessageType,
  MessageTypeFromString,
  messageValidators,
} from "./Message";

export type Listener<K extends MessageType> = (
  message: MessageTypeFromString<K>
) => void;

export class Client {
  private socket?: WebSocket;

  private listeners: {
    [K in MessageType]: Listener<K>[];
  } = {
    charsheet: [],
  };

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      for (const [typ, listeners] of Object.entries(this.listeners)) {
        if (messageValidators[typ as MessageType](message)) {
          for (const listener of listeners) {
            listener(message);
          }
        }
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  addListener<K extends MessageType>(messageType: K, listener: Listener<K>) {
    this.listeners[messageType].push(listener);
  }
}
