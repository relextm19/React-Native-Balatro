import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Skia, useImage, Canvas, Atlas } from "@shopify/react-native-skia";

import AnteSelectPane from "./AnteSelectPane";
import { useSpriteRects } from "../../utils/SpriteSheet";

import { stakeSliceData, blindSliceData, deckSliceData } from "../../assets/sliceData";
import { useAppStore } from "../../GameState";
import { getRandomInt } from "../../utils/Random";
import { blindsArray } from "../../assets/chips/Blinds";

export default function AnteSelectScreen(): ReactElement | null {
    const state = useAppStore.getState();

    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));

    const stakeSpriteRects = useSpriteRects(stakeSliceData).value ?? [];
    const blindSpriteRects = useSpriteRects(blindSliceData).value ?? [];
    const deckSpriteRect = useSpriteRects(deckSliceData).value[state.currentDeck.index] ?? null;

    if (!stakeSpriteSheet || !blindsSpriteSheet) return null;

    const bossBlindIndex = getRandomInt(2, blindsArray.length - 5);// the first two blinds are normal and the last 5 are special and will be implemented later

    const rewardAmount = [3, 4, 5]
    let panes: ReactElement[] = [];
    for (let i = 0; i < 3; i++) {
        const blindIndex = i < 2 ? i : bossBlindIndex;
        panes.push(
            <AnteSelectPane
                stakeSpriteSheet={stakeSpriteSheet}
                stakeSourceRect={stakeSpriteRects[state.currentStake.index]}
                blindSpriteSheet={blindsSpriteSheet}
                blindSourceRect={blindSpriteRects[blindIndex]}
                requiredScore={state.currentAnteScore * (i + 1)}
                title={blindsArray[blindIndex].name}
                rewardAmount={rewardAmount[i]}
                key={i}
            />
        )
    }

    return (
        <View className="flex-1 items-center justify-end">
            <View className="flex-row justify-center items-center gap-x-[5%] h-4/6">
                {panes}
            </View>
            <View className="absolute right-2 bottom-2">
                <Canvas style={
                    { width: deckSpriteRect.width * 1.5, height: deckSpriteRect.height * 1.5 }
                }>
                    <Atlas
                        sprites={[deckSpriteRect]}
                        image={decksSpriteSheet}
                        transforms={[Skia.RSXform(1.5, 0, 0, 0)]}
                    >
                    </Atlas>
                </Canvas>
                <Text className="text-white text-center">
                    {state.currentDeck.state?.avaliable}/{state.currentDeck.state?.total}
                </Text>
            </View>
        </View>
    );
}
