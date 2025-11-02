import React, { ReactElement, use } from "react";
import { useImage } from "@shopify/react-native-skia";
import { View, StyleSheet } from "react-native";

import AnteSelectPane from "./AnteSelectPane";
import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

export default function AnteSelectScreen(): ReactElement | null {
    //TODO: add a file that will contain coords of each chip
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));

    const stakeSliceData: SpriteSheetSliceData = {
        offsetX: 2,
        offsetY: 2,
        rows: 2,
        cols: 4,
        spriteWidth: 27,
        spriteHeight: 27,
    };
    const blindSliceData: SpriteSheetSliceData = {
        offsetX: 0,
        offsetY: 2,
        rows: 30,
        cols: 1,
        spriteWidth: 32,
        spriteHeight: 32,
    };

    const stakeSpriteRects = useSpriteRects(stakeSliceData).value ?? [];
    const blindSpriteRects = useSpriteRects(blindSliceData).value ?? [];
    if (!stakeSpriteSheet || !blindsSpriteSheet) return null;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end'
        },
        anteSelectConainter: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3%',
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.anteSelectConainter}>
                <AnteSelectPane
                    stakeSpriteSheet={stakeSpriteSheet} stakeSourceRect={stakeSpriteRects[0]}
                    blindSpriteSheet={blindsSpriteSheet} blindSourceRect={blindSpriteRects[0]}
                />
                <AnteSelectPane
                    stakeSpriteSheet={stakeSpriteSheet} stakeSourceRect={stakeSpriteRects[0]}
                    blindSpriteSheet={blindsSpriteSheet} blindSourceRect={blindSpriteRects[1]}
                />
                <AnteSelectPane
                    stakeSpriteSheet={stakeSpriteSheet} stakeSourceRect={stakeSpriteRects[0]}
                    blindSpriteSheet={blindsSpriteSheet} blindSourceRect={blindSpriteRects[2]}
                />
            </View >
        </View>
    );
}