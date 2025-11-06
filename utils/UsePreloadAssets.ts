import { useState, useEffect } from "react";
import { useImage } from "@shopify/react-native-skia";
import { Image } from "react-native";
import { useAppStore } from "../GameState";

export function usePreloadAssets() {
    const setAssets = useAppStore((s) => s.setAssets);
    const [ready, setReady] = useState(false);

    // --- Skia images ---
    const stakeSpriteSheet = useImage(require("../assets/chips/stake_chips.png"));
    const blindsSpriteSheet = useImage(require("../assets/chips/blind_chips.png"));
    const decksSpriteSheet = useImage(require("../assets/cards/decks.png"));

    // --- Regular RN images ---
    const buttonAssets = [
        require("../assets/ui/play_button.png"),
        require("../assets/ui/home_button.png"),
        require("../assets/ui/cycle_button.png"),
        require("../assets/ui/exit_button.png"),
    ];

    useEffect(() => {
        let isMounted = true;

        async function preloadRNImages() {
            // Preload all RN images before Skia check
            await Promise.all(buttonAssets.map((src) => Image.prefetch(src)));
        }

        preloadRNImages();
    }, []);

    // 🔥 NEW: watch for Skia images being ready
    useEffect(() => {
        const skiaImagesLoaded =
            stakeSpriteSheet && blindsSpriteSheet && decksSpriteSheet;

        if (skiaImagesLoaded) {
            setAssets({
                stakeSpriteSheet,
                blindsSpriteSheet,
                decksSpriteSheet,
                playButtonImageAsset: buttonAssets[0],
                homeButtonImageAsset: buttonAssets[1],
                cycleButtonImageAsset: buttonAssets[2],
                exitButtonImageAsset: buttonAssets[3],
            });
            setReady(true);
        }
    }, [stakeSpriteSheet, blindsSpriteSheet, decksSpriteSheet]);

    return { ready };
}
