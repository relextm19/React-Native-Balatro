import { Skia, Atlas, Canvas, Image, SkImage, useImage } from "@shopify/react-native-skia";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

export default function DifficultySelectScreen() {
  const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));

  //TODO: This is a place holder sprite so the data is not realy correct
  const deckSliceData: SpriteSheetSliceData = {
    offsetX: 1,
    offsetY: 1,
    rows: 5,
    cols: 7,
    spriteWidth: 70,
    spriteHeight: 94
  }

  const deckSpriteRects = useSpriteRects(deckSliceData);
  const index = useSharedValue(0);
  const spriteAtIndex = useDerivedValue(() => {
    return [deckSpriteRects.value[index.value]]
  }, [index])

  const transforms = [Skia.RSXform(1, 0, 0, 0)]
  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <Atlas
          image={decksSpriteSheet}
          sprites={spriteAtIndex}
          transforms={transforms}
        />
      </Canvas>
    </View>
  )
} 