import React, { useState } from "react";
import { View, Text } from "react-native";
import { Skia, Atlas, Canvas, useImage } from "@shopify/react-native-skia";

import MenuButton from "./MenuButton";

import { deckArray } from "../../assets/cards/deckArray";
import { stakeArray } from "../../assets/chips/StakeArray";
import { useAppStore, Views } from "../../GameState";
import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

import { deckSliceData, buttonSliceData, stakeSliceData } from "../../assets/sliceData";

export default function DifficultySelectScreen() {
    //TODO: Add a file where where i will keep all the sliceData
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const playButtonImageAsset = require("../../assets/ui/play_button.png");
    const homeButtonImageAsset = require("../../assets/ui/home_button.png");
    const cycleButtonImageAsset = require("../../assets/ui/cycle_button.png");


    const deckSpriteRects = useSpriteRects(deckSliceData);
    const deckLength = deckArray.length;
    const [deckIndex, setDeckIndex] = useState(0);

    const stakeSpriteRects = useSpriteRects(stakeSliceData);
    const stakesLength = stakeSliceData.cols * stakeSliceData.rows;
    const [stakeIndex, setStakeIndex] = useState(0);

    const scale = 1.5;
    const transforms = [Skia.RSXform(scale, 0, 0, 0)];

    function cycleDeck(direction: number): void {
        console.log((deckIndex + direction + deckLength) % deckLength, deckLength)
        setDeckIndex((deckIndex + direction + deckLength) % deckLength);
    }

    function cycleStakes(direction: number): void {
        setStakeIndex((stakeIndex + direction + stakesLength) % stakesLength);
    }

    const setCurrentView = useAppStore((state) => state.setCurrentView);
    function startGame(): void {
        setCurrentView(Views.AnteSelect)
    }
    function returnToMenu(): void {
        setCurrentView(Views.Menu)
    }

    return (
        <View className="flex-1 justify-center items-center">
            <View className="bg-slate-700  border-2 border-slate-400 rounded-main justify-center items-center gap-2 p-2">
                <View className="gap-2">
                    {/* Deck Section */}
                    <View className="justify-center items-center flex-row">
                        <MenuButton
                            scale={0.5}
                            rotation={-90}
                            imageAsset={cycleButtonImageAsset}
                            sliceData={buttonSliceData}
                            onClick={() => cycleDeck(-1)}
                        />
                        <View className="bg-[#1f1f22] rounded-main justify-center items-center flex-row gap-2 p-2">
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
                            >
                                <Text className="text-white text-lg text-center">
                                    {deckArray[deckIndex].name} Deck
                                </Text>
                                <View className="p-2 flex-1">
                                    <View className="flex-1 flex-wrap bg-white rounded-main justify-center items-center p-2">
                                        <Text>{deckArray[deckIndex].desc}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <MenuButton
                            scale={0.5}
                            rotation={90}
                            imageAsset={cycleButtonImageAsset}
                            sliceData={buttonSliceData}
                            onClick={() => cycleDeck(1)}
                        />
                    </View>

                    {/* Stake Section */}
                    <View className="bg-[#1f1f22] rounded-main justify-center items-center flex-row gap-2 p-2">
                        <MenuButton
                            scale={0.25}
                            rotation={-90}
                            imageAsset={cycleButtonImageAsset}
                            sliceData={buttonSliceData}
                            onClick={() => cycleStakes(-1)}
                        />
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
                            className="bg-[#3c464d] rounded-main flex-1"
                        >
                            <Text className="text-white text-lg text-center">
                                {stakeArray[stakeIndex].name} Stake
                            </Text>
                            <View className="p-2">
                                <View className="bg-white rounded-main justify-center items-center p-2">
                                    <Text>{stakeArray[stakeIndex].desc}</Text>
                                </View>
                            </View>
                        </View>
                        <MenuButton
                            scale={0.25}
                            rotation={90}
                            imageAsset={cycleButtonImageAsset}
                            sliceData={buttonSliceData}
                            onClick={() => cycleStakes(1)}
                        />
                    </View>
                </View>

                <View className="gap-4 items-center flex-row">
                    <MenuButton
                        scale={0.5}
                        imageAsset={playButtonImageAsset}
                        sliceData={buttonSliceData}
                        onClick={startGame}
                    />
                    <MenuButton
                        scale={0.5}
                        imageAsset={homeButtonImageAsset}
                        sliceData={buttonSliceData}
                        onClick={returnToMenu}
                    />
                </View>
            </View>
        </View>
    );
}
