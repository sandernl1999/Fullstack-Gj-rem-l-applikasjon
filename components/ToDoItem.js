import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from "react-native";
import Checkbox from "./Checkbox";
import Colors from "../constants/Colors";
import { ScreenStackHeaderRightView } from "react-native-screens";

const EditableText = ({
    isChecked,
    onChangeText,
    text,
    isNewItem,
    ...props
   }) => {

    const [isEditMode, setEditMode] = useState(props.new);

    return(
        <TouchableOpacity
    style={{flex:1}}
    onPress={() => !isChecked && setEditMode(true)}>

    {isEditMode ? ( 
    <TextInput
       underlineColorAndroid={"transparent"}
       selectionColor={"transparent"}
       autoFocus={true}
       value={text}
       onChangeText={onChangeText}
       placeholder={"Add"}
       onSubmitEditing={() => {}}
       maxLength={30}
       style={[styles.input, { outline: "none" }]}
       onBlur={() => {
           props.onBlur && props.onBlur();
           setEditMode(false);
       }}
       />
    ) : ( 
    <Text
     style={[
         styles.text,
         {
         color: isChecked ?
         Colors.lightGray : 
         Colors.black,
         textDecoration: isChecked ? "line-through" : "none",
        },
    ]}
        >
        {text}
        </Text>

    )}
</TouchableOpacity>
);
};

export default ({
    text,
    isChecked,
    onChecked,
    onChangeText,
    onDelete,
    ...props
}) => {


return (
<View style={styles.container}>
    <View style={{flexDirection: "row", flex: 1}}>
    <Checkbox isChecked={isChecked} onChecked={onChecked}/>
    <EditableText
    text={text}
    onChangeText={onChangeText}
    isChecked={isChecked}
    {...props}
    />
</View>
  <TouchableOpacity onPress={onDelete}>
     <Text style={[styles.icon, { color: Colors.red, textAlign: 'right', paddingTop: '1%', marginTop: 10}]}>✂️</Text>
  </TouchableOpacity>
</View>
   );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    icon: {
        padding: 5,
        fontSize: 26,
        marginTop: -37,
        marginRight: 10,
    },
    input: {
        color: Colors.black,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        marginTop: 15,
        padding: 3,
        height: 45,
        fontSize: 26,
    },
    text: {
        paddingTop: 4,
        padding: 3,
        fontSize: 26,
    }
});