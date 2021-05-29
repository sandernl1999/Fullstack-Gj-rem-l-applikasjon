import React from "react";
import { StyleSheet } from "react-native";
import Button from "./Button";
import { s, vs } from "react-native-size-matters";
import Colors from "../constants/Colors";

const CheckBox = ({ isChecked, onChecked, ...rest }) => {
  return (
    <Button
      otherButtonStyle={styles.checkbox}
      onPress={onChecked}
      text={isChecked ? "✔️" : ""}
      textStyle={{ color: Colors.lightGray }}
      accessibilityLabel="Checkbox"
      accessibilityHint="To checked or unchecked the checkbox"
      {...rest}
    />
  );
};

export default CheckBox;
const styles = StyleSheet.create({
  checkbox: {
    width: s(24),
    height: vs(24),
    backgroundColor: "#fff0",
    color: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: s(10),
  },
});
