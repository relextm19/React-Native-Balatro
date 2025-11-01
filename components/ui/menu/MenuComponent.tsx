import React from "react";
import { Button, StyleSheet } from "react-native";
import MenuButton from "./MenuButton";

type MenuComponentProps = {
    text: string;
    color: string;
    onPress: () => void;
}

export default function MenuComponent({text, color, onPress}: MenuComponentProps){
    return(
        <MenuButton />
    )

}

const styles = StyleSheet.create({
    button:{

    }
})