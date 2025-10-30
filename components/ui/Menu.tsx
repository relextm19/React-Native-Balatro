import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MenuComponent from "./menu/MenuComponent";
import { RW, RH } from "../../utils/ResponsiveDimensions";

export default function Menu(){
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View>
                <MenuComponent text="Play" color="#00FF00" onPress={() => {}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer:{
        width: '100%',
        alignItems: 'center',
        paddingTop: RH(2),
    },
    logo: {
        width: RW(30),
        height: RW(10),
        minWidth: 300,
        minHeight: 150,
    }
})