import { ReactElement, ReactNode, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type shopItemProps = {
    children: ReactNode,
    price: number,
    animationHeight: number,
    isLifted: boolean,
}
export function ShopItem({ children, price, animationHeight, isLifted }: shopItemProps): ReactElement | null {
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
    return (
        <Animated.View
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
        </Animated.View>
    )
}