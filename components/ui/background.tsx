import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/ResponsiveDimensions";

const [IMAGE_WIDTH,IMAGE_HEIGHT] = [2000, 1000];

export default function MovingBackground() {
  const translateX = useSharedValue(0);

  translateX.value = withRepeat(
    withTiming(-IMAGE_WIDTH, {
      duration: 10000,
      easing: Easing.linear,
    }),
    -1,
    false
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scrollingContainer, animatedStyle]}>
        <Animated.Image
          source={require("../../assets/backgrounds/background1.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Animated.Image
          source={require("../../assets/backgrounds/background1.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollingContainer: {
    flexDirection: "row",
  },
  image: {
    marginRight: -2
  },
});
