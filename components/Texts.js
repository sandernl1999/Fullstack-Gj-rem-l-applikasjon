import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
const Texts = (props) => {
  const { styles, children } = props;
  return <Text style={{ ...style.text, ...styles }}>{children}</Text>;
};

export default Texts;
const style = StyleSheet.create({
  text: {
    color: Colors.black,
  },
});
