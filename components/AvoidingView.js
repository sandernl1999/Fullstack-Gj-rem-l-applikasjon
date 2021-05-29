import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { vs } from "react-native-size-matters";
const AvoidingView = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "null"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.select({
        ios: vs(100),
      })}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default AvoidingView;
