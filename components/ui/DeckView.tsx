import { Atlas, Canvas, useImage, rect, Skia, SkRSXform, useRectBuffer, SkRect } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState"
import { ReactElement } from "react";
import { cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../utils/SpriteSheet";
import { Modifier } from "../../interfaces/Card";
import { View } from "react-native";

export default function DeckView(): ReactElement | null {
    const store = useAppStore();
    const cards = store.currentDeck.cards;
    if (!cards) { return null }

    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const transforms: SkRSXform[] = [];
    const modifierSprites: SkRect[] = [];
    const cardSprites = Array.from(cards.values()).map((card, i) => {
        const sprite = rect(card.x, card.y, card.width, card.height);

        const offsetX = cardSliceData.spriteWidth + 10;
        const offsetY = cardSliceData.spriteHeight + 10;

        const drawX = (i % cardSliceData.cols) * offsetX;
        const drawY = Math.floor(i / cardSliceData.cols) * offsetY;

        transforms.push(Skia.RSXform(1, 0, drawX, drawY));
        modifierSprites[i] = card.modifier
            ? modifiersRects.value[Object.values(Modifier).findIndex(v => v === card.modifier)]
            : modifiersRects.value[0]
        return sprite;
    });
    console.log(modifierSprites.length, cardSprites.length, transforms.length)

    return (
        <View className="flex-1">
            <Canvas style={{ width: "100%", height: "100%" }}>
                <Atlas image={modifierSpriteSheet} sprites={modifierSprites} transforms={transforms} />
                <Atlas image={cardsSpriteSheet} sprites={cardSprites} transforms={transforms} />
            </Canvas>
        </View>
    );
}