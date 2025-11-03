import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from 'expo-screen-orientation';

import MovingBackground from "./components/ui/Background";
import Menu from "./components/ui/Menu";
import AnteSelectScreen from "./components/ui/AnteSelectScreen";
import DifficultySelectScreen from "./components/ui/DifficultySelectScreen";

import { Views } from "./gameState";
import { useAppStore } from "./gameState";

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
                return <Menu />
            case Views.DifficultySelect:
                return <DifficultySelectScreen />
            case Views.AnteSelect:
                return <AnteSelectScreen />
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={StyleSheet.absoluteFill}>
                <MovingBackground />
            </View>
            {getMainView()}
        </View>
    );

}

const styles = StyleSheet.create({});