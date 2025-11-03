import { Skia, Atlas, Canvas, Image, SkImage, useImage } from "@shopify/react-native-skia";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

import { deckArray } from "../../assets/chips/StakesArray";
import { Button } from "react-native";

function getSpriteIndex(len: number, index: number, direction: number): number {
    return (index + direction) % len
}

export default function DifficultySelectScreen() {
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));

    //TODO: This is a place holder sprite so the data is not realy correct
    const deckSliceData: SpriteSheetSliceData = {
        offsetX: 1,
        offsetY: 1,
        rows: 5,
        cols: 7,
        spriteWidth: 70,
        spriteHeight: 94
    }

    const deckSpriteRects = useSpriteRects(deckSliceData);
    const deckLength = deckSliceData.cols * deckSliceData.rows;
    const index = useSharedValue(0);
    const spriteAtIndex = useDerivedValue(() => {
        return [deckSpriteRects.value[index.value]]
    }, [index])

    const scale = 1.5;
    const transforms = [Skia.RSXform(scale, 0, 0, 0)]
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Canvas style={{ width: deckSliceData.spriteWidth * scale, height: deckSliceData.spriteHeight * scale }}>
                    <Atlas
                        image={decksSpriteSheet}
                        sprites={spriteAtIndex}
                        transforms={transforms}
                    />
                </Canvas>
                <Text>
                    {deckArray[index.value]} Deck
                </Text>
                <Button
                    onPress={() => { index.value = getSpriteIndex(deckLength, index.value, 1) }}
                    title=">"
                ></Button>
                <Button
                    onPress={() => { index.value = getSpriteIndex(deckLength, index.value, -1) }}
                    title="<"
                ></Button>
            </View>
        </View>
    )
} 