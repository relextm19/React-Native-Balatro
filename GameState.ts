import { create } from "zustand";
import { Stake, stakeArray } from "./assets/chips/StakeArray";
import { Deck, deckArray } from "./assets/cards/deckArray";
import { IPlayingCard, Suits } from "./interfaces/Card";
import { Blind, blindsArray } from "./assets/chips/Blinds";

export const defaultHandSize = 8;
export const defaultHandsToPlay = 4;
export const defaultHandsToDiscard = 3;
export const planetCardsDefault = 2;
export const cardsInShopDefault = 3;

export enum Views {
    Menu,
    DifficultySelect,
    AnteSelect,
    GameScreen,
    Shop,
    RoundSummary,
    DefeatScreen
}

export let deckSize = 0;
export function setDeckSize(value: number): void {
    deckSize = value;
}
export let winReward = 3;
export function setWinReward(value: number): void {
    winReward = value;
}

type AppState = {
    currentView: Views;
    lastView: Views;
    currentStake: Stake;
    currentDeck: Deck;
    currentAnteScore: number;
    currentRequiredScore: number;
    currentRoundScore: number;

    currentBlind: Blind;
    currentBossBlind: Blind | undefined;
    currentAnte: number;
    currentRound: number;

    money: number;
    hands: number;
    discards: number;
    handSize: number;
    handsToPlay: number;
    handsToDiscard: number;
    shopDiscount: number;

    planetCardsInShop: number;
    cardsInShop: number;
    boughtVouchers: number[];

    setCurrentRequiredScore: (update: number | ((prev: number) => number)) => void;
    setBoughtVouchers: (update: number[] | ((prev: number[]) => number[])) => void;
    setCurrentView: (view: Views) => void;
    setCurrentDeck: (deck: Deck) => void;
    setCurrentDeckCards: (cards: Map<Suits, Map<number, IPlayingCard>>) => void;
    setCurrentStake: (stake: Stake) => void;
    setCurrentBlind: (blind: Blind) => void;
    setCurrentBossBlind: (blind: Blind | undefined) => void;
    setCurrentAnteScore: (update: number | ((prev: number) => number)) => void;
    setCurrentAnte: (ante: number | ((prev: number) => number)) => void;
    setCurrentRound: (round: number) => void;
    setMoney: (update: number | ((prev: number) => number)) => void;
    setDiscards: (update: number | ((prev: number) => number)) => void;
    setHands: (update: number | ((prev: number) => number)) => void;
    setHandsToPlay: (update: number | ((prev: number) => number)) => void;
    setHandsToDiscard: (update: number | ((prev: number) => number)) => void;
    setShopDiscount: (discount: number) => void;
    setHandSize: (update: number | ((prev: number) => number)) => void;
    setCurrentRoundSore: (score: number) => void;

    setPlanetCardsInShop: (update: number | ((prev: number) => number)) => void;
    setCardsInShop: (update: number | ((prev: number) => number)) => void;
    resetGame: () => void;
};

export const useAppStore = create<AppState>((set) => ({
    currentView: Views.Menu,
    lastView: Views.Menu,
    currentStake: stakeArray[0],
    currentDeck: deckArray[0],
    currentBlind: blindsArray[0],
    currentBossBlind: undefined,
    currentAnteScore: 300,
    currentRequiredScore: 300,
    currentRoundScore: 0,
    currentAnte: 1,
    currentRound: 1,

    money: 5,
    hands: defaultHandsToPlay,
    handsToPlay: defaultHandsToPlay,
    discards: defaultHandsToDiscard,
    handsToDiscard: defaultHandsToDiscard,
    handSize: defaultHandSize,
    shopDiscount: 1,

    planetCardsInShop: planetCardsDefault,
    cardsInShop: cardsInShopDefault,
    boughtVouchers: [],

    setCurrentView: (view: Views) =>
        set((state) => ({
            lastView: state.currentView,
            currentView: view,
        })),

    setCurrentStake: (stake: Stake) => set({ currentStake: stake }),
    setCurrentDeck: (deck: Deck) => set({ currentDeck: deck }),
    setCurrentRequiredScore: (update) =>
        set((state) => ({
            currentRequiredScore: typeof update === "function" ? update(state.currentRequiredScore) : update,
        })),
    setCurrentDeckCards: (cardsBySuits) =>
        set((state) => ({
            currentDeck: {
                ...state.currentDeck,
                cardsBySuits,
            },
        })),

    setCurrentBlind: (blind: Blind) => set({ currentBlind: blind }),
    setCurrentBossBlind: (blind: Blind | undefined) => set({ currentBossBlind: blind }),
    setCurrentAnteScore: (update) =>
        set((state) => ({
            currentAnteScore: typeof update === "function" ? update(state.currentAnteScore) : update,
        })),
    setCurrentRoundSore(score) { set({ currentRoundScore: score }) },
    setCurrentAnte: (update: number | ((prev: number) => number)) =>
        set((state) => ({
            currentAnte:
                typeof update === "function" ? update(state.currentAnte) : update,
        })),

    setCurrentRound: (round: number) => set({ currentRound: round }),
    setHandSize: (update) =>
        set((state) => ({
            handSize: typeof update === "function" ? update(state.handSize) : update,
        })),

    setMoney: (update) =>
        set((state) => ({
            money: typeof update === "function" ? update(state.money) : update,
        })),

    setHands: (update) =>
        set((state) => ({
            hands: typeof update === "function" ? update(state.hands) : update,
        })),
    setHandsToPlay: (update) =>
        set((state) => ({
            handsToPlay: typeof update === "function" ? update(state.handsToPlay) : update,
        })),
    setHandsToDiscard: (update) =>
        set((state) => ({
            handsToDiscard: typeof update === "function" ? update(state.handsToDiscard) : update,
        })),

    setDiscards: (update) =>
        set((state) => ({
            discards: typeof update === "function" ? update(state.discards) : update,
        })),

    setShopDiscount: (discount: number) => set({ shopDiscount: discount }),

    setPlanetCardsInShop: (update: number | ((prev: number) => number)) =>
        set((state) => ({
            planetCardsInShop: typeof update === "function" ? update(state.planetCardsInShop) : update,
        })),

    setCardsInShop: (update: number | ((prev: number) => number)) =>
        set((state) => ({
            cardsInShop: typeof update === "function" ? update(state.cardsInShop) : update,
        })),

    setBoughtVouchers: (update) =>
        set((state) => ({
            boughtVouchers: typeof update === "function" ? update(state.boughtVouchers) : update,
        })),

    resetGame: () =>
        set(() => ({
            currentView: Views.Menu,
            lastView: Views.Menu,
            currentStake: stakeArray[0],
            currentDeck: deckArray[0],
            currentBlind: blindsArray[0],
            currentBossBlind: undefined,
            currentAnteScore: 300,
            currentRequiredScore: 300,
            currentAnte: 1,
            currentRound: 1,

            money: 5,
            hands: defaultHandsToPlay,
            handsToPlay: defaultHandsToPlay,
            discards: defaultHandsToDiscard,
            handsToDiscard: defaultHandsToDiscard,
            handSize: defaultHandSize,
            shopDiscount: 1,

            planetCardsInShop: planetCardsDefault,
            cardsInShop: cardsInShopDefault,
            boughtVouchers: [],
        })),

}));
