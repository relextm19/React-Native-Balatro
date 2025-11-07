import React, { ReactElement } from "react";
import { View, Text, Pressable } from "react-native";
import { Skia, useImage, Canvas, Atlas } from "@shopify/react-native-skia";

import AnteSelectPane from "./AnteSelectPane";
import { useSpriteRects } from "../../utils/SpriteSheet";

import { stakeSliceData, blindSliceData, deckSliceData } from "../../assets/sliceData";
import { useAppStore } from "../../GameState";
import { getRandomInt } from "../../utils/Random";
import { blindsArray, BlindState } from "../../assets/chips/Blinds";
import StatusPane from "./StatusPane";
import DeckIcon from "./DeckIcon";


export default function AnteSelectScreen(): ReactElement | null {
    const store = useAppStore.getState();

    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));

    const stakeSpriteRects = useSpriteRects(stakeSliceData).value ?? [];
    const blindSpriteRects = useSpriteRects(blindSliceData).value ?? [];

    if (!stakeSpriteSheet || !blindsSpriteSheet) return null;

    const bossBlindIndex = getRandomInt(2, blindsArray.length - 5);// the first two blinds are normal and the last 5 are special and will be implemented later

    const rewardAmount = [3, 4, 5]
    let panes: ReactElement[] = [];
    for (let i = 0; i < 3; i++) {
        const blindIndex = i < 2 ? i : bossBlindIndex;
        const blindState = i < store.currentBlind ? BlindState.defeated : store.currentBlind % 3 == i ? BlindState.selected : BlindState.upcoming; //Hows he done that then
        panes.push(
            <AnteSelectPane
                stakeSpriteSheet={stakeSpriteSheet}
                stakeSourceRect={stakeSpriteRects[store.currentStake.index]}
                blindSpriteSheet={blindsSpriteSheet}
                blindSourceRect={blindSpriteRects[blindIndex]}
                requiredScore={store.currentAnteScore * (i + 1)}
                title={blindsArray[blindIndex].name}
                rewardAmount={rewardAmount[i]}
                blindState={blindState}
                key={i}
            />
        )
    }

    return (
        <View className="flex-1 flex-row justify-center">
            <StatusPane />
            <View className="flex-1 items-center justify-end relative">
                <View className="flex-row justify-center items-center gap-x-[5%] h-4/6">
                    {panes}
                </View>
            </View>
            <DeckIcon />
        </View>
    );
}
