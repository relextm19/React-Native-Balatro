import { ReactElement, useEffect, useState } from "react";
import { View } from "react-native";
import MenuButton from "./MenuButton";
import { buttonSliceData, cardModifierSliceData, cardSliceData, jokersSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { JokersInShop, useAppStore, Views } from "../../GameState";
import { getRandomInt } from "../../logic/Random";
import { Joker } from "./Joker";
import { useImage, Canvas, Atlas, Skia, SkRect, } from "@shopify/react-native-skia";

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

    useEffect(() => {
        rerollShop();
    }, []);

    if (!jokerRects || !cardsSpriteSheet || !cardRects || !modifierSpriteSheet || !modifiersRects || !jokersSpriteSheet) return null;

    function rerollShop() {
        // Jokers
        const newJokerRandomIndexes: number[] = [];
        while (newJokerRandomIndexes.length < JokersInShop) {
            const randIndex = getRandomInt(0, jokerRects.value.length);
            if (!newJokerRandomIndexes.includes(randIndex)) newJokerRandomIndexes.push(randIndex);
        }
        setJokerRandomIndexes(newJokerRandomIndexes);

        // Cards + modifiers
        const newCardRandomIndexes: number[] = [];
        const newModifierRandomIndexes: number[] = [];
        while (newCardRandomIndexes.length < JokersInShop) {
            const cardIndex = getRandomInt(0, cardRects.value.length - 1);
            if (!newCardRandomIndexes.includes(cardIndex)) {
                newCardRandomIndexes.push(cardIndex);
                const modIndex = getRandomInt(0, modifiersRects.value.length - 1);
                console.log(modIndex)
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

    // Render jokers (unchanged)
    const jokerViews = jokerRandomIndexes.map((index) => (
        <Joker image={jokersSpriteSheet} sprite={jokerRects.value[index]} scale={1.5} key={index} />
    ));

    // Render cards as Canvas + Atlas with absolute modifier
    const cardViews = cardRandomIndexes.map((cardIndex, i) => {
        const cardRect: SkRect = cardRects.value[cardIndex];
        const modifierRect: SkRect = modifiersRects.value[modifierRandomIndexes[i]];
        const scale = 1.5;

        return (
            <View key={cardIndex} className="relative">
                <Canvas
                    style={{
                        width: cardRect.width * scale,
                        height: cardRect.height * scale,
                    }}
                >
                    <Atlas
                        image={modifierSpriteSheet!}
                        sprites={[modifierRect]}
                        transforms={[Skia.RSXform(scale, 0, 0, 0)]}
                    />
                    <Atlas
                        image={cardsSpriteSheet!}
                        sprites={[cardRect]}
                        transforms={[Skia.RSXform(scale, 0, 0, 0)]}
                    />
                </Canvas>
            </View>
        );
    });

    return (
        <View className="flex-1 justify-end items-center">
            <View className="bg-darkGrey p-2 rounded-md w-3/5">
                <View className="bg-darkBg p-2 rounded-md">
                    <View className="flex-row justify-center items-center">
                        <View className="justify-evenly w-min h-full">
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
                        <View className="flex-row flex-1 justify-evenly items-center gap-2 bg-darkGrey p-2 rounded-md">
                            {jokerViews}
                        </View>
                    </View>
                </View>
                <View className="flex-row flex-1 justify-evenly items-center gap-2 bg-darkGrey p-2 rounded-md">
                    {cardViews}
                </View>
            </View>
        </View>
    );
}
