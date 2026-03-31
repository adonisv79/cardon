// The Static "Library" definition
export enum CardType {
  CREATURE = "CREATURE",
  SPELL = "SPELL",
  HERO = "HERO",
  EQUIPMENT = "EQUIPMENT",
  ACTION = "ACTION",
}

export interface CardBase {
  id: string; // Unique ID for the card entry (e.g., "elvish-mage")
  name: string;
  description: string;
  imageUrl: string;
  type: CardType;
  manaCost: number;
}

// Example of Extension
export interface CreatureCard extends CardBase {
  type: CardType.CREATURE;
  attack: number;
  health: number;
}

// The LIVE instance in a game
export interface CardItem {
  instanceId: string; // Unique ID for this specific copy in the match
  cardId: string; // Reference to the CardBase ID
  isTapped: boolean;
  isFaceDown: boolean;
  counters: {
    damage?: number;
    stun?: number;
    generic?: number;
  };
}

export type GameArea =
  | "DRAW_PILE"
  | "HAND"
  | "PLAY_AREA"
  | "DISCARD_PILE"
  | "EXILED";
