import React, { ReactElement } from "react";
import { View, Text, Pressable } from "react-native";
import { Skia, Canvas, Atlas, SkImage, SkRect } from "@shopify/react-native-skia";
import { BlindState } from "../../assets/chips/Blinds";
import { useAppStore, Views } from "../../GameState";
import { playSound } from "../../logic/Sounds";

type AnteSelectPaneProps = {
    stakeSpriteSheet: SkImage;
    blindSpriteSheet: SkImage;
    stakeSourceRect: SkRect;
    blindSourceRect: SkRect;
    requiredScore: number,
    title: String,
    rewardAmount: number,
    blindState: BlindState
};

export default function AnteSelectPane({ stakeSpriteSheet, blindSpriteSheet, stakeSourceRect, blindSourceRect, requiredScore, title, rewardAmount, blindState, }: AnteSelectPaneProps): ReactElement {
    const stakeTransforms = [Skia.RSXform(1, 0, 0, 0)];
    const blindImgScale = 1.5;
    const blindTransforms = [Skia.RSXform(blindImgScale, 0, 0, 0)];
    const soundAsset = require("../../assets/sounds/ante_select.mp3")

    const store = useAppStore();
    function setGameView(): void {
        if (blindState !== BlindState.selected) return
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
                            width: blindSourceRect.width * blindImgScale,
                            height: blindSourceRect.width * blindImgScale,
                        }}
                    >
                        {stakeSpriteSheet && (
                            <Atlas
                                image={blindSpriteSheet}
                                sprites={[blindSourceRect]}
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
                                    width: stakeSourceRect.width,
                                    height: stakeSourceRect.width,
                                }}
                            >
                                {stakeSpriteSheet && (
                                    <Atlas
                                        image={stakeSpriteSheet}
                                        sprites={[stakeSourceRect]}
                                        transforms={stakeTransforms}
                                    />
                                )}
                            </Canvas>
                        </View>
                    </View>
                    <View className="flex-row justify-center items-center">
                        <Text className="text-white text-center">Reward: </Text>
                        <Text className="text-accentGold">{"$".repeat(rewardAmount)}+</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
