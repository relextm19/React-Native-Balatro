import { setWinReward, useAppStore, winReward } from "../GameState";

let preChangeDiscards;
let preChangeWinReward;

export function applyBlindEffects(blindIndex: number) {
    const store = useAppStore.getState();
    switch (blindIndex) {
        case 2:
            preChangeDiscards = store.handsToDiscard;
            store.setDiscards(0);
            break;
        case 3:
            preChangeWinReward = winReward;
            setWinReward(0);
            break;
    }
}

export function revertBlindEffects(blindIndex: number) {
    const store = useAppStore.getState();
    switch (blindIndex) {
        case 2:
            store.setDiscards(preChangeDiscards!);
            break;
        case 3:
            setWinReward(preChangeWinReward!);
            break;
    }
}