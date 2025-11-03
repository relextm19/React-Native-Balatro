import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export function RH(percentage: number) {
    return (percentage / 100) * SCREEN_HEIGHT;
}
export function RW(percentage: number) {
    return (percentage / 100) * SCREEN_WIDTH;
}