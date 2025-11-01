import React from "react";
import { Skia, Canvas, Atlas, useImageAsTexture } from "@shopify/react-native-skia";
import { useSpriteRects } from "../../../utils/SpriteSheet";
import { useSharedValue, useDerivedValue, withTiming, Easing } from "react-native-reanimated";
import { Pressable } from "react-native";

import type { SpriteSheetSliceData } from "../../../utils/SpriteSheet";

type MenuButtonProps = {
    imageAsset: number, //the type of require calls is number due to how metro handles stuff
    sliceData: SpriteSheetSliceData,
    scale: number,
}

export default function MenuButton({imageAsset, sliceData, scale}: MenuButtonProps) {
    const texture = useImageAsTexture(imageAsset);
    const spriteRects = useSpriteRects(sliceData);
    const transforms = [Skia.RSXform(scale, 0, 0, 0)]
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
            <Canvas style={{ width:sliceData.spriteWidth * scale, height: sliceData.spriteHeight * scale}}>
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
