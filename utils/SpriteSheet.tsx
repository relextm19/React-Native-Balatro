import React from "react";
import { SkImage, useImage, SkRect } from "@shopify/react-native-skia";

export function getSpriteRects(path: string, rows: number, cols: number, spriteWidth: number, spriteHeight: number){
    const spriteSheet = useImage(path);
    const images = [] as SkImage[];

    const frames: SkRect[] = React.useMemo(() => {
        const arr: SkRect[] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                arr.push({ x: col * spriteWidth, y: row * spriteHeight, width: spriteWidth, height: spriteHeight });
            }
        }
        return arr;
    }, [rows, cols, spriteWidth, spriteHeight]);
}