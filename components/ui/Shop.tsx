import { ReactElement, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import MenuButton from "./MenuButton";
import { buttonSliceData, cardModifierSliceData, cardSliceData, jokersSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { CardsInShop, JokersInShop, useAppStore, Views } from "../../GameState";
import { getRandomInt } from "../../logic/Random";
import { Joker } from "./Joker";
import { useImage, Canvas, Atlas, Skia, SkRect } from "@shopify/react-native-skia";
import StatusPane from "./StatusPane";

export default function Shop(): ReactElement | null {
    const nextButtonImageAsset = require("../../assets/ui/next_button.png");
    const rerollButtonImageAsset = require("../../assets/ui/reroll_button.png");

    const jokersSpriteSheet = useImage(require("../../assets/jokers/jokers.png"));
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"));

    const store = useAppStore();

    const cardRects = useSpriteRects(cardSliceData);
    const modifiersRects = useSpriteRects(cardModifierSliceData);
    const jokerRects = useSpriteRects(jokersSliceData);

    const [jokerRandomIndexes, setJokerRandomIndexes] = useState<number[]>([]);
    const [cardRandomIndexes, setCardRandomIndexes] = useState<number[]>([]);
    const [modifierRandomIndexes, setModifierRandomIndexes] = useState<number[]>([]);

    const avaliableHeight = useRef(0);
    const cardGap = 60;
    const [cardScale, setCardScale] = useState(1);

    useEffect(() => {
        if (avaliableHeight.current > 0) {
            const scale = Math.min(
                1.5,
                ((avaliableHeight.current - cardGap) / 2)
            );
            setCardScale(scale);
        }
    }, [avaliableHeight.current]);

    useEffect(() => {
        rerollShop();
    }, []);

    if (!jokerRects || !cardsSpriteSheet || !cardRects || !modifierSpriteSheet || !modifiersRects || !jokersSpriteSheet) return null;

    function rerollShop() {
        const newJokerRandomIndexes: number[] = [];
        while (newJokerRandomIndexes.length < JokersInShop) {
            const randIndex = getRandomInt(0, jokerRects.value.length);
            if (!newJokerRandomIndexes.includes(randIndex)) newJokerRandomIndexes.push(randIndex);
        }
        setJokerRandomIndexes(newJokerRandomIndexes);

        const newCardRandomIndexes: number[] = [];
        const newModifierRandomIndexes: number[] = [];
        while (newCardRandomIndexes.length < CardsInShop) {
            const cardIndex = getRandomInt(0, cardRects.value.length - 1);
            if (!newCardRandomIndexes.includes(cardIndex)) {
                newCardRandomIndexes.push(cardIndex);
                const modIndex = getRandomInt(0, modifiersRects.value.length - 1);
                newModifierRandomIndexes.push(modIndex);
            }
        }
        setCardRandomIndexes(newCardRandomIndexes);
        setModifierRandomIndexes(newModifierRandomIndexes);
    }

    function goNextRound() {
        store.setCurrentRound(store.currentRound + 1);
        store.setCurrentView(Views.AnteSelect);
    }

    const jokerViews = jokerRandomIndexes.map((index) => (
        <Joker
            image={jokersSpriteSheet}
            sprite={jokerRects.value[index]}
            scale={cardScale}
            key={index}
        />
    ));

    const cardViews = cardRandomIndexes.map((cardIndex, i) => {
        const cardRect: SkRect = cardRects.value[cardIndex];
        const modifierRect: SkRect = modifiersRects.value[modifierRandomIndexes[i]];

        return (
            <View key={cardIndex} className="relative">
                <Canvas
                    style={{
                        width: cardRect.width * cardScale,
                        height: cardRect.height * cardScale,
                    }}
                >
                    <Atlas
                        image={modifierSpriteSheet!}
                        sprites={[modifierRect]}
                        transforms={[Skia.RSXform(cardScale, 0, 0, 0)]}
                    />
                    <Atlas
                        image={cardsSpriteSheet!}
                        sprites={[cardRect]}
                        transforms={[Skia.RSXform(cardScale, 0, 0, 0)]}
                    />
                </Canvas>
            </View>
        );
    });

    return (
        <View className="flex-row flex-1 justify-center items-end gap-2">
            <StatusPane />
            <View className="flex-1 bg-darkGrey p-2 rounded-md h-4/5">
                <View className="bg-darkBg p-2 rounded-md">
                    <View className="flex-row justify-evenly items-center">
                        <View className="justify-evenly items-center self-start w-1/4 h-1/2">
                            <MenuButton
                                imageAsset={nextButtonImageAsset}
                                sliceData={buttonSliceData}
                                scale={0.5}
                                onClick={goNextRound}
                            />
                            <MenuButton
                                imageAsset={rerollButtonImageAsset}
                                sliceData={buttonSliceData}
                                scale={0.5}
                                onClick={rerollShop}
                            />
                        </View>
                        <View
                            className="justify-evenly items-center gap-2 w-3/4"
                            onLayout={(e) => avaliableHeight.current = e.nativeEvent.layout.height}
                        >
                            <View
                                className="flex-row justify-evenly items-center gap-2 bg-darkGrey p-2 rounded-md w-full"
                            >
                                {jokerViews}
                            </View>
                            <View className="flex-row justify-evenly items-center gap-2 bg-darkGrey p-2 rounded-md w-full">
                                {cardViews}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
