import React, { ReactElement } from "react";
import { Image, View, BackHandler } from "react-native";
import MenuButton from "./MenuButton";
import type { SpriteSheetSliceData } from "../../utils/SpriteSheet";
import { useAppStore, Views } from "../../GameState";

import { buttonSliceData } from "../../assets/sliceData";

export default function Menu(): ReactElement {
    const setCurrentView = useAppStore((state) => state.setCurrentView);

    const playButtonImageAsset = require("../../assets/ui/start_button.png");
    const exitButtonImageAsset = require("../../assets/ui/exit_button.png");

    function closeGame(): void {
        BackHandler.exitApp();
    }

    function showDificultySelectScreen(): void {
        setCurrentView(Views.DifficultySelect)
    }

    return (
        <View className="justify-between items-center w-full h-full">
            <View className="top-1/10 items-center w-full">
                <Image
                    source={require("../../assets/logo.png")}
                    className="w-2/5 min-w-[300px] h-1/10 min-h-[150px]"
                    resizeMode="contain"
                />
            </View>
            <View className="bottom-1/5 flex-row justify-evenly items-center w-1/2">
                <MenuButton
                    scale={0.5}
                    imageAsset={playButtonImageAsset}
                    sliceData={buttonSliceData}
                    onClick={showDificultySelectScreen}
                />
                <MenuButton
                    scale={0.5}
                    imageAsset={exitButtonImageAsset}
                    sliceData={buttonSliceData}
                    onClick={closeGame}
                />
            </View>
        </View>
    )
}
