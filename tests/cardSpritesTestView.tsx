import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { generateDeck } from "../interfaces/Card";

export default function CardSpriteTest() {
  const deck = generateDeck();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Card Sprite Test</Text>
      {deck.map((card) => {
        const animatedStyle = useAnimatedStyle(() => ({
          position: "absolute",
          left: card.x.value,
          top: card.y.value,
        }));
        return (
          <Animated.View key={card.id} style={animatedStyle}>
            {card.sprite}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
  },
});
