import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Canvas, Image, SkImage, SkRect } from "@shopify/react-native-skia";

type AnteSelectPaneProps = {
    spriteSheet: SkImage
    sourceRect: SkRect
};

export default function AnteSelectPane({ spriteSheet, sourceRect, }: AnteSelectPaneProps): ReactElement {
    return (
        <View>
            <Text>Current</Text>
            <Text>Small Blind</Text>
            <View>
                <Text>Score at least</Text>
                <Text>300</Text>
                <View>
                    <Canvas style={{ width: sourceRect.width, height: sourceRect.width }}>
                        {spriteSheet && (
                            <Image
                                image={spriteSheet}
                                rect={sourceRect}
                                x={32}
                                y={0}
                                width={sourceRect.width}
                                height={sourceRect.width}
                            />
                        )}
                    </Canvas>
                </View>
                <Text>Reward: $$$</Text>
            </View>
        </View>
    );
}
