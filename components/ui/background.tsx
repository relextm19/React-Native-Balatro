import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/ResponsiveDimensions";

export default function MovingBackground(){
    const translateX = useSharedValue(0);

    translateX.value = withRepeat(
        withTiming(-SCREEN_WIDTH, {
            duration: 280000,
            easing: Easing.linear,
        }),
        -1,
    )
    const animatedStyle = useAnimatedStyle(() =>({
        transform: [
            {translateX: translateX.value}
        ]
    }));

    return(
        <View style={styles.container}>
            <Animated.Image
                source={require("../../assets/backgrounds/background1.png")}
                style={[
                    { width: SCREEN_WIDTH * 3, height: SCREEN_HEIGHT * 3 }
                    , animatedStyle]}
                resizeMode="repeat" // allows tiling
            />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    overflow: "hidden", 
    flex: 1,
  },
});