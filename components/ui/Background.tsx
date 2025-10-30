import React from "react";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const [IMAGE_WIDTH, IMAGE_HEIGHT] = [2000, 1000];
//FIXME: The transition between images is not exactly seamless
export default function MovingBackground() {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-IMAGE_WIDTH, {
        duration: 50000,
        easing: Easing.linear,
      }),
      -1, // Repeat infinitely
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scrollingContainer, animatedStyle]}>
        <Animated.Image
          source={require("./../../assets/backgrounds/background1.png")}
          style={styles.image}
          resizeMode="repeat" 
        />
        <Animated.Image
          source={require("../../assets/backgrounds/background1.png")}
          style={styles.image} 
          resizeMode="repeat" 
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden", 
  },
  scrollingContainer: {
    flexDirection: "row",
    height: IMAGE_HEIGHT,
  },
  image: {
    width: IMAGE_WIDTH, 
    height: IMAGE_HEIGHT,
  },
});