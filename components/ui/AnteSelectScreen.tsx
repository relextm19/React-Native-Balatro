import React, { ReactElement } from "react";
import { View, Text, Pressable } from "react-native";
import { Skia, useImage, Canvas, Atlas } from "@shopify/react-native-skia";

import AnteSelectPane from "./AnteSelectPane";
import { useSpriteRects } from "../../logic/SpriteSheet";

import { stakeSliceData, blindSliceData, deckSliceData } from "../../assets/sliceData";
import { useAppStore, winReward } from "../../GameState";
import { getRandomInt } from "../../logic/Random";
import { blindsArray, BlindState } from "../../assets/chips/Blinds";
import StatusPane from "./StatusPane";
import DeckIcon from "./DeckIcon";


export default function AnteSelectScreen(): ReactElement | null {
    const store = useAppStore.getState();

    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));

    const stakeRects = useSpriteRects(stakeSliceData);
    const blindRects = useSpriteRects(blindSliceData);

    if (!stakeSpriteSheet || !blindsSpriteSheet) return null;

    let bossBlindIndex: number;
    if (!store.currentBossBlind) {
        bossBlindIndex = getRandomInt(3, blindRects.value.length - 1);// the first 2 blinds are normal 
        store.setCurrentBossBlind(blindsArray[bossBlindIndex]);
    } else {
        bossBlindIndex = store.currentBossBlind.index;
    }

    let panes: ReactElement[] = [];
    for (let i = 0; i < 3; i++) {
        const blindIndex = i < 2 ? i : bossBlindIndex;
        const blindState = i < (store.currentRound - 1) % 3 ? BlindState.defeated : i === (store.currentRound - 1) % 3 ? BlindState.selected : BlindState.upcoming;
        //not the best way but no time so
        const requiredScore = blindIndex === 4 ? store.currentAnteScore * (i + 1) * 3 : store.currentAnteScore * (i + 1);
        const anteWinReward = blindIndex === 3 ? 0 : winReward;
        panes.push(
            <AnteSelectPane
                stakeSpriteSheet={stakeSpriteSheet}
                stakeRects={stakeRects}
                blindRects={blindRects}
                blindSpriteSheet={blindsSpriteSheet}
                requiredScore={requiredScore}
                title={blindsArray[blindIndex].name}
                rewardAmount={anteWinReward}
                blindState={blindState}
                isBossBlind={i === 2}
                blindIndex={blindIndex}
                description={i === 2 ? blindsArray[blindIndex].desc : undefined}
                key={i}
            />
        )
    }

    return (
        <View className="flex-row flex-1 justify-center">
            <StatusPane />
            <View className="relative flex-1 justify-end items-center">
                <View className="flex-row justify-center items-center gap-x-[5%] h-[75%]">
                    {panes}
                </View>
            </View>
            {/* <View className="justify-end items-end min-w-24 min-h-24">
                <DeckIcon />
            </View> */}
        </View>
    );
}
