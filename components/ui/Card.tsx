import { Skia, Atlas, useImage, SkImage, SkRect, Canvas } from "@shopify/react-native-skia";
import { ReactElement, useEffect, useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useSharedValue, withTiming, useAnimatedStyle, withSequence, Easing } from "react-native-reanimated";

import { cardSliceData } from "../../assets/sliceData";
import { IPlayingCard, Modifier } from "../../interfaces/Card";
import { modifierDescs } from "../../assets/cards/ModifierArray";

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
    const popupScale = useSharedValue(0);
    const popupOpacity = useSharedValue(0);

    const cardAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: y.value ?? 0 },
            { rotateZ: `${rotation.value}deg` },
        ]
    }));

    const popupAnimatedStyle = useAnimatedStyle(() => ({
        opacity: popupOpacity.value,
        transform: [{ scale: popupScale.value }]
    }));


    function liftUp() {
        if (!animationHeight || !selectedCards || !setSelectedCards || !cardObject || timeoutRef.current) return;
        if (y.value === -animationHeight) {
            y.value = withTiming(0, { duration: 200 });
            setSelectedCards(prev => prev.filter(sel => sel.id !== cardObject.id));
        } else if (y.value === 0) {
            if (selectedCards.length >= 5) return; // max 5 cards
            setSelectedCards(prev => [...prev, cardObject]);
            y.value = withTiming(-animationHeight, { duration: 200 });
        }
    };

    const [cardModifierText, setCardModifierText] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (shake && shakeDuration && cardBonus) {
            rotation.value = withSequence(
                withTiming(10, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(-8, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(6, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(-4, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(2, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: shakeDuration / 6, easing: Easing.inOut(Easing.ease) }),
            );

            popupScale.value = withSequence(
                withTiming(1.2, { duration: 120 }),
                withTiming(1, { duration: 80 })
            );

            popupOpacity.value = withTiming(1, { duration: 200 });
        }
    }, [shake]);

    const timeoutRef = useRef<number | null>(null);

    function getHighlitedText(text: string, keywords: string[], colors: string[], wordsAfterKeyword: number[]) {
        const parts = text.split(" ");
        const output: React.ReactNode[] = [];
        let i = 0;

        while (i < parts.length) {
            const matchedIndex = keywords.findIndex(k => parts[i].startsWith(k));
            if (matchedIndex !== -1) {
                const wordsForward = wordsAfterKeyword[matchedIndex];
                let color = "text-accentGold";
                if (parts[i + 1] === "Mult") {
                    color = "text-customRed";
                } else if (parts[i + 1] === "Chips") {
                    color = "text-blue-600";
                }
                const group = parts.slice(i, i + wordsForward).join(" ");
                output.push(
                    <Text key={i} className={`${color} font-bold`}>
                        {group + " "}
                    </Text>
                );
                i += wordsForward;
            } else {
                output.push(parts[i] + " ");
                i++;
            }
        }

        return <Text>{output}</Text>;
    }

    return (
        <Pressable
            onPress={liftUp}
            onPressIn={() => {
                timeoutRef.current = setTimeout(() => {
                    setCardModifierText(modifierDescs[cardObject!.modifier]);
                }, 300);
            }}
            onPressOut={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setCardModifierText(undefined);
            }}
        >
            {cardBonus && (
                <Animated.View
                    style={popupAnimatedStyle}
                    className={"justify-between items-center flex-row"}
                >
                    {cardBonus[0] !== 0 && shake && (
                        <Text className="text-blue-600 text-xl">+{cardBonus[0]}</Text>
                    )}

                    {cardBonus[1] !== 0 && shake && (
                        <Text className="text-customRed text-xl">{cardObject?.modifier !== Modifier.Glass ? `+${cardBonus[1]}` : 'x2'}</Text>
                    )}

                    {cardBonus[2] !== 0 && shake && (
                        <Text className="text-accentGold text-xl">+{cardBonus[2]}$</Text>
                    )}
                </Animated.View>
            )}
            {cardModifierText && (
                <View className="bottom-full z-50 absolute bg-white p-2 rounded-md h-full">
                    <Text
                        className=""
                        adjustsFontSizeToFit
                    >
                        {getHighlitedText(cardModifierText, ["+", "x", "$"], ["blue", "red", "#e0ae07"], [2, 2, 1])}
                    </Text>
                </View>
            )}
            <Animated.View
                style={[
                    {
                        width: cardSliceData.spriteWidth * scale,
                        height: cardSliceData.spriteHeight * scale,
                    },
                    cardAnimatedStyle
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
