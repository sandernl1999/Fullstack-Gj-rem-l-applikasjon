import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { s, vs, ms } from "react-native-size-matters";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Texts from "./Texts";
import Colors from "../constants/Colors";

const Button = (props) => {
  const { buttonStyle, textStyle, text, otherButtonStyle, ...rest } = props;
  return (
    <TouchableOpacity
      style={otherButtonStyle ? otherButtonStyle : [styles.button, buttonStyle]}
      accessible={true}
      {...rest}
    >
      <Texts styles={{ ...styles.text, ...textStyle }}>{text}</Texts>
    </TouchableOpacity>
  );
};
export const IconButton = (props) => {
  const { name, antdIcon, color, size, ...rest } = props;
  return (
    <TouchableOpacity accessible={true} {...rest}>
      {antdIcon ? (
        <Entypo name={name} size={28} color={Colors.white} />
      ) : (
        <Ionicons name={name} size={28} color={color ? color : Colors.white} />
      )}
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: s(25),
    backgroundColor: Colors.darkGray,
    height: Platform.OS === "ios" ? vs(35) : vs(38),
    margin: ms(14),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontSize: Platform.OS === "ios" ? s(15) : s(17),
    fontWeight: "bold",
  },
});
