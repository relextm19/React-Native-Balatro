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
    setDeckSize(deckSize + 1);

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

export function generateDeck(): Map<Suits, Map<number, IPlayingCard>> {
    const deck = new Map<Suits, Map<number, IPlayingCard>>();

    for (const suit of Object.values(Suits)) {
        if (!deck.has(suit)) {
            deck.set(suit, new Map<number, IPlayingCard>());
        }

        const suitMap = deck.get(suit)!;

        for (const rank of Object.values(Ranks)) {
            const card = createCard(suit, rank, Modifier.Lucky);
            if (!card) {
                console.log("no, card skipping");
                continue;
            };
            suitMap.set(card.id, card);
        }
    }
    //testing purpose
    for (let i = 0; i < 6; i++) {
        const card = createCard(Suits.Clubs, Ranks.Ace, Modifier.Glass);
        deck.get(Suits.Clubs)?.set(card.id, card)
    }
    return deck;
}
