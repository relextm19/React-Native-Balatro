import React, { ReactElement } from "react";
import { Image, StyleSheet, View, BackHandler } from "react-native";

import MenuButton from "./MenuButton";
import type { SpriteSheetSliceData } from "../../utils/SpriteSheet";

type MenuProps = {
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ setGameStarted }: MenuProps): ReactElement {
    const playButtonImageAsset = require("../../assets/ui/play_button.png");
    const exitButtonImageAsset = require("../../assets/ui/exit_button.png");

    const buttonSliceData: SpriteSheetSliceData = {
        offsetX: 11,
        offsetY: 0,
        rows: 1,
        cols: 3,
        spriteWidth: 53,
        spriteHeight: 22
    };

    const styles = StyleSheet.create({
        container: {
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

    function closeGame(): void {
        BackHandler.exitApp();
    }

    function startGame(): void {
        setGameStarted(true);
    }

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
                <MenuButton
                    scale={2}
                    imageAsset={playButtonImageAsset}
                    sliceData={buttonSliceData}
                    onClick={startGame}
                />
                <MenuButton
                    scale={2}
                    imageAsset={exitButtonImageAsset}
                    sliceData={buttonSliceData}
                    onClick={closeGame}
                />
            </View>
        </View>
    )
}