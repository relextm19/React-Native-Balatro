import { useRectBuffer, SkHostRect } from "@shopify/react-native-skia";
import type { Mutable } from "react-native-reanimated/lib/typescript/commonTypes";

export function useSpriteRects(
  offsetX: number,
  offsetY: number,
  rows: number,
  cols: number,
  spriteWidth: number,
  spriteHeight: number
): Mutable<SkHostRect[]> {
  const size = cols * rows;

  return useRectBuffer(size, (rect, i) => {
    "worklet";
    const col = i % cols;
    const row = Math.floor(i / cols);

    rect.setXYWH(
      col * (spriteWidth + offsetX),
      row * (spriteHeight + offsetY),
      spriteWidth,
      spriteHeight
    );
  });
}
