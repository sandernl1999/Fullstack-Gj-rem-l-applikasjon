import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import validator from "validator";
import { auth, firestore } from "firebase";
import { Wrapper, LoginForm, AvoidingView } from "../components";
import Colors from "../constants/Colors";

const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };

  return isValid;
};

const login = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged in");
    });
};

const createAccount = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log("Creating user...");
      firestore().collection("users").doc(user.uid).set({});
    });
};

export default () => {
  const [isCreateMode, setCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });

  const onPressBtn = () => {
    const isValid = validateFields(emailField.text, passwordField.text);
    let isAllValid = true;
    if (!isValid.email) {
      emailField.errorMessage = "Choose valid email";
      setEmailField({ ...emailField });
      isAllValid = false;
    }
    if (!isValid.password) {
      passwordField.errorMessage =
        "Passwords must be at least 8 characters long: in lowercase and uppercase letters, numbers and symbols.";
      setPasswordField({ ...passwordField });
      isAllValid = false;
    }
    if (isCreateMode && passwordReentryField.text != passwordField.text) {
      passwordReentryField.errorMessage = "Password doesn't match";
      setPasswordReentryField({ ...passwordReentryField });
      isAllValid = false;
    }
    if (isAllValid) {
      isCreateMode
        ? createAccount(emailField.text, passwordField.text)
        : login(emailField.text, passwordField.text);
    }
  };

  return (
    <Wrapper>
      <TouchableWithoutFeedback
        containerStyle={styles.box}
        onPress={Keyboard.dismiss}
      >
        <AvoidingView>
          <LoginForm
            emailValue={emailField.text}
            onChangeEmail={(text) => {
              setEmailField({ text });
            }}
            emailErrorMessage={emailField.errorMessage}
            passwordValue={passwordField.text}
            onChangePassword={(text) => {
              setPasswordField({ text });
            }}
            passwordErrorMessage={passwordField.errorMessage}
            isCreateMode={isCreateMode}
            confirmPwdValue={passwordReentryField.text}
            onChangeConfirmPwd={(text) => {
              setPasswordReentryField({ text });
            }}
            confirmPwdErrorMessage={passwordReentryField.errorMessage}
            onPressLink={() => {
              setCreateMode(!isCreateMode);
            }}
            onPressBtn={onPressBtn}
          />
        </AvoidingView>
      </TouchableWithoutFeedback>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
