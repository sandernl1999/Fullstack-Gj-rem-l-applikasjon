import React, { useState, useLayoutEffect, useEffect } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import { ms } from "react-native-size-matters";
import { firestore, auth } from "firebase";
import { ToDoItem, IconButton, AvoidingView } from "../components";
import { onSnapshot, addDoc, removeDoc } from "../services/collections";
import Colors from "../constants/Colors";

const renderAddListIcon = (addItem) => {
  return (
    <IconButton
      onPress={() => addItem()}
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: ms(10),
      }}
      antdIcon={true}
      name={"plus"}
      accessibilityLabel="Add icon"
      accessibilityHint="Add to new item in todolist"
    />
  );
};

const ToDoList = ({ navigation, route }) => {
  let [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState();

  const toDoItemsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.listId)
    .collection("todoItems");

  useEffect(() => {
    onSnapshot(
      toDoItemsRef,
      (newToDoItems) => {
        setToDoItems(newToDoItems);
      },
      {
        sort: (a, b) => {
          if (a.isChecked && !b.isChecked) {
            return 1;
          }
          if (b.isChecked && !a.isChecked) {
            return -1;
          }

          return 0;
        },
      }
    );
  }, []);

  const addItemToLists = () => {
    setNewItem({ text: "", isChecked: false, new: true });
  };

  const removeItemFromLists = (index) => {
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(addItemToLists),
    });
  });

  if (newItem) {
    toDoItems = [newItem, ...toDoItems];
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <AvoidingView>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <FlatList
            data={toDoItems}
            renderItem={({
              item: { id, text, isChecked, ...params },
              index,
            }) => {
              return (
                <ToDoItem
                  {...params}
                  text={text}
                  isChecked={isChecked}
                  onChecked={() => {
                    let data = { text, isChecked: !isChecked };
                    if (id) {
                      data.id = id;
                    }
                    addDoc(toDoItemsRef, data);
                  }}
                  onChangeText={(newText) => {
                    if (params.new) {
                      setNewItem({
                        text: newText,
                        isChecked,
                        new: params.new,
                      });
                    } else {
                      toDoItems[index].text = newText;
                      setToDoItems([...toDoItems]);
                    }
                  }}
                  onDelete={() => {
                    params.new ? setNewItem(null) : removeItemFromLists(index);
                    id && removeDoc(toDoItemsRef, id);
                  }}
                  onBlur={() => {
                    if (text.length > 1) {
                      let data = { text, isChecked };
                      if (id) {
                        data.id = id;
                      }
                      addDoc(toDoItemsRef, data);
                      params.new && setNewItem(null);
                    } else {
                      params.new
                        ? setNewItem(null)
                        : removeItemFromLists(index);
                    }
                  }}
                />
              );
            }}
          />
        </ScrollView>
      </AvoidingView>
    </SafeAreaView>
  );
};

export default ToDoList;
