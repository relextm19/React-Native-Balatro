import { ReactElement, useEffect, useState } from "react";
import { useImage, Canvas, Atlas, Skia, SkRect } from "@shopify/react-native-skia";
import { View, Pressable } from "react-native";

import StatusPane from "./StatusPane";
import MenuButton from "./MenuButton";
import { ShopItem } from "./ShopItem";

import { buttonSliceData, cardModifierSliceData, cardSliceData, planetCardSliceData, voucherSliceData } from "../assets/sliceData";
import { useSpriteRects } from "../logic/SpriteSheet";
import { getRandomInt } from "../logic/Random";
import { cardsInShop, planetCardsInShop, useAppStore, Views } from "../GameState";
import { useScreenDimensions } from "../logic/ResponsiveDimensions";
import { createCard, addCardToDeck, ModifierArray, RanksArray, SuitsArray } from "../interfaces/Card";

enum SelectedItemType {
    PlanetCard,
    Card,
    Voucher
}

interface SelectedItem {
    type: SelectedItemType,
    index: number,
    indexInShop: number,
}

export default function Shop(): ReactElement | null {
    const nextButtonImageAsset = require("../../assets/ui/next_button.png");
    const rerollButtonImageAsset = require("../../assets/ui/reroll_button.png");
    const buyButtonImageAsset = require("../../assets/ui/buy_button.png");

    const planetCardsSpriteSheet = useImage(require("../../assets/planets/planet_cards.png"));
    const cardsSpriteSheet = useImage(require("../../assets/cards/playing_cards.png"));
    const modifierSpriteSheet = useImage(require("../../assets/cards/modifiers.png"));
    const vouchersSpriteSheet = useImage(require("../../assets/vouchers/vouchers.png"));

    const cardRects = useSpriteRects(cardSliceData);
    const modifiersRects = useSpriteRects(cardModifierSliceData);
    const planetCardRects = useSpriteRects(planetCardSliceData);
    const voucherRects = useSpriteRects(voucherSliceData);

    const store = useAppStore();

    const [planetCardRandomIndexes, setPlanetCardRandomIndexes] = useState<number[]>([]);
    const [cardRandomIndexes, setCardRandomIndexes] = useState<number[]>([]);
    const [modifierRandomIndexes, setModifierRandomIndexes] = useState<number[]>([]);
    const [voucherRandomIndex, setVoucherRandomIndex] = useState<number>();

    const screenDims = useScreenDimensions();
    const avaliableHeight = (screenDims.height) * 0.8;
    const cardGap = 60;
    const [cardScale, setCardScale] = useState(1);

    const animationHeight = 15;
    const [selectedItem, setSelectedItem] = useState<SelectedItem | undefined>(undefined);

    const planetCardPrice = 5;
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

    if (!planetCardRects || !cardsSpriteSheet || !cardRects || !modifierSpriteSheet || !modifiersRects || !planetCardsSpriteSheet) return null;

    function rerollShop() {
        const newPlanetCardRandomIndexes: number[] = [];
        while (newPlanetCardRandomIndexes.length < planetCardsInShop) {
            const randIndex = getRandomInt(0, planetCardRects.value.length - 1);
            if (!newPlanetCardRandomIndexes.includes(randIndex)) newPlanetCardRandomIndexes.push(randIndex);
        }
        setPlanetCardRandomIndexes(newPlanetCardRandomIndexes);

        const newCardRandomIndexes: number[] = [];
        const newModifierRandomIndexes: number[] = [];
        while (newCardRandomIndexes.length < cardsInShop) {
            const cardIndex = getRandomInt(0, cardRects.value.length - 1);
            if (!newCardRandomIndexes.includes(cardIndex)) {
                newCardRandomIndexes.push(cardIndex);
                const modIndex = getRandomInt(0, modifiersRects.value.length - 1);
                newModifierRandomIndexes.push(modIndex);
            }
        }

        setVoucherRandomIndex(getRandomInt(0, voucherRects.value.length - 1));
        setCardRandomIndexes(newCardRandomIndexes);
        setModifierRandomIndexes(newModifierRandomIndexes);
    }

    function goNextRound() {
        store.setCurrentRound(store.currentRound + 1);
        store.setCurrentView(Views.AnteSelect);
    }

    function buyItem() {
        if (!selectedItem) return;
        const priceToSubtract = selectedItem.type === SelectedItemType.Card ? cardPrice : planetCardPrice;
        store.setMoney((prev) => prev - priceToSubtract);

        if (selectedItem.type === SelectedItemType.PlanetCard) {
            setPlanetCardRandomIndexes(prev => prev.filter((index) => index !== selectedItem.index));
        } else {
            const rank = RanksArray[(selectedItem.index % cardSliceData.cols)];
            const suit = SuitsArray[Math.floor(selectedItem.index / cardSliceData.cols)];
            const modifier = ModifierArray[modifierRandomIndexes[selectedItem.indexInShop]];
            const card = createCard(suit, rank, modifier);

            store.currentDeck.state!.total++;
            store.setCurrentDeck(addCardToDeck(store.currentDeck, card));
            setCardRandomIndexes(prev => prev.filter((index) => index !== selectedItem.index));
        }
    }

    const planetCardViews = planetCardRandomIndexes.map((planetIndex, i) => {
        const planetRect: SkRect = planetCardRects.value[planetIndex];

        return (
            <Pressable key={planetIndex} onPress={() => changeSelectedItem({ type: SelectedItemType.PlanetCard, index: planetIndex, indexInShop: i })}>
                <ShopItem price={planetCardPrice} animationHeight={animationHeight} isLifted={selectedItem?.type === SelectedItemType.PlanetCard && selectedItem.index === planetIndex}>
                    <Canvas
                        style={{
                            width: planetRect.width * cardScale,
                            height: planetRect.height * cardScale,
                        }}
                    >
                        <Atlas
                            image={planetCardsSpriteSheet}
                            sprites={[planetRect]}
                            transforms={[Skia.RSXform(cardScale, 0, 0, 0)]}
                        />
                    </Canvas>
                </ShopItem>
            </Pressable>
        );
    });

    const cardViews = cardRandomIndexes.map((cardIndex, i) => {
        const cardRect: SkRect = cardRects.value[cardIndex];
        const modifierRect: SkRect = modifiersRects.value[modifierRandomIndexes[i]];

        return (
            <Pressable key={cardIndex} onPress={() => changeSelectedItem({ type: SelectedItemType.Card, index: cardIndex, indexInShop: i })}>
                <ShopItem price={cardPrice} animationHeight={animationHeight} isLifted={selectedItem?.type === SelectedItemType.Card && selectedItem.index === cardIndex}>
                    <Canvas
                        style={{
                            width: cardRect.width * cardScale,
                            height: cardRect.height * cardScale,
                        }}
                    >
                        <Atlas
                            image={modifierSpriteSheet}
                            sprites={[modifierRect]}
                            transforms={[Skia.RSXform(cardScale, 0, 0, 0)]}
                        />
                        <Atlas
                            image={cardsSpriteSheet}
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
                        <View className="justify-evenly items-center gap-2 w-3/4">
                            <View className="flex-row justify-evenly items-center gap-2 rounded-md">
                                <View
                                    className="flex-row flex-1 justify-center items-center bg-darkGrey rounded-md"
                                    style={{ minHeight: cardSliceData.spriteHeight * cardScale }}
                                >
                                    <Pressable onPress={() => changeSelectedItem({ type: SelectedItemType.Voucher, index: 0, indexInShop: 0 })}>
                                        <ShopItem price={10} animationHeight={animationHeight} isLifted={selectedItem?.type === SelectedItemType.Voucher}>
                                            <Canvas
                                                style={{
                                                    width: voucherSliceData.spriteWidth * cardScale,
                                                    height: voucherSliceData.spriteHeight * cardScale,
                                                }}
                                            >
                                                <Atlas
                                                    image={vouchersSpriteSheet}
                                                    sprites={[voucherRects.value[voucherRandomIndex!]]}
                                                    transforms={[Skia.RSXform(cardScale, 0, 0, 0)]}
                                                />
                                            </Canvas>
                                        </ShopItem>
                                    </Pressable>
                                </View>
                                <View
                                    className="flex-row flex-1 justify-evenly items-center gap-2 bg-darkGrey rounded-md"
                                    style={{ minHeight: cardSliceData.spriteHeight * cardScale }}
                                >
                                    {planetCardViews}
                                </View>
                            </View>
                            <View className="flex-row justify-evenly items-center gap-2 bg-darkGrey p-2 rounded-md w-full"
                                style={{ minHeight: cardSliceData.spriteHeight * cardScale }}>
                                {cardViews}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
}
