import { ReactElement, useEffect, useState } from "react";
import { View } from "react-native";
import { Skia, useImage, rect, Canvas, Atlas } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState";

import StatusPane from "./StatusPane";
import DeckIcon from "./DeckIcon";

import { useSpriteRects } from "../../utils/SpriteSheet";
import { useScreenDimensions } from "../../utils/ResponsiveDimensions";
import { getRandomCard, IPlayingCard } from "../../interfaces/Card";
import { cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { defaultHandSize } from "../../GameState";


export default function GameScreen(): ReactElement | null {
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const store = useAppStore();

    useEffect(() => {
        function generateStartingHand(): IPlayingCard[] | undefined {
            const newHand: IPlayingCard[] = [];
            const cardsBySuits = store.currentDeck.cardsBySuits;
            if (!cardsBySuits) { return };

            while (newHand.length < store.handSize + 8) {
                const card = getRandomCard(cardsBySuits);
                if (!card) { return }
                card.avaliable = false;
                newHand.push(card)
            }

            return newHand;
        }

        const startingHand = generateStartingHand() || [];
        setHand(startingHand);
    }, [])

    const { width: screenWidth, height: screenHeight } = useScreenDimensions();

    const [deckIconWidth, setDeckIconWidth] = useState(0);
    const [statusPaneWidth, setStatusPaneWidth] = useState(0);
    const avaliableWidth = screenWidth - deckIconWidth - statusPaneWidth;
    const displayWidth = avaliableWidth * 0.99;

    const cardViews: ReactElement[] = [];

    const [hand, setHand] = useState([] as IPlayingCard[]);

    //FIXME: this is shared logic between deck view and here so i can put it in a single function
    const cardWidth = cardSliceData.spriteWidth;
    const cardHeight = cardSliceData.spriteHeight;
    const scale = displayWidth / (cardWidth * defaultHandSize);

    const drawOffsetX = (displayWidth - (cardWidth * scale * hand.length)) / (hand.length - 1);

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        const sprite = rect(card.x, card.y, card.width, card.height);
        const modifierSprite = card.modifier
            ? modifiersRects.value[card.modifier]
            : modifiersRects.value[0];

        const drawX = i * ((cardWidth * scale + drawOffsetX));
        const drawY = 0;

        cardViews.push(
            <View key={`w-${i}`}>
                <Atlas image={modifierSpriteSheet} sprites={[modifierSprite]} transforms={[Skia.RSXform(scale, 0, drawX, drawY)]} key={`m-${i}`} />
                <Atlas image={cardsSpriteSheet} sprites={[sprite]} transforms={[Skia.RSXform(scale, 0, drawX, drawY)]} key={`c-${i}`} />
            </View>
        );
    }

    return (
        <View className="flex-row flex-1 justify-center items-end">
            <StatusPane setWidth={setStatusPaneWidth} />
            <View className="flex-1 justify-end items-center mb-2">
                <Canvas style={{
                    width: displayWidth,
                    height: cardHeight * scale,
                }}>
                    {cardViews}
                </Canvas>
            </View>
            <View className="justify-end items-end"
                style={{ height: cardHeight }}>
                <DeckIcon setWidth={setDeckIconWidth} />
            </View>
        </View>
    )
}