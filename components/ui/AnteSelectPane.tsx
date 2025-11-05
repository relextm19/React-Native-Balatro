import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Skia, Canvas, Atlas, SkImage, SkRect } from "@shopify/react-native-skia";
import { BlindState } from "../../assets/chips/Blinds";

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

export default function AnteSelectPane({
    stakeSpriteSheet,
    blindSpriteSheet,
    stakeSourceRect,
    blindSourceRect,
    requiredScore,
    title,
    rewardAmount,
    blindState,
}: AnteSelectPaneProps): ReactElement {
    const stakeTransforms = [Skia.RSXform(1, 0, 0, 0)];
    const blindImgScale = 1.5;
    const blindTransforms = [Skia.RSXform(blindImgScale, 0, 0, 0)];
    return (
        //TODO: Make the blindState text background the most common color from the image
        <View className={`bg-darkBg w-1/5 h-full border-5 border-[#362602] rounded-main border-b-0 rounded-be-none rounded-bl-none p-2 ${blindState != BlindState.selected ? "opacity-50" : ""}`}>
            <View className="bg-[#23353aff] border-2 border-lightBorder rounded-main p-2 gap-2 items-center">
                <View className="bg-[#f48b04] rounded-main h-6 shadow-lg w-4/5 items-center justify-center">
                    <Text className="text-white">{blindState}</Text>
                </View>
                <View className="bg-[#362602] rounded-main border-[#423004] border-2 w-full items-center justify-center">
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

                <View className="bg-[#19201fff] rounded-main p-2">
                    <Text className="text-white text-center">Score at least</Text>
                    <View className="justify-center items-center flex-row-reverse gap-1">
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
                    <View className="flex-row items-center justify-center">
                        <Text className="text-white text-center">Reward: </Text>
                        <Text className="text-accentGold">{"$".repeat(rewardAmount)}+</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
