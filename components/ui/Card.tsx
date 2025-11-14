import { Skia, Atlas, useImage, SkImage, SkRect, Canvas } from "@shopify/react-native-skia";
import { ReactElement, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
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
    setSelectedCards?: React.Dispatch<React.SetStateAction<IPlayingCard[]>>,
    cardObject?: IPlayingCard,
    shake?: boolean,
    shakeDuration?: number,
    cardBonus?: [number, number, number];
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
    cardObject,
    shake,
    shakeDuration,
    cardBonus
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

    function liftUp() {
        if (!animationHeight || !selectedCards || !setSelectedCards || !cardObject) return;
        if (y.value === -animationHeight) {
            y.value = withTiming(0, { duration: 200 });
            setSelectedCards(prev => prev.filter(sel => sel.id !== cardObject.id));
        } else if (y.value === 0) {
            if (selectedCards.length >= 5) return; // max 5 cards
            setSelectedCards(prev => [...prev, cardObject]);
            y.value = withTiming(-animationHeight, { duration: 200 });
        }
    };

    useEffect(() => {
        if (shake && shakeDuration) {
            rotation.value = withSequence(
                withTiming(10, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(-8, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(6, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(-4, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(2, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
            );
        }
    }, [shake]);

    return (
        <Pressable onPress={liftUp}>
            {(cardBonus && shake) && (
                <>
                    <Text className="text-blue-600">{cardBonus[0]}</Text>
                    <Text className="text-customRed">{cardBonus[1]}</Text>
                    <Text className="text-accentGold">{cardBonus[2]}</Text>
                </>
            )}
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
        </Pressable>
    );
}
