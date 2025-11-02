import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from 'expo-screen-orientation';

import MovingBackground from "./components/ui/Background";
import Menu from "./components/ui/Menu";
import AnteSelectScreen from "./components/ui/AnteSelectScreen";

export default function App() {
    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        };
        lockOrientation();
        NavigationBar.setVisibilityAsync('hidden');
    }, []);

    const styles = StyleSheet.create({});
    const [gameStarted, setGameStarted] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <View style={StyleSheet.absoluteFill}>
                <MovingBackground />
            </View>
            {!gameStarted ? (
                <Menu setGameStarted={setGameStarted} />
            ) : (
                <AnteSelectScreen />
            )}
        </View>
    );

}
