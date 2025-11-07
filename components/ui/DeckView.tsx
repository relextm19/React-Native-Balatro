import { Atlas, Canvas, useImage, rect, Skia, SkRSXform } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState"
import { ReactElement } from "react";
import { cardSliceData } from "../../assets/sliceData";

export default function DeckView(): ReactElement | null {
    const store = useAppStore();
    const cards = store.currentDeck.cards;
    console.log(cards)
    if (!cards) { return null }

    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const transforms: SkRSXform[] = []
    const cardSprites = Array.from(cards.values()).map((card, i) => {
        const sprite = rect(card.x, card.y, card.width, card.height);

        const offsetX = cardSliceData.spriteWidth + 10;
        const offsetY = cardSliceData.spriteHeight + 10;
        const perRow = 13;

        const drawX = (i % perRow) * offsetX;
        const drawY = Math.floor(i / perRow) * offsetY;

        transforms.push(Skia.RSXform(1, 0, drawX, drawY));

        return sprite;
    });


    return (
        <Canvas style={{ flex: 1 }}>
            <Atlas image={cardsSpriteSheet} sprites={cardSprites} transforms={transforms} />
        </Canvas>
    );
}