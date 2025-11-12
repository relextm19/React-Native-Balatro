import { ReactElement } from "react";
import { View } from "react-native";
import MenuButton from "./MenuButton";
import { buttonSliceData, jokersSliceData } from "../../assets/sliceData";
import { computeSpriteRects, useSpriteRects } from "../../logic/SpriteSheet";
import { JokersInShop } from "../../GameState";
import { getRandomInt } from "../../logic/Random";
import { Joker } from "./Joker";
import { useImage } from "@shopify/react-native-skia";

export default function Shop(): ReactElement | null {
    const nextButtonImageAsset = require("../../assets/ui/next_button.png");
    const rerollButtonImageAsset = require("../../assets/ui/reroll_button.png");
    const jokersSpriteSheet = useImage(require("../../assets/jokers/jokers.png"));

    const jokerRects = useSpriteRects(jokersSliceData);
    console.log(jokerRects)
    if (!jokerRects || !nextButtonImageAsset || !rerollButtonImageAsset || !jokersSpriteSheet) return null;

    const tmp = [];
    for (let i = 0; i < JokersInShop; i++) {
        const randIndex = getRandomInt(0, jokerRects.value.length);
        tmp.push(jokerRects.value[randIndex]);
    }

    const jokerViews = tmp.map((sprite, i) => (
        <Joker image={jokersSpriteSheet} sprite={sprite} scale={1} key={i} />
    ));

    return (
        <View className="flex-1 justify-end items-center">
            <View className="bg-darkGrey">
                <View className="bg-darkBg">
                    <View className="flex-row">
                        <View>
                            <MenuButton imageAsset={nextButtonImageAsset} sliceData={buttonSliceData} scale={0.5} onClick={() => { }} />
                            <MenuButton imageAsset={rerollButtonImageAsset} sliceData={buttonSliceData} scale={0.5} onClick={() => { }} />
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
