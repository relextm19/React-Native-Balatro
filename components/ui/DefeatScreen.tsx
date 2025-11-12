import React from 'react';
import { View, Text } from 'react-native';

const DefeatScreen = () => {
    return (
        <View className="flex-1 justify-center items-center bg-[#c01e1eff]">
            <Text className="absolute opacity-50 font-extrabold text-[80px] text-black uppercase -translate-x-2 -translate-y-2">
                DEFEAT
            </Text>
            <Text className="font-extrabold text-[80px] text-white uppercase tracking-widest">
                DEFEAT
            </Text>
            <Text className="absolute opacity-70 font-extrabold text-[#ff4f4f] text-[80px] uppercase translate-x-1 translate-y-1">
                DEFEAT
            </Text>
        </View>
    );
};

export default DefeatScreen;
