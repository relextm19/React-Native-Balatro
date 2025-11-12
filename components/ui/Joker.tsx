import { Skia, Atlas, Canvas, SkImage, SkRect } from "@shopify/react-native-skia";
import { ReactElement } from "react";

import { jokersSliceData } from "../../assets/sliceData";

type jokerProps = {
    image: SkImage,
    sprite: SkRect,
    scale: number,
}
export function Joker({ image, scale, sprite }: jokerProps): ReactElement | null {
    const sliceData = jokersSliceData;

    if (!image || !sprite) return null;
    return (
        <Canvas
            style={{
                width: sliceData.spriteWidth * scale,
                height: sliceData.spriteHeight * scale,
            }}
        >
            <Atlas
                image={image}
                sprites={[sprite]}
                transforms={[Skia.RSXform(scale, 0, 0, 0)]}
            />
        </Canvas>
    )
}