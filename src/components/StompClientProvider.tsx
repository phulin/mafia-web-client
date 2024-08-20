import { Client, IFrame } from "@stomp/stompjs";
import { ReactNode, useMemo, useState } from "react";
import { StompClientContext } from "./StompClientContext";

export interface StompClientProviderProps {
  children?: ReactNode;
}

export default function StompClientProvider({
  children,
}: StompClientProviderProps) {
  const [connected, setConnected] = useState(false);

  const client = useMemo(() => {
    const result = new Client({
      brokerURL: "ws://localhost:60081/ws",
      onConnect() {
        console.log("connected");
        setConnected(true);
      },
      onWebSocketError() {
        console.error("WebSocket error.");
        setConnected(false);
      },
      onStompError(frame: IFrame) {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });
    result.activate();
    return result;
  }, []);

  return (
    <StompClientContext.Provider value={connected ? { client } : {}}>
      {children}
    </StompClientContext.Provider>
  );
}
