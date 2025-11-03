import './global.css'

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from 'expo-screen-orientation';

import MovingBackground from "./components/ui/Background";
import Menu from "./components/ui/Menu";
import AnteSelectScreen from "./components/ui/AnteSelectScreen";
import DifficultySelectScreen from "./components/ui/DifficultySelectScreen";

import { Views } from "./GameState";
import { useAppStore } from "./GameState";

export default function App() {
    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        };
        lockOrientation();
        NavigationBar.setVisibilityAsync('hidden');
    }, []);

    const currentView = useAppStore((state) => state.currentView);

    function getMainView(): React.ReactElement {
        switch (currentView) {
            case Views.Menu:
                return <Menu />;
            case Views.DifficultySelect:
                return <DifficultySelectScreen />;
            case Views.AnteSelect:
                return <AnteSelectScreen />;
        }
    }

    return (
        <>
            <View style={StyleSheet.absoluteFill}>
                <MovingBackground />
            </View>
            <View className="flex-1">

                {/* {getMainView()} */}
            </View>
        </>
    );
}
