import { create } from "zustand";
import { Stake } from "./assets/chips/StakeArray";
import { Deck } from "./assets/cards/deckArray";
import { IPlayingCard } from "./interfaces/Card";

export enum Views {
    Menu,
    DifficultySelect,
    AnteSelect,
    DeckView,
}

export let deckSize = 0;
export function setDeckSize(value: number): void {
    deckSize = value;
}

type AppState = {
    currentView: Views;
    currentStake: Stake;
    currentDeck: Deck;
    currentAnteScore: number;
    currentBlind: number;
    currentAnte: number;
    currentRound: number;
    money: number;
    hands: number;
    discards: number;
    roundScore: number;

    // Setters
    setCurrentView: (view: Views) => void;
    setCurrentDeck: (deck: Deck) => void;
    setCurrentDeckCards: (cards: Map<number, IPlayingCard>) => void;
    setCurrentStake: (stake: Stake) => void;
    setCurrentBlind: (blind: number) => void;
    setCurrentAnteScore: (score: number) => void;
    setCurrentAnte: (ante: number) => void;
    setCurrentRound: (round: number) => void;
    setMoney: (money: number) => void;
    setHands: (hands: number) => void;
    setDiscards: (discards: number) => void;
    setRoundScore: (score: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    currentStake: {} as Stake,
    currentDeck: {} as Deck,
    currentBlind: 0,
    currentAnteScore: 300,
    currentAnte: 1,
    currentRound: 1,
    money: 5,
    hands: 4,
    discards: 3,
    roundScore: 0,

    setCurrentView: (view: Views) => set({ currentView: view }),
    setCurrentStake: (stake: Stake) => set({ currentStake: stake }),
    setCurrentDeck: (deck: Deck) => set({ currentDeck: deck }),
    setCurrentDeckCards: (cards) =>
        set((state) => ({
            currentDeck: {
                ...state.currentDeck,
                cards,
            },
        })),
    setCurrentBlind: (blind: number) => set({ currentBlind: blind }),
    setCurrentAnteScore: (score: number) => set({ currentAnteScore: score }),
    setCurrentAnte: (ante: number) => set({ currentAnte: ante }),
    setCurrentRound: (round: number) => set({ currentRound: round }),
    setMoney: (money: number) => set({ money }),
    setHands: (hands: number) => set({ hands }),
    setDiscards: (discards: number) => set({ discards }),
    setRoundScore: (score: number) => set({ roundScore: score }),
}));
