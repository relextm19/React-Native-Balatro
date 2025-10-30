import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const FPSCounter: React.FC = () => {
  const [fps, setFps] = useState<number>(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const update = () => {
      frameCount++;
      const now = performance.now();
      const delta = now - lastTime;

      if (delta >= 1000) { // update every second
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>FPS: {fps}</Text>
    </View>
  );
};

export default FPSCounter;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 4,
  },
  text: {
    color: "lime",
    fontWeight: "bold",
  },
});
