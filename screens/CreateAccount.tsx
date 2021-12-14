import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function CreateAccount({ navigation }: any) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
      <View>
        <Text>Home</Text>
      </View>
    </TouchableOpacity>
  );
}
