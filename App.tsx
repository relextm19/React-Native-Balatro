import CardSpriteTest from "./tests/cardSpritesTestView";
import MovingBackground from "./components/ui/background";
import * as NavigationBar from "expo-navigation-bar"
import { useEffect } from "react";

export default function App() {
  useEffect(()=>{
    NavigationBar.setVisibilityAsync('hidden');
  })
  return (
      <MovingBackground />
  );
}