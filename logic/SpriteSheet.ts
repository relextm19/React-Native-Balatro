import { Skia, useRectBuffer, SkHostRect } from "@shopify/react-native-skia";

export type SpriteSheetSliceData = {
  offsetX: number,
  offsetY: number,
  rows: number,
  cols: number,
  spriteWidth: number,
  spriteHeight: number
}

export function useSpriteRects(sliceData: SpriteSheetSliceData) {
  const size = sliceData.cols * sliceData.rows;

  const rects = Array.from({ length: size }, (_, i) => {
    const col = i % sliceData.cols;
    const row = Math.floor(i / sliceData.cols);
    return Skia.XYWHRect(
      col * (sliceData.spriteWidth + sliceData.offsetX),
      row * (sliceData.spriteHeight + sliceData.offsetY),
      sliceData.spriteWidth,
      sliceData.spriteHeight
    );
  });

  return { value: rects };
}

