import { ReactElement, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Skia, Canvas, Atlas, useImage } from "@shopify/react-native-skia";
import { useAppStore, Views, winReward } from "../../GameState";

import MenuButton from "./MenuButton";
import StatusPane from "./StatusPane";

import { useSpriteRects } from "../../logic/SpriteSheet";

import { buttonSliceData, stakeSliceData, blindSliceData } from "../../assets/sliceData";
import { revertBlindEffects } from "../../logic/ApplyBlindEffects";


export default function RoundSummary(): ReactElement | null {
    const store = useAppStore();

    const stakeSpriteSheet = useImage(require("../../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../../assets/chips/blind_chips.png"));
    const cashOutButtonImageAsset = require("../../assets/ui/cash_out_button.png");

    const stakeRects = useSpriteRects(stakeSliceData);
    const blindRects = useSpriteRects(blindSliceData);

    const blindScale = 2;
    const stakeScale = 1;

    const [totalReward, setTotalReward] = useState(0);
    const [remainingHands, setRemaingHands] = useState(0);
    useEffect(() => {
        //reset the state for visual effect
        setTotalReward(store.hands + winReward)
        setRemaingHands(store.hands);
        store.setHands(store.handsToPlay)
        store.setDiscards(store.handsToDiscard);

    }, [])

    function cashOut() {
        store.setMoney((prev) => prev + totalReward);
        store.setCurrentView(Views.Shop);
        revertBlindEffects(store.currentBlind.index);
        if (store.currentBlind.index > 2) {
            store.setCurrentBossBlind(undefined);
            store.setCurrentAnteScore(prev => prev + 300);
            store.setCurrentAnte(prev => prev + 1);
            store.setCurrentRoundSore(0);
        }
    }

    if (!stakeRects || !blindRects || !stakeSpriteSheet || !blindsSpriteSheet) return null;
    return (
        <View className="flex-row flex-1 justify-between items-end">
            <StatusPane />
            <View className="flex-1 items-center">
                <View className="bg-darkGrey p-2 rounded-md w-3/5 h-3/4">
                    <View className="bg-darkBg p-2 rounded-md">
                        <View className="flex-row justify-start items-center gap-4">
                            <View className="">
                                <Canvas
                                    style={{
                                        width: blindSliceData.spriteWidth * blindScale,
                                        height: blindSliceData.spriteHeight * blindScale,
                                    }}
                                >
                                    <Atlas
                                        image={blindsSpriteSheet}
                                        sprites={[blindRects.value[store.currentBlind.index]]}
                                        transforms={[Skia.RSXform(blindScale, 0, 0, 0)]}
                                    />
                                </Canvas>
                            </View>
                            <View>
                                <Text className="text-white text-2xl">
                                    Score at least
                                </Text>
                                <View className="flex-row">
                                    <View className="justify-center items-center">
                                        <Canvas
                                            style={{
                                                width: stakeSliceData.spriteWidth * stakeScale,
                                                height: stakeSliceData.spriteHeight * stakeScale,
                                            }}
                                        >
                                            <Atlas
                                                image={stakeSpriteSheet}
                                                sprites={[stakeRects.value[store.currentStake.index]]}
                                                transforms={[Skia.RSXform(stakeScale, 0, 0, 0)]}
                                            />
                                        </Canvas>
                                    </View>
                                    <View className="justify-center items-center">
                                        <Text className="text-customRed text-3xl">{store.currentRequiredScore}</Text>
                                    </View>
                                </View>
                            </View>
                            <View className="ml-auto">
                                <Text className="text-accentGold text-3xl">
                                    {`${"$".repeat(winReward)}`}
                                </Text>
                            </View>
                        </View>
                        <View className="my-4 border-white border-t-2 border-dotted"></View>
                        {remainingHands > 0 && (
                            <View className="flex-row justify-start items-center">
                                <Text className="text-blue-600 text-3xl">{remainingHands} </Text>
                                <Text className="text-white text-2xl">Remaining Hands [1$ each]</Text>
                                <View className="ml-auto">
                                    <Text className="text-accentGold text-3xl">
                                        {`${"$".repeat(remainingHands)}`}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View className="flex-row">
                            <Text className="text-white text-2xl">Total reward: </Text>
                            <Text className="text-accentGold text-2xl">
                                {totalReward}$
                            </Text>
                        </View>
                        <View className="items-center">
                            <MenuButton sliceData={buttonSliceData} imageAsset={cashOutButtonImageAsset} onClick={cashOut} scale={0.5} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}