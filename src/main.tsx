import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Client } from "./client/Client.ts";
import ClientContext from "./client/ClientContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <ClientContext.Provider value={new Client()}>
        <App />
      </ClientContext.Provider>
    </ChakraProvider>
  </StrictMode>
);
