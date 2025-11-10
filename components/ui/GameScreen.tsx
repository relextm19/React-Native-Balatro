import { ReactElement, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Skia, useImage, rect, Canvas, Atlas } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState";

import StatusPane from "./StatusPane";
import DeckIcon from "./DeckIcon";

import { useSpriteRects } from "../../utils/SpriteSheet";
import { useScreenDimensions } from "../../utils/ResponsiveDimensions";
import { getRandomCard, IPlayingCard, makeAllCardsAvaliable } from "../../interfaces/Card";
import { buttonSliceData, cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { defaultHandSize } from "../../GameState";
import Card from "./Card";
import MenuButton from "./MenuButton";


export default function GameScreen(): ReactElement | null {
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"));
    const playButtonImageAsset = require("../../assets/ui/play_button.png");
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const store = useAppStore();

    useEffect(() => {
        const cardsBySuits = store.currentDeck.cardsBySuits;
        if (!cardsBySuits) { return };
        makeAllCardsAvaliable(cardsBySuits);
        function generateStartingHand(): IPlayingCard[] | undefined {
            const newHand: IPlayingCard[] = [];
            if (!cardsBySuits) return;
            while (newHand.length < store.handSize) {
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
    const displayWidth = avaliableWidth * 0.9;

    const cardViews: ReactElement[] = [];

    const [hand, setHand] = useState([] as IPlayingCard[]);
    const selectedCards = useRef(0);

    const ready = statusPaneWidth > 10 && deckIconWidth > 10;
    //FIXME: this is shared logic between deck view and here so i can put it in a single function
    const cardWidth = cardSliceData.spriteWidth;
    const cardHeight = cardSliceData.spriteHeight;
    const scale = displayWidth / (cardWidth * defaultHandSize);

    let drawOffsetY = useRef(0);
    if (!modifierSpriteSheet || !cardsSpriteSheet) return null;

    const totalHandWidth = (cardWidth * scale * hand.length)
    const drawOffsetX = (displayWidth - totalHandWidth) / (hand.length - 1);
    const totalVisibleWidth = totalHandWidth - drawOffsetX * (hand.length - 1);

    const startX = (avaliableWidth - totalVisibleWidth) / 2;

    const animationHeight = 20;
    const archHeight = 80;
    const rotationGoal = 10;

    const midIndex = (hand.length - 1) / 2;

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        const sprite = rect(card.x, card.y, card.width, card.height);
        const modifierSprite = card.modifier
            ? modifiersRects.value[card.modifier]
            : modifiersRects.value[0];

        const relativeIndex = i - midIndex;

        const archFactor = 0.28;
        const currentElevation = archHeight * (1 - Math.abs(relativeIndex / midIndex) * 2) * archFactor;

        const currentRotation = rotationGoal * (relativeIndex / midIndex);

        const drawX = startX + i * (cardWidth * scale - drawOffsetX);

        cardViews.push(
            <View
                key={i}
                style={{
                    position: 'absolute',
                    left: drawX,
                    bottom: drawOffsetY.current + currentElevation,
                    height: cardHeight * scale,
                    transform: [{ rotate: `${currentRotation}deg` }]
                }}
            >
                <Card
                    sprite={sprite}
                    modifierSprite={modifierSprite}
                    scale={scale}
                    animationHeight={animationHeight}
                    cardsSpriteSheet={cardsSpriteSheet}
                    modifierSpriteSheet={modifierSpriteSheet}
                    selectedCards={selectedCards}
                />
            </View>
        );
    }


    return (
        <View className="flex-row flex-1 justify-center items-end">
            <StatusPane setWidth={setStatusPaneWidth} />
            <View className="relative flex-1 justify-end items-center">
                {ready ? cardViews : null}
                <View
                    className="justify-center items-center"
                    onLayout={(event) => drawOffsetY.current = event.nativeEvent.layout.height}
                >
                    <Text className="text-white">
                        {hand.length} / {store.handSize}
                    </Text>
                    <View
                        className="flex-row items-center gap-2 w-2/4"
                    >
                        <MenuButton imageAsset={playButtonImageAsset} sliceData={buttonSliceData} onClick={() => { }} scale={0.35} />
                        <MenuButton imageAsset={playButtonImageAsset} sliceData={buttonSliceData} onClick={() => { }} scale={0.35} />
                    </View>
                </View>
            </View>
            <View className="justify-end items-end border-2 border-red-500"
                style={{ height: cardHeight * scale, width: cardWidth * scale, }}>
                <DeckIcon setWidth={setDeckIconWidth} />
            </View>
        </View>
    )
}