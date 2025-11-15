import { Atlas, Canvas, useImage, rect, Skia, SkRSXform, useRectBuffer, SkRect } from "@shopify/react-native-skia";
import { useAppStore, Views } from "../../GameState"
import { ReactElement } from "react";
import { buttonSliceData, cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { View } from "react-native";
import { useScreenDimensions } from "../../logic/ResponsiveDimensions";
import MenuButton from "./MenuButton";


export default function DeckView(): ReactElement | null {
    const exitButtonImageAsset = require("../../assets/ui/exit_button.png");
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const store = useAppStore();
    const suits = store.currentDeck.cardsBySuits;
    if (!suits) {
        console.log("no suits cant show deck");
        return null;
    }
    const { width: screenWidth, height: screenHeight } = useScreenDimensions();
    const displayWidth = screenWidth * 0.95;
    const cardWidth = cardSliceData.spriteWidth;
    const cardHeight = cardSliceData.spriteHeight;
    let longestRow = 0;

    const cards: ReactElement[] = [];

    const scale = displayWidth / ((cardWidth) * cardSliceData.cols);

    function backToLastView() {
        store.setCurrentView(store.lastView);
    }

    const suitArray = Array.from(suits.values());
    for (let j = 0; j < suitArray.length; j++) {
        const suitCards = suitArray[j];
        const cardsArray = Array.from(suitCards.values());
        if (cardsArray.length == 0) { continue };

        const totalCardWidth = cardWidth * cardsArray.length;
        const drawOffsetX = (displayWidth - totalCardWidth) / cardsArray.length; //offset beetwen drawn cards, can be negative if there are too many cards in a row
        longestRow = Math.max(
            longestRow,
            cardsArray.length * cardWidth * scale + (cardsArray.length - 1) * drawOffsetX * scale//first calucalte the width of all cards then the spacing between them
        );

        for (let i = 0; i < cardsArray.length; i++) {
            const card = cardsArray[i];

            const sprite = rect(card.x, card.y, card.width, card.height);
            const modifierSprite = card.modifier
                ? modifiersRects.value[card.modifier]
                : modifiersRects.value[0]

            const drawX = i * ((cardWidth + drawOffsetX) * scale);
            const drawY = j * cardHeight; //vertical spacing between the cards is handled by css

            const key = `${i}${j}`
            cards.push(
                <View key={`w-${key}`}>
                    <Atlas image={modifierSpriteSheet} sprites={[modifierSprite]} transforms={[Skia.RSXform(scale, 0, drawX, drawY)]} key={`m-${key}`} />
                    <Atlas image={cardsSpriteSheet} sprites={[sprite]} transforms={[Skia.RSXform(scale, 0, drawX, drawY)]} key={`c-${key}`} />
                </View>
            )
        }
    }

    return (
        //TODO: add a mechanism for like selecting a single card
        <View className="flex-row flex-1 items-center">
            <View className="top-2 self-start">
                <MenuButton imageAsset={exitButtonImageAsset} sliceData={buttonSliceData} scale={0.3} onClick={backToLastView} />
            </View>
            <View className="flex-1 justify-end items-end">
                <Canvas style={{ width: longestRow, height: suitArray.length * cardSliceData.spriteHeight }}>
                    {cards}
                </Canvas>
            </View>
        </View>
    );
}