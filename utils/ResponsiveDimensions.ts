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
    const [screenData, setScreenData] = useState(Dimensions.get('screen'));

    return screenData
}