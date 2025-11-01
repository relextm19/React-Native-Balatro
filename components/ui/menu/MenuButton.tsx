import React from "react";
import { Skia, Canvas, Atlas, useImageAsTexture } from "@shopify/react-native-skia";
import { useSpriteRects } from "../../../utils/SpriteSheet";
import { useSharedValue, useDerivedValue, withTiming, Easing } from "react-native-reanimated";
import { Pressable } from "react-native";

export default function MenuButton() {
    const texture = useImageAsTexture(require("../../../assets/ui/play_button.png"));
    const spriteRects = useSpriteRects(11, 0, 1, 3, 53, 22);
    const transforms = [Skia.RSXform(1, 0, 0, 0)]
    const animationDuration = 100;

    const frame = useSharedValue(0);


    const derivedSprites = useDerivedValue(() => {
        if (!spriteRects.value) {
            return [];
        }
        const currentFrame = Math.round(frame.value);
        return [spriteRects.value[currentFrame]];

    }, [spriteRects]); 

    const onPressIn = () => {
        frame.value = 0;
        frame.value = withTiming(2, {
            duration: animationDuration,
            easing: Easing.linear,
        });
    };
    const onPressOut = () => {
        frame.value = 2;
        frame.value = withTiming(0, {
            duration: animationDuration,
            easing: Easing.linear,
        });
    };

    return (
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
            <Canvas style={{ width: 53, height: 22 }}>
                {texture && (
                    <Atlas
                        image={texture}
                        sprites={derivedSprites}
                        transforms={transforms}
                    />
                )}
            </Canvas>
        </Pressable>
    );
}
