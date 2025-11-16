import React, { ReactElement, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Skia, Canvas, Atlas, SkImage, SkRect, SkHostRect } from "@shopify/react-native-skia";
import { blindsArray, BlindState } from "../../assets/chips/Blinds";
import { useAppStore, Views } from "../../GameState";
import { playSound } from "../../logic/Sounds";
import { applyBlindEffects } from "../../logic/ApplyBlindEffects";
import type { Mutable } from "react-native-reanimated/lib/typescript/commonTypes";
import { blindSliceData, stakeSliceData } from "../../assets/sliceData";

type AnteSelectPaneProps = {
    stakeSpriteSheet: SkImage;
    blindSpriteSheet: SkImage;
    stakeRects: Mutable<SkHostRect[]>,
    blindRects: Mutable<SkHostRect[]>,
    requiredScore: number,
    title: String,
    rewardAmount: number,
    blindState: BlindState
    isBossBlind: boolean,
    blindIndex: number,
    description: string | undefined,
};

export default function AnteSelectPane({
    stakeSpriteSheet,
    blindSpriteSheet,
    stakeRects,
    blindRects,
    requiredScore,
    title,
    rewardAmount,
    blindState,
    isBossBlind,
    blindIndex,
    description
}: AnteSelectPaneProps): ReactElement {
    const stakeTransforms = [Skia.RSXform(1, 0, 0, 0)];
    const blindImgScale = 1.5;
    const stakeImgScale = 1;
    const blindTransforms = [Skia.RSXform(blindImgScale, 0, 0, 0)];
    const soundAsset = require("../../assets/sounds/ante_select.mp3")

    const store = useAppStore();
    function setGameView(): void {
        if (blindState !== BlindState.selected) return
        if (isBossBlind) {
            applyBlindEffects(blindIndex);
        }
        store.setCurrentBlind(blindsArray[blindIndex]);
        store.setCurrentRequiredScore(requiredScore)
        store.setCurrentView(Views.GameScreen)
    }

    return (
        //TODO: Make the blindState text background the most common color from the image
        <Pressable
            className={`bg-darkBg w-1/4 h-full border-5 border-[#362602] rounded-main border-b-0 rounded-be-none rounded-bl-none p-2 ${blindState != BlindState.selected ? "opacity-50" : ""}`}
            onPress={() => {
                setGameView();
                playSound(soundAsset);
            }}
        >
            <View className="items-center gap-2 bg-main p-2 border-2 border-lightBorder rounded-main">
                <View className="justify-center items-center bg-[#f48b04] shadow-lg rounded-main w-4/5 h-6">
                    <Text className="text-white">{blindState}</Text>
                </View>
                <View className="justify-center items-center bg-[#362602] border-[#423004] border-2 rounded-main w-full">
                    <Text className="text-white">{title}</Text>
                </View>

                <View>
                    <Canvas
                        style={{
                            width: blindSliceData.spriteWidth * blindImgScale,
                            height: blindSliceData.spriteHeight * blindImgScale,
                        }}
                    >
                        {stakeSpriteSheet && (
                            <Atlas
                                image={blindSpriteSheet}
                                sprites={[blindRects.value[blindIndex]]}
                                transforms={blindTransforms}
                            />
                        )}
                    </Canvas>
                </View>

                <View className="bg-[#19201fff] p-2 rounded-main">
                    <Text className="text-white text-center">Score at least</Text>
                    <View className="flex-row-reverse justify-center items-center gap-1">
                        <Text className="text-customRed text-2xl">{requiredScore}</Text>
                        <View>
                            <Canvas
                                style={{
                                    width: stakeSliceData.spriteWidth * stakeImgScale,
                                    height: stakeSliceData.spriteHeight * stakeImgScale,
                                }}
                            >
                                {stakeSpriteSheet && (
                                    <Atlas
                                        image={stakeSpriteSheet}
                                        sprites={[stakeRects.value[store.currentStake.index]]}
                                        transforms={stakeTransforms}
                                    />
                                )}
                            </Canvas>
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                        <Text className="text-white text-center">Reward: </Text>
                        <Text className="text-accentGold">
                            {rewardAmount > 0 ? "$".repeat(rewardAmount) + "+" : "NONE"}
                        </Text>
                    </View>
                    {description && (
                        <View className="bg-[#19201fff] mt-2 p-2 border-2 border-lightBorder rounded-main">
                            <Text className="text-white text-sm text-center">{description}</Text>
                        </View>
                    )}

                </View>
            </View>
        </Pressable>
    );
}
