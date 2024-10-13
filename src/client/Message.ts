export const messageTypes = ["charsheet"] as const;

export type MessageType = (typeof messageTypes)[number];

export type MessageTypeFromString<T extends MessageType> = T extends "charsheet"
  ? CharacterSheetMessage
  : never;

export interface Message {
  type: MessageType;
}

export function isMessage(message: unknown): message is Message {
  return (
    typeof message === "object" &&
    message !== null &&
    "type" in message &&
    typeof message.type === "string" &&
    (messageTypes as readonly unknown[]).includes(message.type)
  );
}

export interface CharacterSheetMessage extends Message {
  type: "charsheet";

  username: string;
  userId: number;
  currentLevel: number;
  ascensionClass: string;

  currentHP: number;
  maximumHP: number;
  baseMaxHP: number;
  currentMP: number;
  maximumMP: number;
  baseMaxMP: number;

  adjustedStats: [number, number, number];
  totalSubpoints: [number, number, number];
  baseStats: [number, number, number];
}

function isNumber(thing: unknown): thing is number {
  return typeof thing === "number";
}

export function isCharacterSheetMessage(
  message: unknown
): message is CharacterSheetMessage {
  if (!isMessage(message)) return false;

  if (
    message.type !== "charsheet" ||
    !("username" in message) ||
    typeof message.username !== "string" ||
    !("userId" in message) ||
    typeof message.userId !== "number" ||
    !("currentLevel" in message) ||
    typeof message.currentLevel !== "number" ||
    !("ascensionClass" in message) ||
    typeof message.ascensionClass !== "string" ||
    !("currentHP" in message) ||
    typeof message.currentHP !== "number" ||
    !("maximumHP" in message) ||
    typeof message.maximumHP !== "number" ||
    !("baseMaxHP" in message) ||
    typeof message.baseMaxHP !== "number" ||
    !("currentMP" in message) ||
    typeof message.currentMP !== "number" ||
    !("maximumMP" in message) ||
    typeof message.maximumMP !== "number" ||
    !("baseMaxMP" in message) ||
    typeof message.baseMaxMP !== "number" ||
    !("adjustedStats" in message) ||
    !Array.isArray(message.adjustedStats) ||
    message.adjustedStats.length !== 3 ||
    !("totalSubpoints" in message) ||
    !Array.isArray(message.totalSubpoints) ||
    message.totalSubpoints.length !== 3 ||
    !("baseStats" in message) ||
    !Array.isArray(message.baseStats) ||
    message.baseStats.length !== 3 ||
    !message.adjustedStats.every(isNumber) ||
    !message.totalSubpoints.every(isNumber) ||
    !message.baseStats.every((stat): stat is number => typeof stat === "number")
  ) {
    return false;
  }

  return true;
}

export const messageValidators: {
  [K in MessageType]: (message: unknown) => message is MessageTypeFromString<K>;
} = {
  charsheet: isCharacterSheetMessage,
};
