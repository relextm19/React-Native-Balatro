import React from "react";
import { Shape } from "./Shape";
import { deckSize, setDeckSize, useAppStore } from "../GameState";
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
    Normal,
    Bonus,
    Mult,
    Wild,
    Lucky,
    Glass
}

export interface IPlayingCard {
    id: number,
    suit: Suits,
    rank: Ranks,
    isFaceCard: boolean,
    modifier: Modifier,
    x: number,
    y: number,
    width: number,
    height: number,
}

export function createCard(suit: Suits, rank: Ranks, modifier: Modifier): IPlayingCard {
    const isFaceCard = [Ranks.Jack, Ranks.Queen, Ranks.King].includes(rank);
    const id = deckSize + 1;
    const x = (cardSliceData.spriteWidth + cardSliceData.offsetX) * Object.values(Ranks).findIndex((r) => r === rank);
    const y = (cardSliceData.spriteHeight + cardSliceData.offsetY) * Object.values(Suits).findIndex((s) => s === suit);

    const card: IPlayingCard = {
        id,
        suit,
        rank,
        isFaceCard,
        x,
        y,
        width: cardSliceData.spriteWidth,
        height: cardSliceData.spriteHeight,
        modifier,
    };
    return card;
}

export function generateDeck(): Map<number, IPlayingCard> | undefined {
    const deck = new Map<number, IPlayingCard>();
    for (let suit of Object.values(Suits)) {
        for (let rank of Object.values(Ranks)) {
            const card = createCard(suit, rank, Modifier.Lucky);
            if (!card) { return }
            deck.set(card.id, card);
            setDeckSize(deckSize + 1);
        }
    }
    return deck;
}