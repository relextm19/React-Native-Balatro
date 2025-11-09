import { Skia, Atlas, useImage, SkImage, SkRect, Canvas, rrect } from "@shopify/react-native-skia";
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

    const animationHeight = 20;

    const y = useSharedValue(0)

    const transform = useDerivedValue(() => {
        return [Skia.RSXform(scale, 0, 0, y.value)]
    }, [y])

    const gesture = Gesture.Tap().onEnd(() => {
        let to;
        if (y.value != 0) {
            to = 0;
        } else {
            to = -animationHeight;
        }
        y.value = withTiming(to, { duration: 200 })
    });
    console.log(scale)
    return (
        <View style={{
            width: cardSliceData.spriteWidth * scale,
            height: cardSliceData.spriteHeight * scale,
        }} className="overflow-visible">
            <GestureDetector gesture={gesture}>
                <Canvas style={{ width: cardSliceData.spriteWidth * scale, height: cardSliceData.spriteHeight * scale }}>
                    <Atlas image={modifierSpriteSheet} sprites={[modifierSprite]} transforms={transform} />
                    <Atlas image={cardsSpriteSheet} sprites={[sprite]} transforms={transform} />
                </Canvas>
            </GestureDetector>
        </View>
    );
}
