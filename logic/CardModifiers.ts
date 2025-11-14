import { useAppStore } from "../GameState";
import { Modifier, removeCardFromDeck, Suits } from "../interfaces/Card";
import { getRandomInt } from "./Random";

export function getBonusForCard(modifier: Modifier, currentMult: number, cardID: number, suit: Suits): [number, number] {
    switch (modifier) {
        case Modifier.Normal:
            return [0, 0]
        case Modifier.Bonus:
            return [50, 0]
        case Modifier.Mult:
            return [0, 4];
        case Modifier.Glass:
            return getBonusForGlass(currentMult, cardID, suit);
        case Modifier.Lucky:
            return getBonusForLucky();
    }
}

function getBonusForGlass(mult: number, cardID: number, suit: Suits): [number, number] {
    const chance = getRandomInt(0, 3);

    if (chance === 3) {
        const store = useAppStore.getState();
        store.setCurrentDeck(removeCardFromDeck(suit, cardID, store.currentDeck));
    }

    return [0, mult * 2];
}

function getBonusForLucky(): [number, number] {
    const multChance = getRandomInt(0, 4);
    const moneyChance = getRandomInt(0, 14);

    const multBonus = multChance === 4 ? 20 : 0;
    const moneyBonus = moneyChance === 14 ? 20 : 0;

    if (moneyBonus !== 0) useAppStore.getState().setMoney((prev) => prev + moneyBonus);

    return [0, multBonus];
}