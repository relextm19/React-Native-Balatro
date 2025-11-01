import { useRectBuffer, SkHostRect } from "@shopify/react-native-skia";
import type { Mutable } from "react-native-reanimated/lib/typescript/commonTypes";

export type SpriteSheetSliceData = {
  offsetX: number,
  offsetY: number,
  rows: number,
  cols: number,
  spriteWidth: number,
  spriteHeight: number
}

export function useSpriteRects(
    sliceData: SpriteSheetSliceData
): Mutable<SkHostRect[]> {
  const size = sliceData.cols * sliceData.rows;

  return useRectBuffer(size, (rect, i) => {
    "worklet";
    const col = i % sliceData.cols;
    const row = Math.floor(i / sliceData.cols);

    rect.setXYWH(
      col * (sliceData.spriteWidth + sliceData.offsetX),
      row * (sliceData.spriteHeight + sliceData.offsetY),
      sliceData.spriteWidth,
      sliceData.spriteHeight
    );
  });
}
