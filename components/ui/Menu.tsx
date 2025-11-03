import React, { ReactElement } from "react";
import { Image, View, BackHandler } from "react-native";
import MenuButton from "./MenuButton";
import type { SpriteSheetSliceData } from "../../utils/SpriteSheet";
import { useAppStore, Views } from "../../GameState";

export default function Menu(): ReactElement {
    const setCurrentView = useAppStore((state) => state.setCurrentView);

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

    function closeGame(): void {
        BackHandler.exitApp();
    }

    function startGame(): void {
        setCurrentView(Views.DifficultySelect)
    }

    return (
        <View className="w-full h-full items-center justify-between">
            <View className="w-full items-center top-[10%]">
                <Image
                    source={require("../../assets/logo.png")}
                    className="w-[40%] h-[10%] min-w-[300px] min-h-[150px]"
                    resizeMode="contain"
                />
            </View>
            <View className="w-[50%] flex-row items-center justify-evenly bottom-[20%]">
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
