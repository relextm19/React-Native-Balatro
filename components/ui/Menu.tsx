import React, { ReactElement } from "react";
import { Image, View, BackHandler } from "react-native";
import MenuButton from "./MenuButton";
import type { SpriteSheetSliceData } from "../../utils/SpriteSheet";
import { useAppStore, Views } from "../../GameState";

import { buttonSliceData } from "../../assets/sliceData";

export default function Menu(): ReactElement {
    const setCurrentView = useAppStore((state) => state.setCurrentView);

    const playButtonImageAsset = require("../../assets/ui/play_button.png");
    const exitButtonImageAsset = require("../../assets/ui/exit_button.png");

    function closeGame(): void {
        BackHandler.exitApp();
    }

    function showDificultySelectScreen(): void {
        setCurrentView(Views.DifficultySelect)
    }

    return (
        <View className="w-full h-full items-center justify-between">
            <View className="w-full items-center top-1/10">
                <Image
                    source={require("../../assets/logo.png")}
                    className="w-2/5 h-1/10 min-w-[300px] min-h-[150px]"
                    resizeMode="contain"
                />
            </View>
            <View className="w-1/2 flex-row items-center justify-evenly bottom-1/5">
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
