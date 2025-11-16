import { setWinReward, useAppStore, winReward } from "../GameState";

export function applyStakeEffects(stakeIndex: number) {
    const store = useAppStore.getState();
    switch (stakeIndex) {
        case 1:
            setWinReward(winReward - 1);
            break;
        case 2:
            store.setHandSize(prev => prev - 1);
            break;
    }
}