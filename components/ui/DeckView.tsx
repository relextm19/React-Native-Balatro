import { Atlas, Canvas, useImage, rect, Skia, SkRSXform, useRectBuffer, SkRect } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState"
import { ReactElement } from "react";
import { cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../utils/SpriteSheet";
import { View } from "react-native";
import { useScreenDimensions } from "../../utils/ResponsiveDimensions";
import { Modifier } from "../../interfaces/Card";

export default function DeckView(): ReactElement | null {
    const store = useAppStore();
    const suits = store.currentDeck.cardsBySuits;
    if (!suits) {
        console.log("no suits cant show deck");
        return null;
    }
    const { width: screenWidth, height: screenHeight } = useScreenDimensions();
    const cardWidth = screenWidth / 16;
    const cardHeight = screenHeight / 4;

    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const transforms: SkRSXform[] = [];
    const modifierSprites: SkRect[] = [];
    const cardSprites: SkRect[] = [];

    const suitArray = Array.from(suits.values());
    for (let j = 0; j < suitArray.length; j++) {
        const suit = suitArray[j];
        const cardsArray = Array.from(suit.values());
        for (let i = 0; i < cardsArray.length; i++) {
            const card = cardsArray[i];

            const sprite = rect(card.x, card.y, card.width, card.height);
            cardSprites.push(sprite);

            const offsetX = cardWidth;
            const offsetY = cardHeight;

            const drawX = i * offsetX;
            const drawY = j * offsetY;

            transforms.push(Skia.RSXform(1, 0, drawX, drawY));

            modifierSprites.push(
                card.modifier
                    ? modifiersRects.value[card.modifier]
                    : modifiersRects.value[0]
            );
        }
    }
    console.log(modifiersRects.value.length)

    return (
        <View className="flex-1 justify-center items-center">
            <Canvas style={{ width: "100%", height: "100%" }}>
                <Atlas image={modifierSpriteSheet} sprites={modifierSprites} transforms={transforms} />
                <Atlas image={cardsSpriteSheet} sprites={cardSprites} transforms={transforms} />
            </Canvas>
        </View>
    );
}