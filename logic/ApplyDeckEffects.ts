import { useAppStore } from "../GameState";

export function applyDeckEffects(deckIndex: number) {
    const store = useAppStore.getState();
    switch (deckIndex) {
        case 0:
            store.setDiscards(prev => prev + 1);
            break;
        case 1:
            store.setHands(prev => prev + 1);
            break;
        case 2:
            store.setMoney(prev => prev + 10);
            break;
    }
}