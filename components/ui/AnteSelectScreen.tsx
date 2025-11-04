import React, { ReactElement } from "react";
import { View } from "react-native";
import { SkImage, SkRect, useImage } from "@shopify/react-native-skia";

import AnteSelectPane from "./AnteSelectPane";
import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

import { stakeSliceData, blindSliceData } from "../../assets/sliceData";
import { useAppStore } from "../../GameState";
import { getRandomInt } from "../../utils/Random";
import { blindsArray } from "../../assets/chips/Blinds";

export default function AnteSelectScreen(): ReactElement | null {
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));

    const stakeSpriteRects = useSpriteRects(stakeSliceData).value ?? [];
    const blindSpriteRects = useSpriteRects(blindSliceData).value ?? [];

    if (!stakeSpriteSheet || !blindsSpriteSheet) return null;

    const store = useAppStore.getState();

    const bossBlindIndex = getRandomInt(2, blindsArray.length);// the first two blinds are normal

    const rewardAmount = [3, 4, 5]
    let panes: ReactElement[] = [];
    for (let i = 0; i < 3; i++) {
        const blindIndex = i < 2 ? i : bossBlindIndex;
        panes.push(
            <AnteSelectPane
                stakeSpriteSheet={stakeSpriteSheet}
                stakeSourceRect={stakeSpriteRects[store.currentStake.index]}
                blindSpriteSheet={blindsSpriteSheet}
                blindSourceRect={blindSpriteRects[blindIndex]}
                requiredScore={store.currentAnteScore * (i + 1)}
                title={blindsArray[blindIndex].name}
                rewardAmount={rewardAmount[i]}
                key={i}
            />
        )
    }

    return (
        <View className="flex-1 justify-end items-center">
            <View className="flex-row justify-center items-end gap-x-[5%] h-4/6">
                {panes}
            </View>
        </View>
    );
}
