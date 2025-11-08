import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import { Skia, Canvas, Atlas, useImage } from "@shopify/react-native-skia";

import { useSpriteRects } from "../../utils/SpriteSheet";
import { useAppStore, Views } from "../../GameState";

import { deckSliceData } from "../../assets/sliceData";

type deckIconProps = {
    setWidth?: React.Dispatch<React.SetStateAction<number>>
}

export default function DeckIcon({ setWidth }: deckIconProps) {
    const store = useAppStore();
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));
    const deckSpriteRect = useSpriteRects(deckSliceData).value[store.currentDeck.index] ?? null;
    function showDeckView() {
        store.setCurrentView(Views.DeckView);
    }
    return (
        <Pressable
            className="justify-end items-end"
            onPress={showDeckView}
            onLayout={(event: LayoutChangeEvent) => {
                if (setWidth) {
                    const { width } = event.nativeEvent.layout;
                    setWidth(width);
                }
            }}
        >
            <Canvas
                style={
                    { width: deckSpriteRect.width * 1.2, height: deckSpriteRect.height * 1.2 }
                }
            >
                <Atlas
                    sprites={[deckSpriteRect]}
                    image={decksSpriteSheet}
                    transforms={[Skia.RSXform(1.2, 0, 0, 0)]}
                >
                </Atlas>
            </Canvas>
            <Text
                style={{ width: deckSpriteRect.width * 1.2 }}
                className="text-white text-center">
                {store.currentDeck.state?.avaliable}/{store.currentDeck.state?.total}
            </Text>
        </Pressable>
    )
}