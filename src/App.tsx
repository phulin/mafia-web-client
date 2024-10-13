import { useContext } from "react";
import ClientContext from "./client/ClientContext";
import CharacterSheet from "./components/CharacterSheet";

function App() {
  const client = useContext(ClientContext);
  client.connect("ws://127.0.0.1:60079/ws");

  return <CharacterSheet />;
}

export default App;
