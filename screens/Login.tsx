import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Login({ navigation }: any) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
      <View>
        <Text>Home</Text>
      </View>
    </TouchableOpacity>
  );
}
