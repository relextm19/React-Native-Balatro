import { Atlas, Canvas, useImage, rect, Skia, SkRSXform, useRectBuffer, SkRect } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState"
import { ReactElement } from "react";
import { cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../utils/SpriteSheet";
import { View } from "react-native";
import { useScreenDimensions } from "../../utils/ResponsiveDimensions";

export default function DeckView(): ReactElement | null {
    const store = useAppStore();
    const suits = store.currentDeck.cardsBySuits;
    if (!suits) {
        console.log("no suits cant show deck");
        return null;
    }
    const { width: screenWidth, height: screenHeight } = useScreenDimensions();
    const cardWidth = cardSliceData.spriteWidth;
    const cardHeight = cardSliceData.spriteHeight;
    let longestRow = 0;

    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const atlases: ReactElement[] = [];

    const drawOffsetX = 5;

    const suitArray = Array.from(suits.values());
    for (let j = 0; j < suitArray.length; j++) {
        const suitCards = suitArray[j];
        const cardsArray = Array.from(suitCards.values());

        const scale = screenWidth / ((cardWidth + cardSliceData.offsetX + drawOffsetX) * cardsArray.length);
        longestRow = Math.max(longestRow, cardsArray.length * (cardWidth + drawOffsetX) * scale);

        const transforms: SkRSXform[] = [];
        const modifierSprites: SkRect[] = [];
        const cardSprites: SkRect[] = [];
        for (let i = 0; i < cardsArray.length; i++) {
            const card = cardsArray[i];

            const sprite = rect(card.x, card.y, card.width, card.height);
            cardSprites.push(sprite);


            const drawX = i * ((cardWidth + drawOffsetX) * scale);
            const drawY = j * cardHeight; //vertical spacing between the cards is handled by css


            transforms.push(Skia.RSXform(scale, 0, drawX, drawY));

            modifierSprites.push(
                card.modifier
                    ? modifiersRects.value[card.modifier]
                    : modifiersRects.value[0]
            );
        }
        atlases.push(
            <>
                <Atlas image={modifierSpriteSheet} sprites={modifierSprites} transforms={transforms} key={j} />
                <Atlas image={cardsSpriteSheet} sprites={cardSprites} transforms={transforms} key={j + 1 * scale} />
            </>
        )
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Canvas style={{ width: longestRow, height: "100%" }}>
                {atlases}
            </Canvas>
        </View>
    );
}