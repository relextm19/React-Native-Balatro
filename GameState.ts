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
    selectedStake: Stake;
    selectedDeck: Deck;
    setCurrentView: (view: Views) => void;
    setCurrentDeck: (deck: Deck) => void;
    setCurrentStake: (stake: Stake) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    selectedStake: {} as Stake,
    selectedDeck: {} as Deck,
    setCurrentView: (view) => set({ currentView: view }),
    setCurrentStake: (stake) => set({ selectedStake: stake }),
    setCurrentDeck: (deck) => set({ selectedDeck: deck }),
}));
