import React from "react";
import { IRectangle, Shape } from "./Shape";
import { cardSprites } from "../assets/cardSpritesIndex";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { useAppStore } from "../GameState";
import { useSpriteRects } from "../utils/SpriteSheet";
import { cardSliceData } from "../assets/sliceData";

export enum Suits {
  Hearts = 'hearts',
  Spades = 'spades',
  Diamonds = 'diamonds',
  Clubs = 'clubs',
}

export enum Ranks {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
}

export enum Modifier {
  Lucky,
  Bonus,
  Mult,
  Wild,
  Glass
}

export interface IPlayingCard {
  suit: Suits;
  rank: Ranks;
  isFaceCard: boolean;
  modifier: Modifier | null,
}


export function createCard(
  suit: Suits,
  rank: Ranks,
  modifier: Modifier,
  x: SharedValue<number>,
  y: SharedValue<number>,
  width: number,
  height: number,
): IPlayingCard | null {
  const isFaceCard = [Ranks.Jack, Ranks.Queen, Ranks.King].includes(rank);
  const deck = useAppStore((s) => s.currentDeck);
  if (!deck.state) { return null }
  const id = deck.state.total;
  const card = {
    id: id,
    suit,
    rank,
    isFaceCard,
    x,
    y,
    width,
    height,
    type: Shape.Rectangle,
    modifier: modifier,
  };
  return card;
}

export function generateDeck(): IPlayingCard[] {
  const deck: IPlayingCard[] = [];
  const suits = Object.values(Suits);
  const ranks = Object.values(Ranks);
  const cardSpriteRects = useSpriteRects(cardSliceData);
  for (const suit of suits) {
    for (const rank of ranks) {
    }
  }
  return deck;
} 