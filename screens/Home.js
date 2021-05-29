import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";
import { s, vs, ms } from "react-native-size-matters";
import "firebase/firestore";
// import { firestore, auth } from "firebase";
import * as firebase from "firebase";
import Colors from "../constants/Colors";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";

import { Texts, Button, IconButton } from "../components";

const ListButton = ({ title, color, onPress, onDelete, onOptions, index }) => {
  return (
    <TouchableOpacity
      key={index}
      style={[styles.itemContainer, { backgroundColor: color }]}
      onPress={onPress}
      accessible={true}
      accessibilityLabel="List Button"
      accessibilityHint="Navigates to the todo list screen"
    >
      <View>
        <Texts styles={styles.itemTitle}>{title}</Texts>
      </View>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          onPress={onOptions}
          name={"options-outline"}
          accessibilityLabel="Edit button"
          accessibilityHint="Navigates to the edit screen"
        />
        <IconButton
          onPress={onDelete}
          name={"trash-outline"}
          accessibilityLabel="Delete button"
          accessibilityHint="Delete current item from list"
        />
      </View>
    </TouchableOpacity>
  );
};

const renderAddListIcon = (navigation, addItemToLists) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <IconButton
        style={{ justifyContent: "center", marginRight: ms(4) }}
        name="settings"
        color={Colors.black}
        onPress={() => navigation.navigate("Settings")}
        accessibilityLabel="Settings button"
        accessibilityHint="Navigates to the settings screen"
      />
      <Button
        onPress={() =>
          navigation.navigate("Edit", { saveChanges: addItemToLists })
        }
        text={"New list"}
        otherButtonStyle={styles.buttonStyle}
        textStyle={styles.icon}
        accessibilityLabel="New List button"
        accessibilityHint="Navigates to the New list screen"
      />
    </View>
  );
};

const Home = ({ navigation }) => {
  const [lists, setLists] = useState([]);
  const listsRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("lists");

  useEffect(() => {
    onSnapshot(
      listsRef,
      (newLists) => {
        setLists(newLists);
      },
      {
        sort: (a, b) => {
          if (a.index < b.index) {
            return -1;
          }

          if (a.index > b.index) {
            return -1;
          }
          return 0;
        },
      }
    );
  }, []);

  const addItemToLists = ({ title, color }) => {
    const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
    addDoc(listsRef, { title, color, index });
  };

  const removeItemFromLists = (id) => {
    removeDoc(listsRef, id);
  };

  const updateItemFromLists = (id, item) => {
    updateDoc(listsRef, id, item);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToLists),
    });
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <FlatList
        data={lists}
        renderItem={({ item: { title, color, id, index } }) => {
          return (
            <ListButton
              title={title}
              color={color}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("ToDoList", { title, color, listId: id });
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (newItem) =>
                    updateItemFromLists(id, { index, ...newItem }),
                });
              }}
              onDelete={() => removeItemFromLists(id)}
              index={index}
              showsVerticalScrollIndicator={false}
            />
          );
        }}
        style={{ marginVertical: ms(8) }}
      />
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  itemTitle: { fontSize: s(18), padding: ms(5), color: Colors.white },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: vs(75),
    flex: 1,
    borderRadius: s(20),
    marginHorizontal: ms(18),
    marginVertical: ms(10),
    padding: ms(12),
    backgroundColor: Colors.blue,
  },
  icon: {
    fontSize: Platform.OS === "ios" ? s(12) : s(15),
    color: Colors.black,
    fontWeight: "normal",
    paddingBottom: ms(2),
  },
  buttonStyle: {
    justifyContent: "center",
    marginRight: ms(12),
  },
});
