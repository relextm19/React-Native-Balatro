import { ReactElement, useEffect, useState } from "react";
import { View } from "react-native";
import MenuButton from "./MenuButton";
import { buttonSliceData, jokersSliceData } from "../../assets/sliceData";
import { useSpriteRects } from "../../logic/SpriteSheet";
import { JokersInShop } from "../../GameState";
import { getRandomInt } from "../../logic/Random";
import { Joker } from "./Joker";
import { useImage } from "@shopify/react-native-skia";

export default function Shop(): ReactElement | null {
    const nextButtonImageAsset = require("../../assets/ui/next_button.png");
    const rerollButtonImageAsset = require("../../assets/ui/reroll_button.png");
    const jokersSpriteSheet = useImage(require("../../assets/jokers/jokers.png"));

    const jokerRects = useSpriteRects(jokersSliceData);
    const [randomIndexes, setRandomIndexes] = useState([] as number[]);
    useEffect(() => {
        //get new shop on render
        rerollShop();
    }, [])
    if (!jokerRects || !nextButtonImageAsset || !rerollButtonImageAsset || !jokersSpriteSheet) return null;

    function rerollShop() {
        const newIndexes = [] as number[];
        while (newIndexes.length < JokersInShop) {
            const randIndex = getRandomInt(0, jokerRects.value.length);
            if (newIndexes.includes(randIndex)) continue;
            newIndexes.push(randIndex);
        }
        setRandomIndexes(newIndexes);
    }

    const jokerViews = randomIndexes.map((randIndex) => (
        <Joker image={jokersSpriteSheet} sprite={jokerRects.value[randIndex]} scale={1} key={randIndex} />
    ));

    return (
        <View className="flex-1 justify-end items-center">
            <View className="bg-darkGrey">
                <View className="bg-darkBg">
                    <View className="flex-row">
                        <View>
                            <MenuButton imageAsset={nextButtonImageAsset} sliceData={buttonSliceData} scale={0.5} onClick={() => { }} />
                            <MenuButton imageAsset={rerollButtonImageAsset} sliceData={buttonSliceData} scale={0.5} onClick={rerollShop} />
                        </View>
                        <View>
                            {jokerViews}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
