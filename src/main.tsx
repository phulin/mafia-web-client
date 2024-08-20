import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import StompClientProvider from "./components/StompClientProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <StompClientProvider>
        <App />
      </StompClientProvider>
    </ChakraProvider>
  </StrictMode>
);
