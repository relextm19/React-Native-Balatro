import { create } from "zustand";
import { Stake, stakeArray } from "./assets/chips/StakeArray";
import { Deck, deckArray } from "./assets/cards/deckArray";
import { IPlayingCard, Suits } from "./interfaces/Card";
import { Blind, blindsArray } from "./assets/chips/Blinds";

export const defaultHandSize = 8;
export const handsToPlay = 4;
export const handsToDiscard = 3;
export const JokersInShop = 2;
export const CardsInShop = 3;

export enum Views {
    Menu,
    DifficultySelect,
    AnteSelect,
    DeckView,
    GameScreen,
    Shop,
    RoundSummary,
    DefeatScreen
}

export let deckSize = 0;
export function setDeckSize(value: number): void {
    deckSize = value;
}

type AppState = {
    currentView: Views;
    lastView: Views;
    currentStake: Stake;
    currentDeck: Deck;
    currentAnteScore: number;
    currentBlind: Blind;
    currentAnte: number;
    currentRound: number;

    money: number;
    hands: number;
    discards: number;
    handSize: number;

    // Setters
    setCurrentView: (view: Views) => void;
    setCurrentDeck: (deck: Deck) => void;
    setCurrentDeckCards: (cards: Map<Suits, Map<number, IPlayingCard>>) => void;
    setCurrentStake: (stake: Stake) => void;
    setCurrentBlind: (blind: Blind) => void;
    setCurrentAnteScore: (score: number) => void;
    setCurrentAnte: (ante: number) => void;
    setCurrentRound: (round: number) => void;
    setMoney: (update: number | ((prev: number) => number)) => void;
    setDiscards: (update: number | ((prev: number) => number)) => void;
    setHands: (update: number | ((prev: number) => number)) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    lastView: Views.Menu,
    currentStake: stakeArray[0],
    currentDeck: deckArray[0],
    currentBlind: blindsArray[0],
    currentAnteScore: 300,
    currentAnte: 1,
    currentRound: 1,

    money: 5,
    hands: handsToPlay,
    discards: handsToDiscard,
    handSize: defaultHandSize,
    remainingHands: 0,

    setCurrentView: (view: Views) => set((state) => ({
        lastView: state.currentView,
        currentView: view,
    })),
    setCurrentStake: (stake: Stake) => set({ currentStake: stake }),
    setCurrentDeck: (deck: Deck) => set({ currentDeck: deck }),
    setCurrentDeckCards: (cardsBySuits) =>
        set((state) => ({
            currentDeck: {
                ...state.currentDeck,
                cardsBySuits,
            },
        })),
    setCurrentBlind: (blind: Blind) => set({ currentBlind: blind }),
    setCurrentAnteScore: (score: number) => set({ currentAnteScore: score }),
    setCurrentAnte: (ante: number) => set({ currentAnte: ante }),
    setCurrentRound: (round: number) => set({ currentRound: round }),
    setMoney: (update: number | ((prev: number) => number)) =>
        set((state) => ({
            money: typeof update === "function" ? update(state.money) : update,
        })),
    setHands: (update: number | ((prev: number) => number)) =>
        set((state) => ({
            hands: typeof update === "function" ? update(state.hands) : update,
        })),
    setDiscards: (update: number | ((prev: number) => number)) =>
        set((state) => ({
            discards: typeof update === "function" ? update(state.discards) : update,
        })),
}));

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
