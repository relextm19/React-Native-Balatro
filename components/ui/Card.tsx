import { Skia, Atlas, useImage, SkImage, SkRect, Canvas } from "@shopify/react-native-skia";
import { ReactElement } from "react";
import { View } from "react-native";
import Animated, { runOnJS } from "react-native-reanimated";
import { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { cardSliceData } from "../../assets/sliceData";
import { IPlayingCard } from "../../interfaces/Card";

type cardProps = {
    scale: number,
    animationHeight: number,
    modifierSprite: SkRect,
    sprite: SkRect,
    cardsSpriteSheet: SkImage,
    modifierSpriteSheet: SkImage,
    selectedCards: IPlayingCard[],
    setSelectedCards: React.Dispatch<React.SetStateAction<IPlayingCard[]>>,
    cardGameObject: IPlayingCard,
}

export default function Card({
    scale,
    modifierSprite,
    sprite,
    animationHeight,
    cardsSpriteSheet,
    modifierSpriteSheet,
    selectedCards,
    setSelectedCards,
    cardGameObject
}: cardProps): ReactElement {
    const transform = [Skia.RSXform(scale, 0, 0, 0)];
    const y = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: y.value ?? 0 }]
    }));

    //TODO: run on js is depecated but nothing else works so its that for now
    const gesture = Gesture.Tap().onEnd(() => {
        if (y.value === -animationHeight) {
            y.value = withTiming(0, { duration: 200 });
        } else if (y.value === 0) {
            if (selectedCards.length >= 5) return; // max 5 cards
            y.value = withTiming(-animationHeight, { duration: 200 });
        }
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
