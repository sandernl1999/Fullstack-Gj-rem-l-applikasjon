import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Wrapper = (props) => {
  const { style, children } = props;
  return <View style={{ ...styles.wrapper, ...style }}>{children}</View>;
};

export default Wrapper;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
