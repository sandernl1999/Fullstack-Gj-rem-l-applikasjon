import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { s, ms, vs } from "react-native-size-matters";
import { StyleSheet, View, Platform, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import {
  Button,
  Wrapper,
  LabeledInput,
  Texts,
  ColorSelector,
  AvoidingView,
} from "../components";

const colorList = [
  "blue",
  "teal",
  "green",
  "olive",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "bluegray",
  "turquoise",
  "lime",
  "darkPurple",
  "black",
];

const todoTitleList = [
  "Shopping",
  "Exercise",
  "Work",
  "Movies",
  "Homework",
  "Types of beer",
  "TV-series",
  "Dinners",
  "Clean the house",
  "Walk the dog",
];
const EditList = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || Colors.blue);
  const [isValid, setValidity] = useState(true);

  return (
    <Wrapper style={styles.container}>
      <AvoidingView>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Texts styles={styles.label}>List name:</Texts>
              {!isValid && (
                <Texts
                  styles={{
                    marginLeft: ms(4),
                    color: Colors.red,
                    fontSize: s(12),
                  }}
                >
                  * Listen er tom
                </Texts>
              )}
            </View>
            <LabeledInput
              autoFocus={true}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                setValidity(true);
              }}
              placeholder={"New name..."}
              maxLength={30}
              labelStyle={styles.input}
              containerStyle={{ paddingHorizontal: 0, margin: 0 }}
              accessibilityLabel="Enter new list name"
              accessibilityHint="Display todo title with given name"
              listInput={true}
            />
            <ColorSelector
              onSelect={(color) => {
                setColor(color);
                navigation.dispatch(CommonActions.setParams({ color }));
              }}
              selectedColor={color}
              colorOptions={colorList}
            />
            <Button
              text="Save"
              onPress={() => {
                if (title.length > 1) {
                  route.params.saveChanges({ title, color });
                  navigation.dispatch(CommonActions.goBack());
                } else {
                  setValidity(false);
                }
              }}
              accessibilityLabel="Save button"
              accessibilityHint="Create todo with given title and selected color and Navigates to the my todo screen"
            />
            <Button
              text="Random"
              onPress={() => {
                // let randomtitle = Math.random().toString(36).substring(2, 7);
                let randomtitle =
                  todoTitleList[
                    Math.floor(Math.random() * todoTitleList.length)
                  ];
                let randomColor =
                  colorList[Math.floor(Math.random() * colorList.length)];
                console.log("randomCOlor::", randomtitle);
                route.params.saveChanges({
                  title: randomtitle,
                  color: Colors[randomColor],
                });
                navigation.dispatch(CommonActions.goBack());
              }}
              buttonStyle={styles.buttonStyle}
              accessibilityLabel="Random button"
              accessibilityHint="Create random todo with random name and color and Navigates to the my todo screen"
            />
          </View>
        </ScrollView>
      </AvoidingView>
    </Wrapper>
  );
};

export default EditList;
const styles = StyleSheet.create({
  container: {
    padding: ms(3),
  },
  input: {
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: s(0.5),
    marginLeft: ms(3),
    height: vs(30),
    fontSize: Platform.OS === "ios" ? s(16) : s(20),
  },
  label: {
    fontWeight: "bold",
    fontSize: s(15),
    paddingLeft: ms(4),
    paddingRight: ms(4),
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: Colors.blue,
  },
});
