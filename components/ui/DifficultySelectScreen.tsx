import React, { useState } from "react";
import { View, Text } from "react-native";
import { Skia, Atlas, Canvas, useImage } from "@shopify/react-native-skia";

import MenuButton from "./MenuButton";

import { deckArray } from "../../assets/cards/deckArray";
import { stakeArray } from "../../assets/chips/StakeArray";
import { useAppStore, Views } from "../../GameState";
import { useSpriteRects } from "../../utils/SpriteSheet";

import { deckSliceData, buttonSliceData, stakeSliceData } from "../../assets/sliceData";
import { generateDeck } from "../../interfaces/Card";

export default function DifficultySelectScreen() {
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const playButtonImageAsset = require("../../assets/ui/play_button.png");
    const homeButtonImageAsset = require("../../assets/ui/home_button.png");
    const cycleButtonImageAsset = require("../../assets/ui/cycle_button.png");


    const deckSpriteRects = useSpriteRects(deckSliceData);
    const deckLength = deckArray.length;
    const [deckIndex, setDeckIndex] = useState(0);

    const stakeSpriteRects = useSpriteRects(stakeSliceData);
    const stakesLength = stakeArray.length;
    const [stakeIndex, setStakeIndex] = useState(0);

    const scale = 1.5;
    const transforms = [Skia.RSXform(scale, 0, 0, 0)];

    function cycleDeck(direction: number): void {
        setDeckIndex((deckIndex + direction + deckLength) % deckLength);
    }

    function cycleStakes(direction: number): void {
        setStakeIndex((stakeIndex + direction + stakesLength) % stakesLength);
    }

    const state = useAppStore.getState();

    function startGame(): void {
        deckArray[deckIndex].state = { total: 52, avaliable: 52 }
        state.setCurrentDeck(deckArray[deckIndex])
        state.setCurrentStake(stakeArray[stakeIndex])
        const deck = generateDeck();
        if (!deck) { return }
        state.setCurrentDeckCards(deck);
        state.setCurrentView(Views.AnteSelect)
    }
    function returnToMenu(): void {
        state.setCurrentView(Views.Menu)
    }

    return (
        <View className="flex-1 justify-center items-center">
            <View className="justify-between items-center bg-slate-700 p-4 border-2 border-slate-400 rounded-main w-3/5 h-full">

                <View className="flex-row flex-1 justify-center items-center w-full">
                    <MenuButton
                        scale={0.5}
                        rotation={-90}
                        imageAsset={cycleButtonImageAsset}
                        sliceData={buttonSliceData}
                        onClick={() => cycleDeck(-1)}
                    />
                    <View className="flex-row justify-center items-center gap-2 bg-[#1f1f22] p-2 rounded-main">
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

                        <View className="flex-1 bg-[#3c464d] rounded-main">
                            <Text className="text-white text-lg text-center">
                                {deckArray[deckIndex].name} Deck
                            </Text>
                            <View className="flex-1 p-2">
                                <View className="flex-wrap flex-1 justify-center items-center bg-white p-2 rounded-main">
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

                <View className="flex-row flex-1 justify-center items-center w-full">
                    <MenuButton
                        scale={0.3}
                        rotation={-90}
                        imageAsset={cycleButtonImageAsset}
                        sliceData={buttonSliceData}
                        onClick={() => cycleStakes(-1)}
                    />
                    <View className="flex-row justify-center items-center gap-2 bg-[#1f1f22] p-2 rounded-main">
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

                        <View className="flex-1 bg-[#3c464d] rounded-main h-4/5">
                            <Text className="text-white text-lg text-center">
                                {stakeArray[stakeIndex].name} stake
                            </Text>
                            <View className="flex-1 p-2">
                                <View className="flex-wrap flex-1 justify-center items-center bg-white p-2 rounded-main">
                                    <Text>{stakeArray[stakeIndex].desc}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <MenuButton
                        scale={0.3}
                        rotation={90}
                        imageAsset={cycleButtonImageAsset}
                        sliceData={buttonSliceData}
                        onClick={() => cycleStakes(1)}
                    />
                </View>

                <View className="flex-row items-center gap-4">
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
