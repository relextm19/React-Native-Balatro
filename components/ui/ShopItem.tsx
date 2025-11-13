import { ReactElement, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type jokerProps = {
    children: ReactNode,
    price: number,
    animationHeight: number,
}
export function ShopItem({ children, price, animationHeight }: jokerProps): ReactElement | null {
    const y = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: y.value ?? 0 },
        ]
    }));
    function liftUp() {
        if (y.value === -animationHeight) {
            y.value = withTiming(0, { duration: 200 });
        } else if (y.value === 0) {
            y.value = withTiming(-animationHeight, { duration: 200 });
        }
    }
    return (
        <Pressable
            onPress={liftUp}
        >
            <Animated.View
                className="justify-center items-center"
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
            </Animated.View>
        </Pressable>
    )
}