import { create } from "zustand";

export enum Views {
    Menu,
    DifficultySelect,
    AnteSelect,
}

type AppState = {
    currentView: Views;
    selectedStake: string;
    setCurrentView: (view: Views) => void;
    setSelectedStake: (stake: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    selectedStake: "",
    setCurrentView: (view) => set({ currentView: view }),
    setSelectedStake: (stake) => set({ selectedStake: stake }),
}));
