import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { s, vs, ms, mvs } from "react-native-size-matters";
import Colors from "../constants/Colors";

const LabeledInput = ({
  labelStyle,
  label,
  errorMessage,
  text,
  containerStyle,
  listInput,
  ...inputProps
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      {!listInput && (
        <View style={styles.labelContainer}>
          <Text style={[labelStyle, { fontWeight: "bold" }]}>{label}</Text>
          <Text style={styles.error}>{errorMessage && `*${errorMessage}`}</Text>
        </View>
      )}
      <TextInput
        underlineColorAndroid="transparent"
        selectionColor={Colors.lightGray}
        style={{ ...styles.input, ...labelStyle }}
        accessible={true}
        {...inputProps}
      />
    </View>
  );
};

export default LabeledInput;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(8),
    marginHorizontal: ms(4),
    marginVertical: ms(6),
  },
  labelContainer: {
    flexDirection: "row",
    flex: 1,
    marginBottom: mvs(4),
    width: "100%",
  },
  error: {
    color: Colors.red,
    fontSize: s(12),
    marginLeft: ms(4),
    flexShrink: 1,
  },
  input: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    paddingLeft: ms(4),
    height: vs(32),
    fontSize: s(24),
    color: Colors.black,
  },
});
