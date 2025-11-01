import React, { ReactElement } from "react";
import { useImage } from "@shopify/react-native-skia";
import { View, StyleSheet } from "react-native";

import AnteSelectPane from "./AnteSelectPane";
import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

export default function AnteSelectScreen(): ReactElement | null {
    const blindIconsSpriteSheet = useImage(require("../../assets/poker_chips/green.png"));

    const sliceData: SpriteSheetSliceData = {
        offsetX: 16,
        offsetY: 0,
        rows: 1,
        cols: 3,
        spriteWidth: 32,
        spriteHeight: 36,
    };

    const blindSpriteRects = useSpriteRects(sliceData).value ?? [];
    if (!blindIconsSpriteSheet) return null;

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    return (
        <View style={styles.container}>
            <AnteSelectPane spriteSheet={blindIconsSpriteSheet} sourceRect={blindSpriteRects[0]} />
            <AnteSelectPane spriteSheet={blindIconsSpriteSheet} sourceRect={blindSpriteRects[1]} />
            <AnteSelectPane spriteSheet={blindIconsSpriteSheet} sourceRect={blindSpriteRects[2]} />
        </View >
    );

}
