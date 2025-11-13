import { ReactElement, ReactNode } from "react";
import { View, Text } from "react-native";

import { jokersSliceData } from "../../assets/sliceData";

type jokerProps = {
    children: ReactNode,
    price: number,
}
export function ShopItem({ children, price }: jokerProps): ReactElement | null {
    return (
        <View
            className="justify-center items-center"
        >
            <View className="bg-black px-2 rounded-t-md">
                <Text
                    className="text-accentGold text-center"
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {price}$
                </Text>
            </View>
            {children}
        </View>
    )
}