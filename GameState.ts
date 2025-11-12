import { create } from "zustand";
import { Stake } from "./assets/chips/StakeArray";
import { Deck } from "./assets/cards/deckArray";
import { IPlayingCard, Suits } from "./interfaces/Card";
import { Blind, blindsArray } from "./assets/chips/Blinds";

export const defaultHandSize = 8;

export enum Views {
    Menu,
    DifficultySelect,
    AnteSelect,
    DeckView,
    GameScreen,
    Store,
    RoundSummary
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
    setMoney: (money: number) => void;
    setHands: (hands: number) => void;
    setDiscards: (discards: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.DifficultySelect,
    lastView: Views.Menu,
    currentStake: {} as Stake,
    currentDeck: {} as Deck,
    currentBlind: blindsArray[0],
    currentAnteScore: 300,
    currentAnte: 1,
    currentRound: 1,

    money: 5,
    hands: 4,
    discards: 3,
    handSize: defaultHandSize,

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
    setMoney: (money: number) => set({ money }),
    setHands: (hands: number) => set({ hands }),
    setDiscards: (discards: number) => set({ discards }),
}));
