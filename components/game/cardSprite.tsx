import React from "react";
import { Image } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SharedValue } from "react-native-reanimated";

export function CardSprite(
  spriteSource: any,
  x: SharedValue<number>,
  y: SharedValue<number>,
  width: number,
  height: number,
){
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image source={spriteSource} style={{ width, height }} />
    </Animated.View>
  );
}
