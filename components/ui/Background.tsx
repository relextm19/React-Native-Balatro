import React from "react";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, useImage, Group, Image } from "@shopify/react-native-skia";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    useDerivedValue
} from "react-native-reanimated";

export default function MovingBackground() {
    const [IMAGE_WIDTH, IMAGE_HEIGHT] = [2000, 1000];

    const translateX = useSharedValue(0);
    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(-IMAGE_WIDTH, {
                duration: 50000,
                easing: Easing.linear,
            }),
            -1, // Repeat infinitely
        );
    }, [translateX]);

    const image = useImage(require("../../assets/backgrounds/background1.png"));
    const animatedTransform = useDerivedValue(() => {
        return [{ translateX: translateX.value }];
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            overflow: "hidden",
        },
    });
    return (
        <Canvas style={styles.container}>
            <Group transform={animatedTransform}>
                <Image
                    image={image}
                    x={0}
                    y={0}
                    width={IMAGE_WIDTH + 2} //to fix the small crack between images
                    height={IMAGE_HEIGHT}
                />
                <Image
                    image={image}
                    x={IMAGE_WIDTH}
                    y={0}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                />
            </Group>
        </Canvas>
    )

}