import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Button from "./Button";
import LabeledInput from "./LabeledInput";
import Texts from "./Texts";
import Wrapper from "./Wrapper";
import { ms, mvs, s } from "react-native-size-matters";
import Colors from "../constants/Colors";

const LoginForm = (props) => {
  const {
    emailValue,
    onChangeEmail,
    emailErrorMessage,
    passwordValue,
    onChangePassword,
    passwordErrorMessage,
    isCreateMode,
    confirmPwdValue,
    onChangeConfirmPwd,
    confirmPwdErrorMessage,
    onPressLink,
    onPressBtn,
  } = props;

  return (
    <Wrapper>
      <Texts styles={styles.header}>🔐</Texts>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <Wrapper>
          <LabeledInput
            label="Email"
            value={emailValue}
            onChangeText={onChangeEmail}
            errorMessage={emailErrorMessage}
            labelStyle={styles.label}
            autoCompleteType="email"
            accessibilityLabel="Enter Email"
            accessibilityHint="Email must be in valid form"
          />
          <LabeledInput
            label="Password"
            value={passwordValue}
            onChangeText={onChangePassword}
            secureTextEntry={true}
            errorMessage={passwordErrorMessage}
            labelStyle={styles.label}
            autoCompleteType="password"
            accessibilityLabel="Enter Password"
            accessibilityHint="Password must be at least 8 characters long:in lowercase and uppercase letters, numbers and symbols."
          />
          {isCreateMode && (
            <LabeledInput
              label="Confirm password"
              value={confirmPwdValue}
              onChangeText={onChangeConfirmPwd}
              secureTextEntry={true}
              errorMessage={confirmPwdErrorMessage}
              labelStyle={styles.label}
              accessibilityLabel="Enter Confirm Password"
              accessibilityHint="Confirm password must be match with password"
            />
          )}
          <Button
            onPress={onPressLink}
            otherButtonStyle={styles.button}
            textStyle={styles.text}
            text={
              isCreateMode
                ? "Do you already have an account?"
                : "Make new account?"
            }
            accessibilityLabel={
              isCreateMode
                ? "do you already have a account button"
                : "make new account button"
            }
            accessibilityHint={
              isCreateMode
                ? "Click button so open login screen"
                : "Click button so open registration screen"
            }
          />
          <Button
            accessibilityLabel={
              isCreateMode ? "Finish registration button" : "Login button"
            }
            accessibilityHint={
              isCreateMode
                ? "Click button for finish registration"
                : "Click button for login"
            }
            onPress={onPressBtn}
            buttonStyle={{ backgroundColor: Colors.red }}
            text={isCreateMode ? "Finish registration" : "Login"}
          />
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};
export default LoginForm;

const styles = StyleSheet.create({
  header: { fontSize: s(56), alignSelf: "center", marginTop: mvs(20) },
  label: { fontSize: s(13), color: Colors.black },
  button: {
    alignSelf: "center",
    margin: ms(4),
  },
  text: {
    color: Colors.blue,
    fontWeight: "normal",
    fontSize: s(15),
  },
});
