import CardSpriteTest from "./tests/cardSpritesTestView";
import MovingBackground from "./components/ui/background";
import * as NavigationBar from "expo-navigation-bar"
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();
    NavigationBar.setVisibilityAsync('hidden');
  })
  return (
    <MovingBackground />
  );
}