import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { usePreloadAssets } from "../../utils/UsePreloadAssets";
import { useAppStore, Views } from "../../GameState";

export default function PreloadScreen() {
    const { ready } = usePreloadAssets();
    const setCurrentView = useAppStore((s) => s.setCurrentView);

    useEffect(() => {
        if (ready) {
            setTimeout(() => setCurrentView(Views.Menu), 300);
        }
    }, [ready]);

    return (
        <View className="flex-1 justify-center items-center bg-darkGrey">
            <Text className="text-white text-lg mb-3">Loading assets...</Text>
            <ActivityIndicator size="large" color="#FFD700" />
        </View>
    );
}
