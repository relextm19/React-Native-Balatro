import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export function RH(percentage: number){
    return (percentage / 100) * SCREEN_HEIGHT;
}
export function RW(percentage: number){
    return (percentage / 100) * SCREEN_WIDTH;
}