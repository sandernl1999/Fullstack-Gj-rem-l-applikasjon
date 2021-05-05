import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import { color } from "react-native-reanimated";

export default ({isChecked, onChecked, ...props}) => {
    return(
        <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
            <Text style={{color: Colors.lightGray}}>{isChecked ? "✔️" : ""}</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        width: 30,
        height: 30,
        margin: 10,
        backgroundColor: "#fff0",
        color: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.lightGray,
        alignItems: "center",
        justifyContent: "center",
    },
});