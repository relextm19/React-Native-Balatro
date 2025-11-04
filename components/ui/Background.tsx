import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Canvas, useImage, Group, Image } from "@shopify/react-native-skia";
import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
    useDerivedValue
} from "react-native-reanimated";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/ResponsiveDimensions";

export default function MovingBackground() {
    const translateX = useSharedValue(0);
    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(-SCREEN_WIDTH, {
                duration: 8000,
                easing: Easing.linear,
            }),
            -1 // infinite
        );
    }, [SCREEN_WIDTH]);

    const image = useImage(require("../../assets/backgrounds/background1.png"));

    const animatedTransform = useDerivedValue(() => {
        return [{ translateX: translateX.value }];
    });

    return (
        <Canvas style={StyleSheet.absoluteFill}>
            <Group transform={animatedTransform}>
                <Image
                    image={image}
                    x={0}
                    y={0}
                    width={SCREEN_WIDTH + 1}
                    height={SCREEN_HEIGHT}
                    fit="fill"
                />
                <Image
                    image={image}
                    x={SCREEN_WIDTH}
                    y={0}
                    width={SCREEN_WIDTH}
                    height={SCREEN_HEIGHT}
                    fit="fill"
                />
            </Group>
        </Canvas>
    );
}
