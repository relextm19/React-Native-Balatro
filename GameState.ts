import { create } from "zustand";
import { Stake } from "./assets/chips/StakeArray";
import { Deck } from "./assets/cards/deckArray";
import { BlindState } from "./assets/chips/Blinds";

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
    currentBlind: number;
    setCurrentView: (view: Views) => void;
    setCurrentDeck: (deck: Deck) => void;
    setCurrentStake: (stake: Stake) => void;
    setCurrentBlind: (blind: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    currentStake: {} as Stake,
    currentDeck: {} as Deck,
    currentBlind: 0,
    currentAnteScore: 300,
    setCurrentView: (view: Views) => set({ currentView: view }),
    setCurrentStake: (stake: Stake) => set({ currentStake: stake }),
    setCurrentDeck: (deck: Deck) => set({ currentDeck: deck }),
    setCurrentBlind: (blind: number) => set({ currentBlind: blind }),
}));
