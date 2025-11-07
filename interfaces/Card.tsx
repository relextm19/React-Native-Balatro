import React from "react";
import { Shape } from "./Shape";
import { useAppStore } from "../GameState";
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
  Glass,
  Normal
}

export interface IPlayingCard {
  id: number,
  suit: Suits,
  rank: Ranks,
  isFaceCard: boolean,
  modifier: Modifier | null,
  x: number,
  y: number,
  width: number,
  height: number,
}

export function createCard(
  suit: Suits,
  rank: Ranks,
  modifier: Modifier,
): IPlayingCard | null {
  const isFaceCard = [Ranks.Jack, Ranks.Queen, Ranks.King].includes(rank);
  const deck = useAppStore((s) => s.currentDeck);
  if (!deck.state) { return null }
  const id = deck.state.total + 1;
  const x = (cardSliceData.spriteWidth + cardSliceData.offsetX) * Object.values(Ranks).findIndex((r) => r === rank);
  const y = (cardSliceData.spriteHeight + cardSliceData.offsetY) * Object.values(Suits).findIndex((s) => s === suit);

  const card: IPlayingCard = {
    id: id,
    suit,
    rank,
    isFaceCard,
    x,
    y,
    width: cardSliceData.spriteWidth,
    height: cardSliceData.spriteHeight,
    modifier: modifier,
  };
  return card;
}