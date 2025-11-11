import React from "react";
import { Shape } from "./Shape";
import { deckSize, setDeckSize, useAppStore } from "../GameState";
import { cardSliceData } from "../assets/sliceData";

import { getRandomInt } from "../logic/Random";

export enum Suits {
    Hearts = 'hearts',
    Spades = 'spades',
    Diamonds = 'diamonds',
    Clubs = 'clubs',
}

export enum Ranks {
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}

export const rankValues: Record<Ranks, number> = {
    [Ranks.Two]: 2,
    [Ranks.Three]: 3,
    [Ranks.Four]: 4,
    [Ranks.Five]: 5,
    [Ranks.Six]: 6,
    [Ranks.Seven]: 7,
    [Ranks.Eight]: 8,
    [Ranks.Nine]: 9,
    [Ranks.Ten]: 10,
    [Ranks.Jack]: 10,
    [Ranks.Queen]: 10,
    [Ranks.King]: 10,
    [Ranks.Ace]: 11,
};



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
    avaliable: boolean,
}

export function createCard(suit: Suits, rank: Ranks, modifier: Modifier): IPlayingCard {
    const isFaceCard = [Ranks.Jack, Ranks.Queen, Ranks.King].includes(rank);
    const id = deckSize + 1;
    const rankValues = Object.values(Ranks).filter(v => typeof v === 'number');
    const suitValues = Object.values(Suits);

    const x = (cardSliceData.spriteWidth + cardSliceData.offsetX) * rankValues.findIndex(r => r === rank);
    const y = (cardSliceData.spriteHeight + cardSliceData.offsetY) * suitValues.findIndex(s => s === suit);

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
        avaliable: true,
    };
    return card;
}

export function generateDeck(): Map<Suits, Map<Ranks, IPlayingCard>> {
    const deck = new Map<Suits, Map<Ranks, IPlayingCard>>();

    for (const suit of Object.values(Suits)) {
        if (!deck.has(suit)) {
            deck.set(suit, new Map<Ranks, IPlayingCard>());
        }
        const suitMap = deck.get(suit)!;

        for (const rank of Object.values(Ranks).filter(r => typeof r === 'number')) {//typesciprt returns both the number and the string so it must be filtered to just nums
            const card = createCard(suit, rank, Modifier.Lucky);
            suitMap.set(card.rank, card);
        }
    }
    return deck;
}

export function getRandomCard(cardsBySuits: Map<Suits, Map<Ranks, IPlayingCard>>): IPlayingCard | undefined {
    if (cardsBySuits.size === 0) return undefined;

    const availableCards: IPlayingCard[] = [];
    for (const suit of cardsBySuits.values()) {
        for (const card of suit.values()) {
            if (card.avaliable) availableCards.push(card);
        }
    }

    if (availableCards.length === 0) return undefined;

    return availableCards[getRandomInt(0, availableCards.length - 1)];
}

export function makeAllCardsAvaliable(cardsBySuits: Map<Suits, Map<Ranks, IPlayingCard>>): void {
    for (const [, suitMap] of cardsBySuits.entries()) {
        for (const [, card] of suitMap.entries()) {
            card.avaliable = true;
        }
    }
}

export function setCardAvaliablity(card: IPlayingCard, cardsBySuits: Map<Suits, Map<Ranks, IPlayingCard>> | undefined, avaliability: boolean): void {
    if (!cardsBySuits) return;
    const cardReference = cardsBySuits.get(card.suit)?.get(card.rank);
    if (!cardReference) return;
    cardReference.avaliable = avaliability;
}