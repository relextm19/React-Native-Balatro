import { ReactElement, useEffect, useRef, useState } from "react";
import { useImage, Canvas, Atlas, Skia, SkRect } from "@shopify/react-native-skia";
import { View, Text, Pressable } from "react-native";

import StatusPane from "./StatusPane";
import MenuButton from "./MenuButton";
import { ShopItem } from "./ShopItem";

import { buttonSliceData, cardModifierSliceData, cardSliceData, jokersSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { getRandomInt } from "../../logic/Random";
import { CardsInShop, JokersInShop, useAppStore, Views } from "../../GameState";
import { useScreenDimensions } from "../../logic/ResponsiveDimensions";

enum SelectedItemType {
    Joker,
    Card
}
interface SelectedItem {
    type: SelectedItemType,
    index: number,
}

export default function Shop(): ReactElement | null {
    const nextButtonImageAsset = require("../../assets/ui/next_button.png");
    const rerollButtonImageAsset = require("../../assets/ui/reroll_button.png");
    const buyButtonImageAsset = require("../../assets/ui/buy_button.png");

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

    const screenDims = useScreenDimensions();
    const avaliableHeight = (screenDims.height) * 0.8;
    const cardGap = 60;
    const [cardScale, setCardScale] = useState(1);

    const animationHeight = 15;
    const [selectedItem, setSelectedItem] = useState<SelectedItem | undefined>(undefined);

    const jokerPrice = 5;
    const cardPrice = 3;

    useEffect(() => {
        if (avaliableHeight > 0) {
            const scale = Math.min(
                1.5,
                ((avaliableHeight - cardGap) / 2.5) / cardSliceData.spriteHeight
            );
            setCardScale(scale);
        }
    }, [avaliableHeight]);

    useEffect(() => {
        rerollShop();
    }, []);

    function changeSelectedItem(newItem: SelectedItem) {
        if (selectedItem?.type === newItem.type && selectedItem?.index === newItem.index) {
            setSelectedItem(undefined);
        } else {
            setSelectedItem(newItem);
        }
    }

    if (!jokerRects || !cardsSpriteSheet || !cardRects || !modifierSpriteSheet || !modifiersRects || !jokersSpriteSheet) return null;

    function rerollShop() {
        const newJokerRandomIndexes: number[] = [];
        while (newJokerRandomIndexes.length < JokersInShop) {
            const randIndex = getRandomInt(0, jokerRects.value.length - 1);
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

    function buyItem() {
        const priceToSubstract = selectedItem?.type === SelectedItemType.Card ? cardPrice : jokerPrice;
        const arrayToDeleteFrom = selectedItem?.type === SelectedItemType.Card ? cardRandomIndexes : jokerRandomIndexes;
        arrayToDeleteFrom.filter((randIndex) => randIndex === selectedItem?.index);
        // if (store.money < priceToSubstract) return;
        store.setMoney((prev) => prev - priceToSubstract);
    }

    const jokerViews = jokerRandomIndexes.map((index) => {
        const jokerRect: SkRect = jokerRects.value[index];

        return (
            <Pressable onPress={() => changeSelectedItem({ type: SelectedItemType.Joker, index: index })} key={index}>
                <ShopItem price={jokerPrice} animationHeight={animationHeight} isLifted={selectedItem?.type === SelectedItemType.Joker && selectedItem.index === index}>
                    <Canvas
                        style={{
                            width: jokerRect.width * cardScale,
                            height: jokerRect.height * cardScale,
                        }}
                    >
                        <Atlas
                            image={jokersSpriteSheet}
                            sprites={[jokerRect]}
                            transforms={[Skia.RSXform(cardScale, 0, 0, 0)]}
                        />
                    </Canvas>
                </ShopItem>
            </Pressable>
        )
    });

    const cardViews = cardRandomIndexes.map((cardIndex, i) => {
        const cardRect: SkRect = cardRects.value[cardIndex];
        const modifierRect: SkRect = modifiersRects.value[modifierRandomIndexes[i]];

        return (
            <Pressable onPress={() => changeSelectedItem({ type: SelectedItemType.Card, index: cardIndex })} key={cardIndex}>
                <ShopItem price={cardPrice} animationHeight={animationHeight} isLifted={selectedItem?.type === SelectedItemType.Card && selectedItem.index === cardIndex}>
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
                </ShopItem>
            </Pressable>
        );
    });

    return (
        <View className="flex-row flex-1 justify-center items-end gap-2">
            <StatusPane />
            <View className="flex-1 bg-darkGrey p-2 rounded-md h-4/5">
                <View className="items-start bg-darkBg p-2 rounded-md">
                    <View className="flex-row justify-evenly items-center">
                        <View className="justify-between items-center w-1/4 h-full">
                            <View className="justify-between items-center h-1/2">
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

                            <View className="items-center">
                                <MenuButton
                                    imageAsset={buyButtonImageAsset}
                                    sliceData={buttonSliceData}
                                    scale={0.5}
                                    onClick={buyItem}
                                />
                            </View>
                        </View>
                        <View
                            className="justify-evenly items-center gap-2 w-3/4"
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