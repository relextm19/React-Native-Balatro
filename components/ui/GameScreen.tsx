import { ReactElement, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Skia, useImage, rect, Canvas, Atlas } from "@shopify/react-native-skia";
import { handsToDiscard, handsToPlay, useAppStore, Views } from "../../GameState";
import { Pressable } from "react-native";

import StatusPane from "./StatusPane";
import DeckIcon from "./DeckIcon";

import { useSpriteRects } from "../../logic/SpriteSheet";
import { useScreenDimensions } from "../../logic/ResponsiveDimensions";
import { getRandomCard, IPlayingCard, makeAllCardsAvaliable, rankValues, setCardAvaliablity } from "../../interfaces/Card";
import { buttonSliceData, cardModifierSliceData, cardSliceData } from "../../assets/sliceData";
import { defaultHandSize } from "../../GameState";
import Card from "./Card";
import MenuButton from "./MenuButton";
import { checkHandType, getChipsForHandType, getMultForHandType, HandType } from "../../logic/CheckHandType";
import { getBonusForCard } from "../../logic/CardModifiers";


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

        //reset the state at the begining of ante
        deckState.avaliable = 52;
        makeAllCardsAvaliable(cardsBySuits);
        store.hands = handsToPlay;
        store.discards = handsToDiscard;

        const startingHand = getNRandomCards(store.handSize)?.sort((a, b) => b.rank - a.rank) || [];
        setHand(sortHand(startingHand))
    }, [])

    const { width: screenWidth, height: _ } = useScreenDimensions();

    const [deckIconWidth, setDeckIconWidth] = useState(0);
    const [statusPaneWidth, setStatusPaneWidth] = useState(0);
    const avaliableWidth = screenWidth - deckIconWidth - statusPaneWidth;
    const displayWidth = avaliableWidth * 0.98;

    const cardViews: ReactElement[] = [];

    const [hand, setHand] = useState([] as IPlayingCard[]);
    const [selectedCards, setSelectedCards] = useState([] as IPlayingCard[])
    const [playedHand, setPlayedHand] = useState([] as IPlayingCard[]);
    const [shakingIndex, setShakingIndex] = useState(-1); //xd

    const handType = checkHandType(selectedCards.length > 0 ? selectedCards : playedHand)[0];
    //if i use refs for that i have to force a rerender but its fine
    const chips = useRef(getChipsForHandType(handType));
    const mult = useRef(getMultForHandType(handType));
    const [cardBonus, setCardBonus] = useState<[number, number]>()
    const roundScore = useRef(0);
    const [, forceRender] = useState(0);

    useEffect(() => {
        mult.current = getMultForHandType(handType)
        chips.current = getChipsForHandType(handType)
        forceRender(prev => prev + 1);
    }, [handType])

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
            <View
                key={`${i}${card.id}`}
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
                    setSelectedCards={setSelectedCards}
                    cardObject={card}
                    cardBonus={cardBonus}
                />
            </View>
        );

    }

    function discard(): void {
        if (selectedCards.length === 0 || store.discards <= 0) return;
        store.setDiscards((prev) => prev - 1)

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

    const shakeDuration = 700;
    function playHand(): void {
        if (selectedCards.length === 0) return;
        const tmp = store.hands - 1//setHands is async so for comapring inside the func i will just use a tmp
        store.setHands((prev) => prev - 1);
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
            //use the local variable so i dont have to wait for the async state to update to get the scoring card ids
            const [_, scoringCardIds] = checkHandType(removed);
            console.log(scoringCardIds)
            const scoringIndexes = scoringCardIds.map((id) => removed.findIndex((card) => card.id === id));

            scoringIndexes.forEach((i, _) => {
                setTimeout(() => {
                    setShakingIndex(i);
                    chips.current += rankValues[removed[i].rank]
                    const [chipBonus, multBonus] = getBonusForCard(removed[i].modifier, mult.current, removed[i].rank, removed[i].suit)
                    mult.current += multBonus;
                    chips.current += chipBonus;
                }, i * shakeDuration + shakeDuration)
            })
            setTimeout(() => {
                setShakingIndex(-1)
                setPlayedHand([]);
                roundScore.current += chips.current * mult.current;
                chips.current = 0;
                if (roundScore.current >= store.currentAnteScore) {
                    store.setCurrentView(Views.RoundSummary)
                } else if (tmp <= 0) {
                    store.setCurrentView(Views.DefeatScreen);
                }
            }, removed.length * shakeDuration + shakeDuration);

            const cardsToDraw = store.handSize - kept.length;
            const newCards = getNRandomCards(cardsToDraw) || [];

            return sortHand([...kept, ...newCards]);
        });

        setSelectedCards([]);
    }

    return (
        <View className="flex-row flex-1 justify-center items-end">
            <StatusPane
                setWidth={setStatusPaneWidth}
                handName={handType}
                chips={chips}
                mult={mult}
                roundScore={roundScore}
                headerText={store.currentBlind.name}
                toScore={store.currentAnteScore}
            />
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
                            shake={i === shakingIndex}
                            shakeDuration={shakeDuration}
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