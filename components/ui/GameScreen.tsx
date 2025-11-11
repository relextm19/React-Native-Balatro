import { ReactElement, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Skia, useImage, rect, Canvas, Atlas } from "@shopify/react-native-skia";
import { useAppStore } from "../../GameState";
import { Pressable } from "react-native";

import StatusPane from "./StatusPane";
import DeckIcon from "./DeckIcon";

import { useSpriteRects } from "../../logic/SpriteSheet";
import { useScreenDimensions } from "../../logic/ResponsiveDimensions";
import { getRandomCard, IPlayingCard, makeAllCardsAvaliable, setCardAvaliablity } from "../../interfaces/Card";
import { buttonSliceData, cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { defaultHandSize } from "../../GameState";
import Card from "./Card";
import MenuButton from "./MenuButton";
import { checkHandType, getChipsAndMultForHandType, HandType } from "../../logic/CheckHandType";


export default function GameScreen(): ReactElement | null {
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"));
    const playButtonImageAsset = require("../../assets/ui/play_button.png");
    const discardButtomImageAsset = require("../../assets/ui/discard_button.png");
    const modifiersRects = useSpriteRects(cardModifierSliceData);

    const store = useAppStore();

    function getNRandomCards(n: number): IPlayingCard[] | undefined {
        const cardsBySuits = store.currentDeck.cardsBySuits;
        const deckState = store.currentDeck.state;
        const newHand: IPlayingCard[] = [];
        if (!cardsBySuits || !deckState) return;
        while (newHand.length < n && deckState.avaliable > 0) {
            const card = getRandomCard(cardsBySuits);
            if (!card) { return }
            card.avaliable = false;
            deckState.avaliable -= 1;
            newHand.push(card)
        }
        return newHand;
    }
    useEffect(() => {
        const cardsBySuits = store.currentDeck.cardsBySuits;
        const deckState = store.currentDeck.state;
        if (!cardsBySuits || !deckState) { return };

        //reset the deck state at the begining of ante
        deckState.avaliable = 52;
        makeAllCardsAvaliable(cardsBySuits);

        const startingHand = getNRandomCards(store.handSize)?.sort((a, b) => b.rank - a.rank) || [];
        setHand(sortHand(startingHand))
    }, [])

    const { width: screenWidth, height: screenHeight } = useScreenDimensions();

    const [deckIconWidth, setDeckIconWidth] = useState(0);
    const [statusPaneWidth, setStatusPaneWidth] = useState(0);
    const avaliableWidth = screenWidth - deckIconWidth - statusPaneWidth;
    const displayWidth = avaliableWidth * 0.98;

    const cardViews: ReactElement[] = [];

    const [hand, setHand] = useState([] as IPlayingCard[]);
    const [selectedCards, setSelectedCards] = useState([] as IPlayingCard[])
    const [playedHand, setPlayedHand] = useState([] as IPlayingCard[]);

    const handType = checkHandType(selectedCards);
    const [chips, mult] = getChipsAndMultForHandType(handType);

    function sortHand(cards: IPlayingCard[]) {
        return [...cards].sort((a, b) => b.rank - a.rank); // copy so react triggers a renrender
    }

    const ready = statusPaneWidth > 10 && deckIconWidth > 10;

    const cardWidth = cardSliceData.spriteWidth;
    const cardHeight = cardSliceData.spriteHeight;
    const scale = displayWidth / (cardWidth * (defaultHandSize - 1));

    let drawOffsetY = useRef(0);
    if (!modifierSpriteSheet || !cardsSpriteSheet) return null;

    const totalHandWidth = (cardWidth * scale * hand.length)
    const drawOffsetX = (displayWidth - totalHandWidth) / (hand.length - 1);

    const startX = (avaliableWidth - displayWidth) / 2;

    const animationHeight = 20;
    const archHeight = 400 / hand.length;
    const rotationGoal = 15 / Math.sqrt(hand.length);
    const archFactor = 0.28;

    const midIndex = (hand.length - 1) / 2;
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        const sprite = rect(card.x, card.y, card.width, card.height);
        const modifierSprite = card.modifier
            ? modifiersRects.value[card.modifier]
            : modifiersRects.value[0];

        const relativeIndex = i - midIndex;


        const normalized = Math.abs(relativeIndex / midIndex);
        const inverted = 1 - normalized;
        const currentElevation = archHeight * inverted * archFactor;

        const currentRotation = rotationGoal * relativeIndex / midIndex;

        const drawX = startX + i * (cardWidth * scale + drawOffsetX);
        cardViews.push(
            <Pressable
                key={`${i}${card.id}`}
                onPress={() => {
                    setSelectedCards(prev => {
                        const alreadySelected = prev.some(sel => sel.id === card.id);

                        if (alreadySelected) {
                            return prev.filter(sel => sel.id !== card.id);
                        }

                        if (prev.length < 5) {
                            return [...prev, card];
                        }

                        return prev;
                    });
                }}
                style={{
                    position: "absolute",
                    left: drawX,
                    bottom: drawOffsetY.current + currentElevation,
                    height: cardHeight * scale,
                    transform: [{ rotate: `${currentRotation}deg` }],
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
            </Pressable>
        );

    }

    function discard(): void {
        if (selectedCards.length === 0) return;

        setHand(prevHand => {
            const newHand = prevHand.filter(
                card => !selectedCards.some(sel => sel.id === card.id)
            );

            const cardsToDraw = store.handSize - newHand.length;
            const newCards = getNRandomCards(cardsToDraw) || [];

            return sortHand([...newHand, ...newCards]);
        });

        setSelectedCards([]);
    }

    function playHand(): void {
        if (selectedCards.length === 0) return;

        setHand(prevHand => {
            const { kept, removed } = prevHand.reduce<{
                kept: IPlayingCard[];
                removed: IPlayingCard[];
            }>(
                (acc, card) => {
                    if (selectedCards.some(sel => sel.id === card.id)) {
                        acc.removed.push(card);
                    } else {
                        acc.kept.push(card);
                    }
                    return acc;
                },
                { kept: [], removed: [] }
            );

            setPlayedHand(removed);


            const cardsToDraw = store.handSize - kept.length;
            const newCards = getNRandomCards(cardsToDraw) || [];

            return sortHand([...kept, ...newCards]);
        });

        setSelectedCards([]);
    }

    return (
        <View className="flex-row flex-1 justify-center items-end">
            <StatusPane setWidth={setStatusPaneWidth} handName={handType} chips={chips} mult={mult} />
            <View className="relative flex-1 justify-end items-center">
                <View
                    className="flex-row justify-evenly items-end w-full h-full"
                    style={{ bottom: cardHeight + archHeight }}
                >
                    {playedHand.map((card, i) => {
                        const modifierSprite = card.modifier
                            ? modifiersRects.value[card.modifier]
                            : modifiersRects.value[0];
                        return <Card
                            scale={scale}
                            modifierSprite={modifierSprite}
                            sprite={rect(card.x, card.y, card.width, card.height)}
                            cardsSpriteSheet={cardsSpriteSheet}
                            modifierSpriteSheet={modifierSpriteSheet}
                            key={`${i}${card.id}`}
                        />
                    }
                    )}
                </View>
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
                        <MenuButton imageAsset={playButtonImageAsset} sliceData={buttonSliceData} onClick={playHand} scale={0.35} />
                        <MenuButton imageAsset={discardButtomImageAsset} sliceData={buttonSliceData} onClick={discard} scale={0.35} />
                    </View>
                </View>
            </View>
            <View className="justify-end items-end"
                style={{ height: cardHeight * scale, width: cardWidth * scale, }}>
                <DeckIcon setWidth={setDeckIconWidth} />
            </View>
        </View>
    )
}