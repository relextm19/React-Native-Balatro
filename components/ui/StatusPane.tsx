import React, { ReactElement, RefObject } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Skia, useImage, Canvas, Atlas } from "@shopify/react-native-skia";

import { useSpriteRects } from "../../logic/SpriteSheet";

import { stakeSliceData } from "../../assets/sliceData";
import { useAppStore } from "../../GameState";

type statusPaneProps = {
    headerText?: string,
    toScore?: number,
    setWidth?: React.Dispatch<React.SetStateAction<number>>
    handName?: string,
    chips?: RefObject<number>,
    mult?: RefObject<number>,
    roundScore?: RefObject<number>,
}

export default function StatusPane({ headerText, toScore, setWidth, handName, chips, mult, roundScore }: statusPaneProps): ReactElement {
    const store = useAppStore();
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const stakeSpriteRect = useSpriteRects(stakeSliceData).value[store.currentStake.index] ?? null;
    return (
        <View
            className="justify-between bg-darkGrey p-2 w-1/5 h-full"
            onLayout={(event: LayoutChangeEvent) => {
                if (setWidth) {
                    const { width } = event.nativeEvent.layout;
                    setWidth(width);
                }
            }}
        >
            <View className="items-center bg-darkBg rounded-lg w-full">
                {headerText ? (
                    <>
                        <Text className="w-full font-semibold text-white text-lg text-center text-wrap">
                            {headerText}
                        </Text>
                        {toScore && (
                            <View className="flex-row flex-wrap">
                                <Text className="w-full text-white text-xl text-center">
                                    Score at least
                                </Text>
                                <View className="flex-row justify-center items-center w-full">
                                    <Canvas
                                        style={{
                                            width: stakeSpriteRect.width,
                                            height: stakeSpriteRect.width,
                                        }}
                                    >
                                        {stakeSpriteSheet && (
                                            <Atlas
                                                image={stakeSpriteSheet}
                                                sprites={[stakeSpriteRect]}
                                                transforms={[Skia.RSXform(1, 0, 0, 0)]}
                                            />
                                        )}
                                    </Canvas>
                                    <Text className="text-customRed text-2xl">{store.currentRequiredScore}</Text>
                                </View>
                            </View>
                        )}
                    </>
                ) : (
                    <View className="w-full h-20" />
                )}
            </View>

            <View className="flex-row justify-between items-center bg-darkBg p-2 rounded-lg w-full">
                <Text className="w-2/5 text-gray-300 text-wrap">Round score</Text>
                <View className="flex-row-reverse flex-1 justify-center items-center bg-darkGrey rounded-lg">
                    <Text className="text-white text-3xl">{roundScore?.current ?? 0}</Text>
                    <Canvas
                        style={{
                            width: stakeSpriteRect.width,
                            height: stakeSpriteRect.width,
                        }}
                    >
                        {stakeSpriteSheet && (
                            <Atlas
                                image={stakeSpriteSheet}
                                sprites={[stakeSpriteRect]}
                                transforms={[Skia.RSXform(1, 0, 0, 0)]}
                            />
                        )}
                    </Canvas>
                </View>
            </View>

            <View className="justify-end items-center bg-darkBg p-2 rounded-lg w-full h-1/5">
                <View className="flex-1 justify-center items-center">
                    <Text
                        className="text-white text-2xl text-wrap"
                        minimumFontScale={0.5}
                        adjustsFontSizeToFit
                        numberOfLines={1}
                    >
                        {handName}
                    </Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <View className="flex-1 justify-center items-end bg-customRed rounded-md">
                        <Text className="font-bold text-white text-xl">{chips?.current ?? 0}</Text>
                    </View>
                    <Text className="font-bold text-white text-xl">x</Text>
                    <View className="flex-1 justify-center items-start bg-blue-700 rounded-md">
                        <Text className="font-bold text-white text-xl">{mult?.current ?? 0}</Text>
                    </View>
                </View>
            </View>

            <View className="flex-row justify-between w-full">
                <View className="items-center bg-darkBg p-2 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Hands</Text>
                    <View className="justify-center items-center bg-darkGrey p-1 rounded-lg w-full">
                        <Text className="font-bold text-blue-700 text-lg">{store.hands}</Text>
                    </View>
                </View>
                <View className="items-center bg-darkBg p-2 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Discards</Text>
                    <View className="justify-center items-center bg-darkGrey p-1 rounded-lg w-full">
                        <Text className="font-bold text-customRed text-lg">{store.discards}</Text>
                    </View>
                </View>
            </View>

            <View className="bg-darkBg p-2 rounded-lg w-full">
                <View className="justify-center items-center bg-darkGrey rounded-lg">
                    <Text className="font-bold text-accentGold text-xl">${store.money}</Text>
                </View>
            </View>

            <View className="flex-row justify-between w-full">
                <View className="items-center bg-darkBg p-1 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Ante</Text>
                    <View className="flex-row justify-center items-center bg-darkGrey p-1 rounded-lg w-full">
                        <Text className="font-bold text-accentGold text-lg">{store.currentAnte}</Text>
                        <Text className="font-bold text-white text-lg">/8</Text>
                    </View>
                </View>
                <View className="items-center bg-darkBg p-1 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Round</Text>
                    <View className="justify-center items-center bg-darkGrey p-1 rounded-lg w-full">
                        <Text className="font-bold text-accentGold text-lg">{store.currentRound}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}