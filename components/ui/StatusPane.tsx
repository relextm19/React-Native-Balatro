import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Skia, useImage, Canvas, Atlas } from "@shopify/react-native-skia";

import { useSpriteRects } from "../../utils/SpriteSheet";

import { stakeSliceData } from "../../assets/sliceData";
import { useAppStore } from "../../GameState";

export default function StatusPane(): ReactElement {
    const store = useAppStore();
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const stakeSpriteRect = useSpriteRects(stakeSliceData).value[store.currentStake.index] ?? null;
    return (
        <View className="h-full w-1/5 bg-darkGrey p-2 justify-between">
            <View className="items-center w-full">
                <Text className="text-white w-full text-lg font-semibold text-center text-wrap">
                    Choose your next Blind
                </Text>
            </View>

            <View className="w-full flex-row justify-between items-center bg-darkBg rounded-lg p-2">
                <Text className="text-gray-300 w-2/5 text-wrap">Round score</Text>
                <View className="bg-darkGrey flex-row-reverse justify-center items-center flex-1 rounded-lg">
                    <Text className="text-3xl text-white">{store.roundScore}</Text>
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

            <View className="w-full h-1/5 bg-darkBg justify-end items-center rounded-lg p-2">
                <View className="flex-row justify-between items-center ">
                    <View className=" bg-customRed flex-1 rounded-md items-end justify-center">
                        <Text className="text-white text-xl font-bold ">0</Text>
                    </View>
                    <Text className="text-white text-xl font-bold">x</Text>
                    <View className=" bg-blue-700 flex-1 rounded-md items-start justify-center">
                        <Text className="text-white text-xl font-bold ">0</Text>
                    </View>
                </View>
            </View>

            <View className="w-full flex-row  justify-between">
                <View className="items-center bg-darkBg p-2 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Hands</Text>
                    <View className="bg-darkGrey p-2 rounded-lg w-full justify-center items-center">
                        <Text className="text-blue-700 text-lg font-bold">{store.hands}</Text>
                    </View>
                </View>
                <View className="items-center bg-darkBg p-2 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Discards</Text>
                    <View className="bg-darkGrey p-2 rounded-lg w-full justify-center items-center">
                        <Text className="text-customRed text-lg font-bold">{store.discards}</Text>
                    </View>
                </View>
            </View>

            <View className="w-full bg-darkBg rounded-lg p-2 ">
                <View className="bg-darkGrey rounded-lg items-center justify-center">
                    <Text className="text-accentGold text-xl font-bold ">${store.money}</Text>
                </View>
            </View>

            <View className="w-full flex-row justify-between">
                <View className="items-center bg-darkBg p-2 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Ante</Text>
                    <View className="bg-darkGrey p-2 rounded-lg w-full justify-center items-center flex-row">
                        <Text className="text-accentGold text-lg font-bold">{store.currentAnte}</Text>
                        <Text className="text-white text-lg font-bold">/8</Text>
                    </View>
                </View>
                <View className="items-center bg-darkBg p-2 rounded-lg w-[49%]">
                    <Text className="text-gray-400 text-xs">Round</Text>
                    <View className="bg-darkGrey p-2 rounded-lg w-full justify-center items-center">
                        <Text className="text-accentGold text-lg font-bold">{store.currentRound}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}