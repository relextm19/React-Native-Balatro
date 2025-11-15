import { ReactElement, ReactNode, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ItemDescription from "./ItemDescription";

type shopItemProps = {
    children: ReactNode,
    price: number,
    description: string | undefined,
    animationHeight: number,
    isLifted: boolean,
    isHovered: boolean,
}
export function ShopItem({ children, price, animationHeight, isLifted, isHovered, description }: shopItemProps): ReactElement | null {
    const y = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: y.value ?? 0 },
        ]
    }));

    function liftUp() {
        if (y.value === -animationHeight) {
            y.value = withTiming(0, { duration: 200 });
        } else if (y.value === 0 && isLifted) {
            y.value = withTiming(-animationHeight, { duration: 200 });
        }
    }

    useEffect(() => {
        liftUp()
    }, [isLifted])
    const itemDescriptionProps = {
        text: description,
        keywords: [
            ["+", "Chips"],
            ["+", "Mult"],
            ["x", "Mult"],
            ["$", ""],
            ["25%", ""],
            ["+1", "discard"],
            ["+1", "hand"],
            ["+1", "card"]
        ] as [string, string][],
        colors: [
            "blue-600",
            "customRed",
            "customRed",
            "accentGold",
            "accentGold",
            "customRed",
            "blue-600",
            "blue-600"
        ],
        wordsAfterKeyword: [2, 2, 2, 1, 1, 2, 2, 2]
    };

    return (
        <View>
            <View>
                {description && isHovered && (
                    <ItemDescription
                        text={description}
                        keywords={[
                            ["+", "Chips"],
                            ["+", "Mult"],
                            ["x", "Mult"],
                            ["$", ""],
                            ["25%", ""],
                            ["+1", "discard"],
                            ["+1", "hand"],
                            ["+1", "card"]
                        ] as [string, string][]}
                        colors={[
                            "blue-600",
                            "customRed",
                            "customRed",
                            "accentGold",
                            "accentGold",
                            "customRed",
                            "blue-600",
                            "blue-600"
                        ]}
                        wordsAfterKeyword={[2, 2, 2, 1, 1, 2, 2, 2]}
                    />
                )}
            </View>
            );

            < Animated.View
                className="justify-center items-center p-2"
                style={animatedStyle}
            >
                <View className="bg-black px-2 rounded-t-md">
                    <Text
                        className="text-accentGold text-center"
                        adjustsFontSizeToFit
                        numberOfLines={1}
                    >
                        {price}$
                    </Text>
                </View>
                {children}
            </Animated.View >
        </View>
    )
}