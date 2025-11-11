import React, { ReactElement } from "react";
import { Skia, Canvas, Atlas, useImageAsTexture, rotate } from "@shopify/react-native-skia";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { useSharedValue, useDerivedValue, withTiming, Easing } from "react-native-reanimated";
import { Pressable } from "react-native";

import type { SpriteSheetSliceData } from "../../logic/SpriteSheet";

type MenuButtonProps = {
    imageAsset: number, //the type of require calls is number due to how metro handles stuff
    sliceData: SpriteSheetSliceData,
    scale: number,
    rotation?: number,
    onClick: (...args: any[]) => void;
}

export default function MenuButton({ imageAsset, sliceData, scale, onClick, rotation = 0 }: MenuButtonProps): ReactElement {
    const texture = useImageAsTexture(imageAsset);
    const spriteRects = useSpriteRects(sliceData);
    const animationDuration = 70;

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

        onClick();
    };

    return (
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ transform: [{ rotate: `${rotation}deg` }] }}>
            <Canvas
                style={{
                    width: sliceData.spriteWidth * scale,
                    height: sliceData.spriteHeight * scale,
                }}
            >
                <Atlas
                    image={texture}
                    sprites={derivedSprites}
                    transforms={[Skia.RSXform(scale, 0, 0, 0)]}
                />
            </Canvas>
        </Pressable>
    );
}
