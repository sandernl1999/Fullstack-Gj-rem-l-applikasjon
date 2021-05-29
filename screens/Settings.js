import React from "react";
import { Button, Wrapper } from "../components";
import * as firebase from "firebase";

const Settings = () => {
  return (
    <Wrapper>
      <Button
        text="Log out"
        onPress={() => {
          firebase.auth().signOut();
        }}
        accessibilityLabel="Log out button"
        accessibilityHint="Navigates to the login screen"
      />
    </Wrapper>
  );
};

export default Settings;
