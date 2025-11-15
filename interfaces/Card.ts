import { deckSize, setDeckSize, useAppStore } from "../GameState";
import { cardSliceData } from "../assets/sliceData";

import { getRandomInt } from "../logic/Random";
import { Deck } from "../assets/cards/deckArray";

export enum Suits {
    Hearts = 'hearts',
    Spades = 'spades',
    Diamonds = 'diamonds',
    Clubs = 'clubs',
}

export const SuitsArray = [
    Suits.Hearts,
    Suits.Spades,
    Suits.Diamonds,
    Suits.Clubs
] as const;

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

export const RanksArray: Ranks[] = [
    Ranks.Two,
    Ranks.Three,
    Ranks.Four,
    Ranks.Five,
    Ranks.Six,
    Ranks.Seven,
    Ranks.Eight,
    Ranks.Nine,
    Ranks.Ten,
    Ranks.Jack,
    Ranks.Queen,
    Ranks.King,
    Ranks.Ace,
] as const;

export enum Modifier {
    Normal,
    Bonus,
    Mult,
    Lucky,
    Glass
}

export const ModifierArray: Modifier[] = [
    Modifier.Normal,
    Modifier.Bonus,
    Modifier.Mult,
    Modifier.Lucky,
    Modifier.Glass,
];

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
    available: boolean,
}

export function createCard(suit: Suits, rank: Ranks, modifier: Modifier): IPlayingCard {
    const isFaceCard = [Ranks.Jack, Ranks.Queen, Ranks.King].includes(rank);
    const id = deckSize + 1;

    const x = (cardSliceData.spriteWidth + cardSliceData.offsetX) * RanksArray.findIndex(r => r === rank);
    const y = (cardSliceData.spriteHeight + cardSliceData.offsetY) * SuitsArray.findIndex(s => s === suit);

    setDeckSize(deckSize + 1);

    return {
        id,
        suit,
        rank,
        isFaceCard,
        x,
        y,
        width: cardSliceData.spriteWidth,
        height: cardSliceData.spriteHeight,
        modifier,
        available: true,
    };
}

export function generateDeck(): Map<Suits, Map<number, IPlayingCard>> {
    const deck = new Map<Suits, Map<number, IPlayingCard>>();

    for (const suit of SuitsArray) {
        if (!deck.has(suit)) {
            deck.set(suit, new Map<number, IPlayingCard>());
        }
        const suitMap = deck.get(suit)!;

        for (const rank of RanksArray) {
            const card = createCard(suit, rank, Modifier.Bonus);
            suitMap.set(card.id, card);
        }
    }

    return deck;
}

export function getRandomCard(cardsBySuits: Map<Suits, Map<number, IPlayingCard>>): IPlayingCard | undefined {
    if (cardsBySuits.size === 0) return undefined;

    const availableCards: IPlayingCard[] = [];
    for (const suitMap of cardsBySuits.values()) {
        for (const card of suitMap.values()) {
            if (card.available) availableCards.push(card);
        }
    }

    if (availableCards.length === 0) return undefined;

    return availableCards[getRandomInt(0, availableCards.length - 1)];
}

export function makeAllCardsAvailable(cardsBySuits: Map<Suits, Map<number, IPlayingCard>>): void {
    for (const suitMap of cardsBySuits.values()) {
        for (const card of suitMap.values()) {
            card.available = true;
        }
    }
}

export function setCardAvailability(
    card: IPlayingCard,
    cardsBySuits: Map<Suits, Map<number, IPlayingCard>> | undefined,
    availability: boolean
): void {
    if (!cardsBySuits) return;
    const cardRef = cardsBySuits.get(card.suit)?.get(card.id);
    if (!cardRef) return;
    cardRef.available = availability;
}

export function addCardToDeck(deck: Deck, card: IPlayingCard): Deck {
    const newCardsBySuits = new Map(deck.cardsBySuits);
    const suitMap = new Map(newCardsBySuits.get(card.suit));
    suitMap.set(card.id, card);
    newCardsBySuits.set(card.suit, suitMap);

    return {
        ...deck,
        cardsBySuits: newCardsBySuits,
    };
}

export function removeCardFromDeck(suit: Suits, id: number, deck: Deck): Deck {
    const oldMap = deck.cardsBySuits!;
    const newMap = new Map(oldMap);
    const suitMap = new Map(newMap.get(suit)!);

    suitMap.delete(id);
    newMap.set(suit, suitMap);
    deck.state!.total--;

    return { ...deck, cardsBySuits: newMap };
}
