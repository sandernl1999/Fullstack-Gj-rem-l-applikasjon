import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGIN_SENDER_ID,
  APP_ID,
} from "@env";
import { Login, Home, ToDoList, EditList, Settings } from "./screens";
import Colors from "./constants/Colors";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="ToDo-App" component={Login} />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My ToDo's🔓" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="ToDoList"
        component={ToDoList}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color,
            },
            headerTintColor: Colors.white,
          };
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title} list`
              : "Make new list",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: Colors.white,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");

      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGIN_SENDER_ID,
  appId: APP_ID,
};
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
