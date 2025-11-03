import { Skia, Atlas, Canvas, Image, SkImage, useImage } from "@shopify/react-native-skia";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

import { deckArray } from "../../assets/chips/deckArray";
import { Button } from "react-native";
import { BORDER_RADIUS, CUSTOM_RED } from "../../Constants";


export default function DifficultySelectScreen() {
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));

    //TODO: This is a place holder sprite so the data is not realy correct
    const deckSliceData: SpriteSheetSliceData = {
        offsetX: 1,
        offsetY: 1,
        rows: 5,
        cols: 7,
        spriteWidth: 70,
        spriteHeight: 94
    }
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
    const [deckIndex, setDeckIndex] = useState(0)

    function cycleDeck(direction: number): void {
        setDeckIndex((deckIndex + direction + deckLength) % deckLength);
    }

    const stakeSpriteRects = useSpriteRects(stakeSliceData);
    const stakesLength = stakeSliceData.cols * stakeSliceData.rows;
    const [stakeIndex, setStakeIndex] = useState(0);
    function cylceStakes(direction: number): void {
        setStakeIndex((stakeIndex + direction + stakesLength) % stakesLength);
    }

    const scale = 1.5;
    const transforms = [Skia.RSXform(scale, 0, 0, 0)]
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
                <View style={styles.deckContainer}>
                    <Canvas style={{ width: deckSliceData.spriteWidth * scale, height: deckSliceData.spriteHeight * scale }}>
                        <Atlas
                            image={decksSpriteSheet}
                            sprites={[deckSpriteRects.value[deckIndex]]}
                            transforms={transforms}
                        />
                    </Canvas>
                    <View style={[styles.deckDescWrap, { height: deckSliceData.spriteHeight * scale }]}>
                        <Text style={styles.descHeader}>
                            {deckArray[deckIndex].name} Deck
                        </Text>
                        <View style={styles.descContentWrap}>
                            <View style={styles.descContent}>
                                <Text>
                                    {deckArray[deckIndex].desc}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* <Button
                onPress={() => { cycleDeck(1) }}
                title=">"
                style={styles.cycleButton}
            ></Button>
            <Button
                onPress={() => { cycleDeck(-1) }}
                title="<"
            ></Button> */}
            </View>
        </View>
    )
}

const PADDING = 5;

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: '95%',

        backgroundColor: '#3f5762ff',

        borderColor: 'white',
        borderWidth: 2,
        borderRadius: BORDER_RADIUS,

        justifyContent: 'center',
        alignItems: 'center',
    },
    deckContainer: {
        backgroundColor: '#1f1f22ff',

        borderRadius: BORDER_RADIUS,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,

        padding: 2 * PADDING,
    },
    deckDescWrap: {
        backgroundColor: '#3c464dff',

        borderRadius: BORDER_RADIUS,
    },
    descContentWrap: {
        padding: PADDING,
        flex: 1,
    },
    descHeader: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    descContent: {
        flex: 1,
        backgroundColor: 'white',

        borderRadius: BORDER_RADIUS,

        justifyContent: 'center',
        alignItems: 'center',

        padding: PADDING,
    },
    cycleButton: {
        backgroundColor: CUSTOM_RED
    },
})