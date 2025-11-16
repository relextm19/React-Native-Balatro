import React from 'react';
import { View, Text } from 'react-native';

import MenuButton from './MenuButton';

import { buttonSliceData } from '../../assets/sliceData';
import { useAppStore } from '../../GameState';
import { Views } from '../../GameState';

export default function DefeatScreen() {
    const homeButtonImageAsset = require("../../assets/ui/home_button.png");
    const store = useAppStore();

    function returnToMenu(): void {
        store.setCurrentView(Views.Menu)
        store.resetGame();
    }
    return (
        <View className="flex-1 justify-evenly items-center bg-black">
            <View>
                <Text className="absolute opacity-50 font-extrabold text-[80px] text-slate-700 uppercase -translate-x-1 -translate-y-1">
                    DEFEAT
                </Text>
                <Text className="font-extrabold text-[80px] text-white uppercase">
                    DEFEAT
                </Text>
                <Text className="absolute opacity-70 font-extrabold text-[#ff4f4f] text-[80px] uppercase translate-x-1 translate-y-1">
                    DEFEAT
                </Text>
            </View>
            <MenuButton
                scale={0.5}
                imageAsset={homeButtonImageAsset}
                sliceData={buttonSliceData}
                onClick={returnToMenu}
            />
        </View>
    );
};


