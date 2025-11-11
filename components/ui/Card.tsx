import { Skia, Atlas, useImage, SkImage, SkRect, Canvas } from "@shopify/react-native-skia";
import { ReactElement, useEffect } from "react";
import { View } from "react-native";
import Animated, { runOnJS } from "react-native-reanimated";
import { useSharedValue, withTiming, useAnimatedStyle, withSequence, Easing } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { cardSliceData } from "../../assets/sliceData";
import { IPlayingCard } from "../../interfaces/Card";

type cardProps = {
    scale: number,
    animationHeight?: number,
    modifierSprite: SkRect,
    sprite: SkRect,
    cardsSpriteSheet: SkImage,
    modifierSpriteSheet: SkImage,
    selectedCards?: IPlayingCard[],
    shake?: boolean,
}

export default function Card({
    scale,
    modifierSprite,
    sprite,
    animationHeight,
    cardsSpriteSheet,
    modifierSpriteSheet,
    selectedCards,
    shake
}: cardProps): ReactElement {
    const transform = [Skia.RSXform(scale, 0, 0, 0)];
    const y = useSharedValue(0);
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: y.value ?? 0 },
            { rotateZ: `${rotation.value}deg` },
        ]
    }));

    const gesture = Gesture.Tap().onEnd(() => {
        if (!animationHeight || !selectedCards) return;

        if (y.value === -animationHeight) {
            y.value = withTiming(0, { duration: 200 });
        } else if (y.value === 0) {
            if (selectedCards.length >= 5) return; // max 5 cards
            y.value = withTiming(-animationHeight, { duration: 200 });
        }
    });

    useEffect(() => {
        if (shake) {
            rotation.value = withSequence(
                withTiming(10, { duration: 100, easing: Easing.inOut(Easing.ease) }),
                withTiming(-8, { duration: 100, easing: Easing.inOut(Easing.ease) }),
                withTiming(6, { duration: 100, easing: Easing.inOut(Easing.ease) }),
                withTiming(-4, { duration: 100, easing: Easing.inOut(Easing.ease) }),
                withTiming(2, { duration: 100, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 100, easing: Easing.inOut(Easing.ease) }),
            );
        }
    }, [shake]);

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
