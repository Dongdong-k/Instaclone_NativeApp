import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Welcome({ navigation }: any) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View>
          <Text>Go to Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
