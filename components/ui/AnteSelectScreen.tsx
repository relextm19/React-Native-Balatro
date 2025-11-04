import React, { ReactElement } from "react";
import { View } from "react-native";
import { SkImage, SkRect, useImage } from "@shopify/react-native-skia";

import AnteSelectPane from "./AnteSelectPane";
import { SpriteSheetSliceData, useSpriteRects } from "../../utils/SpriteSheet";

import { stakeSliceData, blindSliceData } from "../../assets/sliceData";

type PaneData = {
    stakeSpriteSheet: SkImage;
    stakeSourceRect: SkRect;
    blindSpriteSheet: SkImage;
    blindSourceRect: SkRect;
};

export default function AnteSelectScreen(): ReactElement | null {
    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));

    const stakeSpriteRects = useSpriteRects(stakeSliceData).value ?? [];
    const blindSpriteRects = useSpriteRects(blindSliceData).value ?? [];

    if (!stakeSpriteSheet || !blindsSpriteSheet) return null;

    return (
        <View className="flex-1 justify-end items-center">
            <View className="flex-row justify-center items-end gap-[5%] h-[65%]">
                <AnteSelectPane
                    stakeSpriteSheet={stakeSpriteSheet}
                    stakeSourceRect={stakeSpriteRects[0]}
                    blindSpriteSheet={blindsSpriteSheet}
                    blindSourceRect={blindSpriteRects[0]}
                />
                <AnteSelectPane
                    stakeSpriteSheet={stakeSpriteSheet}
                    stakeSourceRect={stakeSpriteRects[0]}
                    blindSpriteSheet={blindsSpriteSheet}
                    blindSourceRect={blindSpriteRects[1]}
                />
                <AnteSelectPane
                    stakeSpriteSheet={stakeSpriteSheet}
                    stakeSourceRect={stakeSpriteRects[0]}
                    blindSpriteSheet={blindsSpriteSheet}
                    blindSourceRect={blindSpriteRects[2]}
                />
            </View>
        </View>
    );
}
