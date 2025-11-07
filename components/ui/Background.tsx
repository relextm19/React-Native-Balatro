import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, useImage, Group, Image } from "@shopify/react-native-skia";
import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
    useDerivedValue
} from "react-native-reanimated";
import { useScreenDimensions } from "../../utils/ResponsiveDimensions";

export default function MovingBackground() {
    const { width: screenWidth, height: screenHeight } = useScreenDimensions();
    const translateX = useSharedValue(0);
    const image = useImage(require("../../assets/backgrounds/background1.png"));

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(-screenWidth, {
                duration: 8000,
                easing: Easing.linear,
            }),
            -1
        );
    }, [screenWidth]);

    const animatedTransform = useDerivedValue(() => [
        { translateX: translateX.value },
    ]);

    return (
        <Canvas style={StyleSheet.absoluteFill}>
            <Group transform={animatedTransform}>
                <Image
                    image={image}
                    x={0}
                    y={0}
                    width={screenWidth + 1}
                    height={screenHeight}
                    fit="fill"
                />
                <Image
                    image={image}
                    x={screenWidth}
                    y={0}
                    width={screenWidth}
                    height={screenHeight}
                    fit="fill"
                />
            </Group>
        </Canvas>
    );
}
