import './global.css'

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from 'expo-screen-orientation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MovingBackground from "./components/Background";
import Menu from "./components/Menu";
import AnteSelectScreen from "./components/AnteSelectScreen";
import DifficultySelectScreen from "./components/DifficultySelectScreen";

import { Views } from "./GameState";
import { useAppStore } from "./GameState";
import DeckView from './components/DeckView';
import GameScreen from './components/GameScreen';
import Shop from './components/Shop';
import RoundSummary from './components/RoundSummary';
import DefeatScreen from './components/DefeatScreen';

export default function App() {
    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        };
        lockOrientation();
        const hideNavBar = async () => {
            await NavigationBar.setVisibilityAsync('hidden');
        }
        hideNavBar();
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
            case Views.DeckView:
                return <DeckView />
            case Views.GameScreen:
                return <GameScreen />
            case Views.Shop:
                return <Shop />
            case Views.RoundSummary:
                return <RoundSummary />
            case Views.DefeatScreen:
                return <DefeatScreen />
        }
    }

    return (
        <GestureHandlerRootView>
            <View style={StyleSheet.absoluteFill}>
                <MovingBackground />
            </View>
            <View className="flex-1">
                {getMainView()}
            </View>
        </GestureHandlerRootView>
    );
}
