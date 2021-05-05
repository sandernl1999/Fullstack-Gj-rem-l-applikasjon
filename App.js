import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Login from "./screens/Login";
import Settings from "./screens/Settings"
import  Colors  from "./constants/Colors"
import * as firebase from "firebase";

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
    <Stack.Screen name="My ToDo's🔓" component={Home}/>
    <Stack.Screen name="Settings" component={Settings}/>
    <Stack.Screen
     name="ToDoList"
     component={ToDoList}
     options={({ route }) => {
     return {
       title: route.params.title,
       headerStyle: {
         backgroundColor: route.params.color
       },
       headerTintColor: "white"
     };
     }}
     />
     <Stack.Screen
      name="Edit"
      component={EditList}
      options={({ route }) => {
        return{
          title: route.params.title
          ? `Edit ${route.params.title} list`
          : "Make new list",
          headerStyle: {
            backgroundColor: route.params.color || Colors.blue, 
          },
          headerTintColor: "white",
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
  apiKey: "AIzaSyCxf6CraSOTFl0-b042ZyhOxNV2l7Ax2CQ",
  authDomain: "tema-7-52d24.firebaseapp.com",
  projectId: "tema-7-52d24",
  storageBucket: "tema-7-52d24.appspot.com",
  messagingSenderId: "886542530565",
  appId: "1:886542530565:web:7931939fdcf2b7ce26446c"
};
firebase.initializeApp(firebaseConfig);
