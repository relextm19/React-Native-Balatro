import React from "react";
import { IRectangle, Shape } from "./Shape";
import { cardSprites } from "../assets/cardSpritesIndex";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { cards } from "../GameState";
import { CardSprite } from "../components/game/cardSprite";
import { RW, RH } from "../utils/ResponsiveDimensions";

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

export interface IPlayingCard extends IRectangle {
  suit: Suits;
  rank: Ranks;
  isFaceCard: boolean;
  sprite: React.ReactElement | null;
}


export function createCard(
  suit: Suits,
  rank: Ranks,
  x: SharedValue<number>,
  y: SharedValue<number>,
  width: number,
  height: number,
): IPlayingCard {
  const isFaceCard = [Ranks.Jack, Ranks.Queen, Ranks.King].includes(rank);
  const spriteSource = cardSprites[`${rank}_${suit}`]
  const card = {
    id: cards.length + 1,
    suit,
    rank,
    isFaceCard,
    x,
    y,
    width,
    height,
    type: Shape.Rectangle,
    sprite: CardSprite(spriteSource, x, y, width, height),
  };
  cards.push(card);
  return card;
}

export function generateDeck(): IPlayingCard[] {
  const deck: IPlayingCard[] = [];
  const suits = Object.values(Suits);
  const ranks = Object.values(Ranks);
  let [xt, yt] = [0, 0];
  for (const suit of suits) {
    for (const rank of ranks) {
      const x: SharedValue<number> = useSharedValue(xt);
      const y: SharedValue<number> = useSharedValue(yt);
      const card = createCard(suit, rank, x, y, RW(100 / 26), RH(100 / 9));
      deck.push(card);
      xt += RW(100 / 26);
    }
    yt += RH(100 / 26);
    xt = 0;
  }
  return deck;
} 