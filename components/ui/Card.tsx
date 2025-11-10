import { Skia, Atlas, useImage, SkImage, SkRect, Canvas, rrect } from "@shopify/react-native-skia";
import { ReactElement } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSharedValue, useDerivedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { cardSliceData } from "../../assets/sliceData";

type cardProps = {
    scale: number,
    animationHeight: number,
    modifierSprite: SkRect,
    sprite: SkRect,
    cardsSpriteSheet: SkImage
    modifierSpriteSheet: SkImage,
}

export default function Card({ scale, modifierSprite, sprite, animationHeight, cardsSpriteSheet, modifierSpriteSheet }: cardProps): ReactElement {
    const transform = [Skia.RSXform(scale, 0, 0, 0)]

    const y = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: y.value ?? 0 }]
    }))
    //TODO: render the card on front when tapped
    const gesture = Gesture.Tap().onEnd(() => {
        if (animationHeight === undefined) { return }
        let to;
        if (y.value != 0) {
            to = 0;
        } else {
            to = -animationHeight;
        }
        y.value = withTiming(to, { duration: 200 })
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    {
                        width: cardSliceData.spriteWidth * scale,
                        height: cardSliceData.spriteHeight * scale,
                    },
                    animatedStyle
                ]}
            >
                <Canvas
                    style={{
                        width: cardSliceData.spriteWidth * scale,
                        height: cardSliceData.spriteHeight * scale,
                    }}
                >
                    <Atlas image={modifierSpriteSheet} sprites={[modifierSprite]} transforms={transform} />
                    <Atlas image={cardsSpriteSheet} sprites={[sprite]} transforms={transform} />
                </Canvas>
            </Animated.View>
        </GestureDetector>
    );
}
