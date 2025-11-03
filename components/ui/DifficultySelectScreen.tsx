import React, { useState } from "react";
import { View, Text } from "react-native";
import { Skia, Atlas, Canvas, useImage } from "@shopify/react-native-skia";
import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";
import { deckArray } from "../../assets/cards/deckArray";
import { stakeArray } from "../../assets/chips/StakeArray";

export default function DifficultySelectScreen() {
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));

    const deckSliceData: SpriteSheetSliceData = {
        offsetX: 1,
        offsetY: 1,
        rows: 5,
        cols: 7,
        spriteWidth: 70,
        spriteHeight: 94,
    };

    const stakeSliceData: SpriteSheetSliceData = {
        offsetX: 2,
        offsetY: 2,
        rows: 2,
        cols: 4,
        spriteWidth: 27,
        spriteHeight: 27,
    };

    const deckSpriteRects = useSpriteRects(deckSliceData);
    const deckLength = deckSliceData.cols * deckSliceData.rows;
    const [deckIndex, setDeckIndex] = useState(0);

    const stakeSpriteRects = useSpriteRects(stakeSliceData);
    const stakesLength = stakeSliceData.cols * stakeSliceData.rows;
    const [stakeIndex, setStakeIndex] = useState(0);

    const scale = 1.5;
    const transforms = [Skia.RSXform(scale, 0, 0, 0)];

    function cycleDeck(direction: number): void {
        setDeckIndex((deckIndex + direction + deckLength) % deckLength);
    }

    function cycleStakes(direction: number): void {
        setStakeIndex((stakeIndex + direction + stakesLength) % stakesLength);
    }

    return (
        <View className="flex-1 justify-center items-center">
            <View className="w-[70%] h-[95%] bg-[#3f5762] border-2 border-white rounded-main justify-center items-center">
                {/* Deck Section */}
                <View className="bg-[#1f1f22] rounded-main justify-center items-center flex-row gap-[5px] p-[10px]">
                    <Canvas
                        style={{
                            width: deckSliceData.spriteWidth * scale,
                            height: deckSliceData.spriteHeight * scale,
                        }}
                    >
                        <Atlas
                            image={decksSpriteSheet}
                            sprites={[deckSpriteRects.value[deckIndex]]}
                            transforms={transforms}
                        />
                    </Canvas>

                    <View
                        className="bg-[#3c464d] rounded-main"
                        style={{ height: deckSliceData.spriteHeight * scale }}
                    >
                        <Text className="text-white text-lg text-center">
                            {deckArray[deckIndex].name} Deck
                        </Text>
                        <View className="p-[5px] flex-1">
                            <View className="flex-1 bg-white rounded-main justify-center items-center p-[5px]">
                                <Text>{deckArray[deckIndex].desc}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stake Section */}
                <View className="bg-[#1f1f22] rounded-main justify-center items-center flex-row gap-[5px] p-[10px] mt-[15px]">
                    <Canvas
                        style={{
                            width: stakeSliceData.spriteWidth * scale,
                            height: stakeSliceData.spriteHeight * scale,
                        }}
                    >
                        <Atlas
                            image={stakeSpriteSheet}
                            sprites={[stakeSpriteRects.value[stakeIndex]]}
                            transforms={transforms}
                        />
                    </Canvas>

                    <View
                        className="bg-[#3c464d] rounded-main"
                        style={{ height: stakeSliceData.spriteHeight * scale }}
                    >
                        <Text className="text-white text-lg text-center">
                            {stakeArray[stakeIndex].name} Stake
                        </Text>
                        <View className="p-[5px] flex-1">
                            <View className="flex-1 bg-white rounded-main justify-center items-center p-[5px]">
                                <Text>{stakeArray[stakeIndex].desc}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
