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
import { useScreenDimensions } from "../logic/ResponsiveDimensions";

export default function MovingBackground() {
    const screenDims = useScreenDimensions();
    const translateX = useSharedValue(0);
    const image = useImage(require("../../assets/backgrounds/background1.png"));

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(-screenDims.width, {
                duration: 8000,
                easing: Easing.linear,
            }),
            -1
        );
    }, [screenDims.width]);

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
                    width={screenDims.width + 1}
                    height={screenDims.height}
                    fit="fill"
                />
                <Image
                    image={image}
                    x={screenDims.width}
                    y={0}
                    width={screenDims.width}
                    height={screenDims.height}
                    fit="fill"
                />
            </Group>
        </Canvas>
    );
}
