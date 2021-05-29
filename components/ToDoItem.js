import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { s, vs, ms } from "react-native-size-matters";
import CheckBox from "./Checkbox";
import LabeledInput from "./LabeledInput";
import Texts from "./Texts";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Colors from "../constants/Colors";

const EditableText = (props) => {
  const { isChecked, onChangeText, text, isNewItem, ...rest } = props;
  const [isEditMode, setEditMode] = useState(props.new);
  return (
    <TouchableOpacity
      style={styles.editableInputStyle}
      onPress={() => !isChecked && setEditMode(true)}
      accessible={true}
      accessibilityLabel="Edit List"
      accessibilityHint="enter title for edit"
    >
      {isEditMode ? (
        <LabeledInput
          placeholder="Add"
          value={text}
          autoFocus={true}
          onChangeText={onChangeText}
          maxLength={30}
          labelStyle={styles.input}
          onBlur={() => {
            rest.onBlur && rest.onBlur();
            setEditMode(false);
          }}
          listInput={true}
          containerStyle={{ paddingHorizontal: 0, margin: 0, width: "100%" }}
          accessibilityLabel="Add input"
          accessibilityHint="Item added with given title"
        />
      ) : (
        <Texts
          styles={{
            ...styles.text,
            color: isChecked ? Colors.lightGray : Colors.black,
          }}
        >
          {text}
        </Texts>
      )}
    </TouchableOpacity>
  );
};

const ToDoItem = (props) => {
  const { text, isChecked, onChecked, onDelete, onChangeText, ...rest } = props;
  return (
    <Wrapper style={styles.container}>
      <CheckBox isChecked={isChecked} onChecked={onChecked} />
      <EditableText
        text={text}
        onChangeText={onChangeText}
        isChecked={isChecked}
        {...rest}
      />
      <Button
        otherButtonStyle={{ marginHorizontal: ms(12) }}
        onPress={onDelete}
        text={"✂️"}
        textStyle={styles.icon}
        accessibilityLabel="Delete button"
        accessibilityHint="Delete current item"
      />
    </Wrapper>
  );
};

export default ToDoItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(5),
    paddingVertical: vs(10),
  },
  icon: {
    fontSize: s(20),
    textAlign: "right",
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: s(0.5),
    fontSize: Platform.OS === "ios" ? s(15) : s(18),
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    height: vs(24),
  },
  text: {
    fontSize: Platform.OS === "ios" ? s(15) : s(18),
    flexDirection: "row",
    alignItems: "center",
  },
  editableInputStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
