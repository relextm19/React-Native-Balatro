import { create } from "zustand";
import { Stake } from "./assets/chips/StakeArray";
import { Deck } from "./assets/cards/deckArray";

export enum Views {
    Menu,
    DifficultySelect,
    AnteSelect,
}

type AppState = {
    currentView: Views;
    currentStake: Stake;
    currentDeck: Deck;
    currentAnteScore: number;
    setCurrentView: (view: Views) => void;
    setCurrentDeck: (deck: Deck) => void;
    setCurrentStake: (stake: Stake) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    currentStake: {} as Stake,
    currentDeck: {} as Deck,
    currentAnteScore: 300,
    setCurrentView: (view) => set({ currentView: view }),
    setCurrentStake: (stake) => set({ currentStake: stake }),
    setCurrentDeck: (deck) => set({ currentDeck: deck }),
}));
