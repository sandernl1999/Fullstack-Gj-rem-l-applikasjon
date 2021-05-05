import React from "react";
import {View} from "react-native";
import Button from "../components/Button";
// import {auth} from "firebase";
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

export default () => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
         <Button
             text="Log out"
             onPress={() => {
                firebase.auth().signOut();
                }}
         />
         </View>
    );
};
