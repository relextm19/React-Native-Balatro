import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export let SCREEN_WIDTH = 0;
export let SCREEN_HEIGHT = 0;

export function initScreenDimensions() {
    const { width, height } = Dimensions.get("window");
    SCREEN_WIDTH = width;
    SCREEN_HEIGHT = height;
}

export function useScreenDimensions() {
    const [screen, setScreen] = useState<ScaledSize>(Dimensions.get("screen"));

    useEffect(() => {
        const handler = ({ screen }: { window: ScaledSize; screen: ScaledSize }) => {
            setScreen(screen);
        };

        const subscription = Dimensions.addEventListener("change", handler);
        return () => subscription?.remove();
    }, []);

    return {
        width: screen.width,
        height: screen.height,
    };
}
