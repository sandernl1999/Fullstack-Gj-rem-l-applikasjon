import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ms, s } from "react-native-size-matters";
import Colors from "../constants/Colors";

const ColorButton = ({ onPress, isSelected, color, colorName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.colorButton,
        { borderWidth: isSelected ? 3 : 0, backgroundColor: color },
      ]}
      accessible={true}
      accessibilityLabel={`Selected color is ${colorName}`}
      accessibilityHint="Display todo with selected color"
    />
  );
};
const ColorSelector = ({ selectedColor, colorOptions, onSelect }) => {
  return (
    <View style={styles.container}>
      {colorOptions.map((colorName, index) => {
        return (
          <ColorButton
            key={index}
            onPress={() => onSelect(Colors[colorName])}
            color={Colors[colorName]}
            isSelected={Colors[colorName] == selectedColor}
            colorName={colorName}
          />
        );
      })}
    </View>
  );
};

export default ColorSelector;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ms(10),
  },
  colorButton: {
    height: s(30),
    width: s(30),
    borderColor: Colors.lightGray,
    borderRadius: s(22),
    margin: ms(10),
  },
});
