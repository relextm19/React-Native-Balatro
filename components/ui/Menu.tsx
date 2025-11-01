import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MenuButton from "./menu/MenuButton";
import { RW, RH } from "../../utils/ResponsiveDimensions";
import type { SpriteSheetSliceData } from "../../utils/SpriteSheet";

export default function Menu(){
    const buttonImageBasePath = "../../assets/ui/"
    const playButtonImageAsset = require(buttonImageBasePath + "play_button.png");
    const exitButtonImageAsset = require(buttonImageBasePath + "exit_button.png")
    const buttonSliceData: SpriteSheetSliceData = {
        offsetX: 11,
        offsetY: 0,
        rows: 1,
        cols: 3,
        spriteWidth: 53,
        spriteHeight: 22
    };
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.buttonContainer}>
                <MenuButton scale={2} imageAsset={playButtonImageAsset} sliceData={buttonSliceData} />
                <MenuButton scale={2} imageAsset={exitButtonImageAsset} sliceData={buttonSliceData} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
        top: '10%',
    },
    logo: {
        width: '40%',
        height: '10%',
        minWidth: 300,
        minHeight: 150,
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        bottom: '20%',
    },
})