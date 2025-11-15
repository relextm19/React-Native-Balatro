import { Atlas, Canvas, useImage, rect, Skia } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState";
import { ReactElement } from "react";
import { buttonSliceData, cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { Dimensions, View } from "react-native";
import MenuButton from "./MenuButton";

type deckViewProps = {
    setShowDeck: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeckView({ setShowDeck }: deckViewProps): ReactElement | null {
    const exitButtonImageAsset = require("../../assets/ui/cycle_button.png");
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"));
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const store = useAppStore();
    const suits = store.currentDeck.cardsBySuits;
    if (!suits || !modifiersRects) return null;

    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    const availableWidth = windowWidth - buttonSliceData.spriteWidth * 0.3;

    const verticalGap = windowHeight * 0.02;

    const cardWidth = cardSliceData.spriteWidth;
    const cardHeight = cardSliceData.spriteHeight;

    const suitArray = Array.from(suits.values());
    const cards: ReactElement[] = [];

    const maxCardsInRow = Math.max(
        ...suitArray.map(suitCards => suitCards.size)
    );

    const scale = availableWidth / (maxCardsInRow * cardWidth);
    const scaledCardHeight = cardHeight * scale;

    let rowIndex = 0;

    for (let j = 0; j < suitArray.length; j++) {
        const suitCards = suitArray[j];
        const cardsArray = Array.from(suitCards.values());
        if (cardsArray.length === 0) continue;

        const totalRowWidth = cardsArray.length * cardWidth * scale;
        const rowOffsetX = (availableWidth - totalRowWidth) / 2;

        const drawY = rowIndex * (scaledCardHeight + verticalGap);

        for (let i = 0; i < cardsArray.length; i++) {
            const card = cardsArray[i];
            const sprite = rect(card.x, card.y, card.width, card.height);
            const modifierSprite = card.modifier
                ? modifiersRects.value[card.modifier]
                : modifiersRects.value[0];

            const drawX = rowOffsetX + i * cardWidth * scale;

            cards.push(
                <Atlas
                    key={`m-${i}-${j}`}
                    image={modifierSpriteSheet}
                    sprites={[modifierSprite]}
                    transforms={[Skia.RSXform(scale, 0, drawX, drawY)]}
                />
            );
            cards.push(
                <Atlas
                    key={`c-${i}-${j}`}
                    image={cardsSpriteSheet}
                    sprites={[sprite]}
                    transforms={[Skia.RSXform(scale, 0, drawX, drawY)]}
                />
            );
        }
        rowIndex++;
    }

    const numRowsDrawn = rowIndex;
    const totalCanvasHeight = numRowsDrawn > 0
        ? (numRowsDrawn * (scaledCardHeight + verticalGap)) - verticalGap
        : 0;

    return (
        <View className="z-10 absolute flex-row items-center h-full"
            style={{ width: windowWidth }}
        >
            <View
                className="self-center"
                style={{ width: buttonSliceData.spriteWidth * 0.3 }}
            >
                <MenuButton
                    imageAsset={exitButtonImageAsset}
                    sliceData={buttonSliceData}
                    scale={0.3}
                    rotation={-90}
                    onClick={() => setShowDeck(prev => !prev)}
                />
            </View>
            <View
                className="flex-1 justify-start items-center"
                style={{ width: availableWidth }}
            >
                <View
                    className="flex-1 justify-center items-center"
                >
                    <Canvas style={{ width: availableWidth, height: totalCanvasHeight }}>
                        {cards}
                    </Canvas>
                </View>
            </View>
        </View>
    );
}