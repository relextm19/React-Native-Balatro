import { View, Text, Pressable } from "react-native";
import { Skia, Canvas, Atlas, useImage } from "@shopify/react-native-skia";

import { useSpriteRects } from "../../utils/SpriteSheet";
import { useAppStore, Views } from "../../GameState";

import { deckSliceData } from "../../assets/sliceData";


export default function DeckIcon() {
    const store = useAppStore();
    const decksSpriteSheet = useImage(require("../../assets/cards/decks.png"));
    const deckSpriteRect = useSpriteRects(deckSliceData).value[store.currentDeck.index] ?? null;
    function showDeckView() {
        store.setCurrentView(Views.DeckView);
    }
    return (
        <Pressable className="items-end justify-end p-2" onPress={showDeckView}>
            <View>
                <Canvas style={
                    { width: deckSpriteRect.width * 1.2, height: deckSpriteRect.height * 1.2 }
                }>
                    <Atlas
                        sprites={[deckSpriteRect]}
                        image={decksSpriteSheet}
                        transforms={[Skia.RSXform(1.2, 0, 0, 0)]}
                    >
                    </Atlas>
                </Canvas>
                <Text className="text-white text-center">
                    {store.currentDeck.state?.avaliable}/{store.currentDeck.state?.total}
                </Text>
            </View>
        </Pressable>
    )
}