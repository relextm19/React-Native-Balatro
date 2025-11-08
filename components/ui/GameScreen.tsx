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


export default function GameScreen(): ReactElement | null {
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"))
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const store = useAppStore();
    const cardViews: ReactElement[] = [];

    const [hand, setHand] = useState([] as IPlayingCard[]);

    useEffect(() => {
        function generateStartingHand(): IPlayingCard[] | undefined {
            const newHand: IPlayingCard[] = [];
            const cardsBySuits = store.currentDeck.cardsBySuits;
            if (!cardsBySuits) { return };
            while (newHand.length <= store.handSize) {
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

    //FIXME: this is shared logic between deck view and here so i can put it in a single function
    const cardWidth = cardSliceData.spriteWidth;
    const { width: screenWidth, height: screenHeight } = useScreenDimensions();
    const displayWidth = screenWidth * 0.95;
    const scale = displayWidth / ((cardWidth) * cardSliceData.cols);
    const totalCardWidth = cardWidth * hand.length;
    const drawOffsetX = (displayWidth - totalCardWidth) / hand.length; //offset beetwen drawn cards, can be negative if there are too many cards in a row

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        const sprite = rect(card.x, card.y, card.width, card.height);
        const modifierSprite = card.modifier
            ? modifiersRects.value[card.modifier]
            : modifiersRects.value[0]

        const drawX = i * ((cardWidth + drawOffsetX) * scale);
        const drawY = 0;

        cardViews.push(
            <View key={`w-${i}`}>
                <Atlas image={modifierSpriteSheet} sprites={[modifierSprite]} transforms={[Skia.RSXform(scale, 0, drawX, drawY)]} key={`m-${i}`} />
                <Atlas image={cardsSpriteSheet} sprites={[sprite]} transforms={[Skia.RSXform(scale, 0, drawX, drawY)]} key={`c-${i}`} />
            </View>
        )
    }
    return (
        <View className="flex-row flex-1 justify-center">
            <StatusPane />
            <View className="relative flex-1 justify-end items-center">
                <Canvas style={{
                    width: ((cardWidth + drawOffsetX) * scale) * hand.length,
                    height: cardSliceData.spriteHeight
                }}>
                    {cardViews}
                </Canvas>
            </View>
            <DeckIcon />
        </View>
    )
}