import { createContext } from "react";
import { Client } from "./Client";

const ClientContext = createContext(new Client());

export default ClientContext;
