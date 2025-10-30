import React from "react";
import { Button, StyleSheet } from "react-native";

type MenuComponentProps = {
    text: string;
    color: string;
    onPress: () => void;
}

export default function MenuComponent({text, color, onPress}: MenuComponentProps){
    return(
        <Button 
            onPress={onPress}
            title={text}
            color={color}
        />
    )

}

const styles = StyleSheet.create({
    button:{

    }
})