import { Dimensions } from "react-native";

export let [SCREEN_WIDTH, SCREEN_HEIGHT] = [0, 0];

export function initScreenDimensions() {
    const { width, height } = Dimensions.get('screen');
    SCREEN_WIDTH = width;
    SCREEN_HEIGHT = height;
}

export function RH(percentage: number) {
    return (percentage / 100) * SCREEN_HEIGHT;
}

export function RW(percentage: number) {
    return (percentage / 100) * SCREEN_WIDTH;
}