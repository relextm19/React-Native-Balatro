import { setWinReward, useAppStore } from "../GameState";

export function applyBlindEffects(blindIndex: number) {
    const store = useAppStore.getState();
    switch (blindIndex) {
        case 2:
            store.setDiscards(0);
            break;
        case 3:
            setWinReward(0);
            break;
        case 4:
    }
}