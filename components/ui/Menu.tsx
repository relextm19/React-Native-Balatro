import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MenuButton from "./menu/MenuButton";
import { RW, RH } from "../../utils/ResponsiveDimensions";
import type { SpriteSheetSliceData } from "../../utils/SpriteSheet";

export default function Menu(){
    const imageAsset = require("../../assets/ui/play_button.png");
    const sliceData: SpriteSheetSliceData = {
        offsetX: 11,
        offsetY: 0,
        rows: 1,
        cols: 3,
        spriteWidth: 53,
        spriteHeight: 22
    };
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View>
                <MenuButton imageAsset={imageAsset} sliceData={sliceData} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer:{
        width: '100%',
        alignItems: 'center',
        paddingTop: RH(2),
    },
    logo: {
        width: RW(30),
        height: RW(10),
        minWidth: 300,
        minHeight: 150,
    }
})