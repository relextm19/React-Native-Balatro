import { useAppStore } from "../GameState";

export function applyVoucherEffects(voucherIndex: number) {
    const store = useAppStore.getState();
    switch (voucherIndex) {
        case 0:
            store.setShopDiscount(0.75);
            break;
        case 1:
            store.setHandsToDiscard(prev => prev + 1)
            //so the status pane updates
            store.setDiscards(prev => prev + 1);
            break;
        case 2:
            store.setHandsToPlay(prev => prev + 1);
            //so the status pane updates
            store.setHands(prev => prev + 1)
            break;
        case 3:
            store.setCardsInShop(prev => prev + 1);
            store.setPlanetCardsInShop(prev => prev + 1);
            break;
    }
}