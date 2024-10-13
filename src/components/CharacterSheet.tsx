import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import ClientContext from "../client/ClientContext";
import { CharacterSheetMessage } from "../client/Message";

export default function CharacterSheet() {
  const client = useContext(ClientContext);

  const [lastValue, setLastValue] = useState<Partial<CharacterSheetMessage>>(
    {}
  );

  useEffect(() => {
    client.addListener("charsheet", (message: CharacterSheetMessage) =>
      setLastValue(message)
    );
  }, [client]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Character Sheet</TableCaption>
        <Tbody>
          <Tr>
            <Td>Username</Td>
            <Td>{lastValue.username}</Td>
          </Tr>
          <Tr>
            <Td>User ID</Td>
            <Td>{lastValue.userId}</Td>
          </Tr>
          <Tr>
            <Td>Class</Td>
            <Td>{lastValue.ascensionClass}</Td>
          </Tr>
          <Tr>
            <Td>Level</Td>
            <Td>{lastValue.currentLevel}</Td>
          </Tr>
          <Tr>
            <Td>HP</Td>
            <Td>{`${lastValue.currentHP} / ${lastValue.maximumHP}`}</Td>
          </Tr>
          <Tr>
            <Td>MP</Td>
            <Td>{`${lastValue.currentMP} / ${lastValue.maximumMP}`}</Td>
          </Tr>
          <Tr>
            <Td>Muscle</Td>
            <Td>{`${lastValue.adjustedStats?.[0]} (${lastValue.baseStats?.[0]})`}</Td>
          </Tr>
          <Tr>
            <Td>Mysticality</Td>
            <Td>{`${lastValue.adjustedStats?.[1]} (${lastValue.baseStats?.[1]})`}</Td>
          </Tr>
          <Tr>
            <Td>Moxie</Td>
            <Td>{`${lastValue.adjustedStats?.[2]} (${lastValue.baseStats?.[2]})`}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
