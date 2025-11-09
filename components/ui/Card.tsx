import { Skia, Atlas, useImage, SkImage, SkRect, Canvas } from "@shopify/react-native-skia";
import { ReactElement } from "react";
import { View } from "react-native";

import { useSharedValue, useDerivedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cardSliceData } from "../../assets/sliceData";

type cardProps = {
    scale: number,
    modifierSprite: SkRect,
    sprite: SkRect,
}

export default function Card({ scale, modifierSprite, sprite }: cardProps): ReactElement {
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))


    const transform = [Skia.RSXform(scale, 0, 0, 0)];

    // function goUp() {
    //     y.value = y.value - 20; // or withTiming for animation
    // }

    const gesture = Gesture.Tap().onEnd(() => {
        console.log("hello")
    });

    return (
        <View style={{
            width: cardSliceData.spriteWidth * scale,
            height: cardSliceData.spriteHeight * scale,
        }}>
            <GestureDetector gesture={gesture}>
                <Canvas style={{ width: '100%', height: '100%' }}>
                    <Atlas image={modifierSpriteSheet} sprites={[modifierSprite]} transforms={transform} />
                    <Atlas image={cardsSpriteSheet} sprites={[sprite]} transforms={transform} />
                </Canvas>
            </GestureDetector>
        </View>
    );
}
