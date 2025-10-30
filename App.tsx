import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from 'expo-screen-orientation';

import MovingBackground from "./components/ui/Background";
import Menu from "./components/ui/Menu";

export default function App() {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <MovingBackground />
      </View>

      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});