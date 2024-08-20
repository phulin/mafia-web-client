import { Client } from "@stomp/stompjs";
import { createContext } from "react";

export interface StompClientContextValue {
  client?: Client;
}

export const StompClientContext = createContext<StompClientContextValue>({});
